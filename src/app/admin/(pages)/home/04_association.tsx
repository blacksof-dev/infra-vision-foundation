"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, ExternalLink, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationPopup from "../../components/confirmationPopup";

interface AssociationItem {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

type AssociationsResponse = {
  data: AssociationItem[];
};

export default function Association() {
  const { data: session } = useSession();
  const [items, setItems] = useState<AssociationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadAssociations = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = (await getData(
        "/homepage/associations",
        session
      )) as AssociationsResponse;
      setItems(res.data ?? []);
    } catch (e) {
      toast.error("Failed to load associations");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    loadAssociations();
  }, [loadAssociations]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/associations/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Association deleted successfully");
      setDeletingId(null);
      loadAssociations();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete association"
      );
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Associations Management"
          description="Manage logos and titles of partner organizations and associations."
          ctaText="Add New Association"
          cta={true}
          handleClick={() => {
            setIsFormOpen(true);
          }}
        />

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading associations...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No associations found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-6">
            {items.map((item) => (
              <AssociationCard
                key={item.id}
                item={item}
                onDelete={() => setDeletingId(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      {isFormOpen && (
        <AssociationForm
          onClose={() => {
            setIsFormOpen(false);
          }}
          onSuccess={() => {
            loadAssociations();
            setIsFormOpen(false);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => handleDelete(deletingId)}
        />
      )}
    </>
  );
}

function AssociationCard({
  item,
  onDelete,
}: {
  item: AssociationItem;
  onDelete: () => void;
}) {
  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-32 p-4 flex items-center justify-center bg-gray-50/50">
        <img
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.imageUrl}`}
          alt={item.title}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 text-center line-clamp-2 mb-4 h-10 flex items-center justify-center">
          {item.title}
        </h4>

        <div className="mt-auto pt-4 border-t border-gray-100/50">
          <Button
            theme="transparentPink"
            size="small"
            text="Delete"
            className="w-full text-[11px] font-bold tracking-tight"
            onClick={onDelete}
          />
        </div>
      </div>
    </article>
  );
}

const associationSchema = z.object({
  title: generalSchema("Title is required"),
  image: z.union([
    z.string().min(1, "Logo is required"),
    z.any().refine((file) => file?.length > 0, "Logo is required"),
  ]),
});

type AssociationFormValues = z.infer<typeof associationSchema>;

function AssociationForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<AssociationFormValues>({
    resolver: zodResolver(associationSchema),
    defaultValues: {
      title: "",
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<AssociationFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("active", String(true));

      // Handle logo image
      const imageVal = data.image as any;
      if (imageVal instanceof FileList && imageVal.length > 0) {
        formData.append("file", imageVal[0]);
      } else {
        setError("image", {
          type: "manual",
          message: "Logo image is required",
        });
        setIsSubmitting(false);
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/associations`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      toast.success("Association created successfully");
      onSuccess();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-[28rem] relative bg-white rounded-2xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            Add New Association
          </h3>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          className="overflow-y-auto flex-1 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            <TextInput
              label="Association Title"
              errors={errors.title}
              placeholder="e.g. India Infrastructure Body"
              register={register}
              registerer="title"
            />

            <ImagePicker
              label="Organization Logo"
              errors={errors.image}
              register={register}
              registerer="image"
              watcher={watch("image")}
              accept=".svg, .png, .jpg, .jpeg, .webp"
              tooltip="Supported formats: SVG, PNG, JPG"
            />
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              theme="transparentGray"
              size="base"
              className="flex-1"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              type="submit"
              theme="pink"
              size="base"
              className="flex-1"
              text="Create Association"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
