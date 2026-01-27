"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import MessageInput from "../../components/input/textareaInput";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ConfirmationPopup from "../../components/confirmationPopup";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { getData } from "../../lib/utils";

// --- Schema ---
const awardTypeSchema = z.object({
  title: generalSchema("Title is required"),
  description: generalSchema("Description is required"),
  active: z.boolean(),
  imageFile: fileSchema,
  iconFile: fileSchema,
});

type AwardTypeFormValues = z.infer<typeof awardTypeSchema>;

interface AwardTypeItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AwardTypes() {
  const { data: session } = useSession();
  const [items, setItems] = useState<AwardTypeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AwardTypeItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAwards = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = (await getData(
        `/infrashakti/types-of-awards`,
        session
      )) as AwardTypeItem[];
      setItems(res || []);
    } catch (error) {
      console.error("Error fetching award types:", error);
      toast.error("Failed to load award types");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/types-of-awards/${id}/toggle-status`,
        null,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Status updated");
      fetchAwards();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/types-of-awards/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Award type deleted successfully");
      setDeletingId(null);
      fetchAwards();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete award type"
      );
    }
  };

  return (
    <>
      <section className="blade-top-margin">
        <SectionHeading
          heading="Award Types"
          ctaText="Add New Award Type"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading award types...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No award types found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md transition-shadow gap-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-[14rem] rounded-md border border-gray overflow-hidden bg-gray-50">
                    <img
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
                      alt={item.title}
                      className="object-cover h-full w-full object-top"
                    />
                    <div className="absolute bottom-2 right-2 w-14 h-14 bg-white rounded-md p-1.5 shadow-md border border-gray-100">
                      <img
                        src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.icon}`}
                        alt="icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 mt-4">
                    <h6 className="text-base font-medium line-clamp-1">
                      {item.title}
                    </h6>
                    <p className="text-sm text-darkgray/80 line-clamp-2 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <ToggleSwitch
                      checked={item.active}
                      onChange={() => handleToggle(item.id)}
                    />
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      text="Delete"
                      theme="transparentPink"
                      size="small"
                      onClick={() => setDeletingId(item.id)}
                    />
                    <Button
                      text="Edit"
                      theme="pink"
                      size="small"
                      onClick={() => {
                        setEditingItem(item);
                        setIsFormOpen(true);
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      {isFormOpen && (
        <AwardTypeForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            fetchAwards();
            setIsFormOpen(false);
            setEditingItem(null);
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

// --- Form Component ---

function AwardTypeForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: AwardTypeItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AwardTypeFormValues>({
    resolver: zodResolver(awardTypeSchema),
    defaultValues: initialData
      ? {
        title: initialData.title,
        description: initialData.description,
        active: initialData.active,
        imageFile: initialData.image,
        iconFile: initialData.icon,
      }
      : {
        active: true,
      },
  });

  const onSubmit: SubmitHandler<AwardTypeFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("active", data.active as any);

      // Handle Image File
      const imageVal = data.imageFile as any;
      if (imageVal instanceof FileList && imageVal.length > 0) {
        formData.append("imageFile", imageVal[0]);
      } else if (!initialData) {
        setError("imageFile", {
          type: "manual",
          message: "Cover image is required",
        });
        setIsSubmitting(false);
        return;
      }

      // Handle Icon File
      const iconVal = data.iconFile as any;
      if (iconVal instanceof FileList && iconVal.length > 0) {
        formData.append("iconFile", iconVal[0]);
      } else if (!initialData) {
        setError("iconFile", {
          type: "manual",
          message: "Icon is required",
        });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/types-of-awards`;
      let method: "post" | "patch" = "post";

      if (initialData) {
        url = `${url}/${initialData.id}`;
        method = "patch";
      }

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      toast.success(initialData ? "Award type updated" : "Award type created");
      onSuccess();
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[36rem] relative bg-white rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Award Type" : "Create New Award Type"}
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
          <div className="space-y-5">
            <TextInput
              label="Title*"
              errors={errors.title}
              placeholder="Enter award type title"
              register={register}
              registerer="title"
            />
            <MessageInput
              label="Description*"
              errors={errors.description}
              placeholder="Enter description"
              register={register}
              registerer="description"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImagePicker
                label="Cover Image*"
                errors={errors.imageFile}
                register={register}
                registerer="imageFile"
                watcher={watch("imageFile")}
                accept=".png, .jpg, .jpeg, .webp"
              />
              <ImagePicker
                label="Icon Logo*"
                errors={errors.iconFile}
                register={register}
                registerer="iconFile"
                watcher={watch("iconFile")}
                accept=".png, .jpg, .jpeg, .webp"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <label className="font-medium text-sm text-gray-700">
                Display Active
              </label>
              <ToggleSwitch
                checked={watch("active")}
                onChange={(val: boolean) => setValue("active", val)}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              theme="transparentGray"
              size="large"
              className="flex-1"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              type="submit"
              theme="pink"
              size="large"
              className="flex-1"
              text={initialData ? "Update Award Type" : "Create Award Type"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
