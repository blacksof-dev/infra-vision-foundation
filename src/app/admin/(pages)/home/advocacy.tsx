"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import { toast } from "react-toastify";
import { X, Info, Plus, ExternalLink, Trash2, Edit } from "lucide-react";
import { ToggleSwitch } from "../../components/toggleSwitch";
import ConfirmationPopup from "../../components/confirmationPopup";
import { getUrl } from "@/lib/getUrl";
import Image from "next/image";
import Link from "next/link";

// Types
interface AdvocacyItem {
  id: string;
  image: string;
  label: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: AdvocacyItem | null;
  items: AdvocacyItem[];
}

export default function AdvocacyTab() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadAdvocacy = useCallback(async () => {
    try {
      setIsLoadingList(true);
      const data = (await getData(
        "/homepage/advocacy",
        session,
      )) as AdvocacyItem[];
      setFormState((s) => ({ ...s, items: data || [] }));
    } catch (e) {
      toast.error("Failed to load advocacy cards");
    } finally {
      setIsLoadingList(false);
    }
  }, [session]);

  useEffect(() => {
    loadAdvocacy();
  }, [loadAdvocacy]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/advocacy/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Deleted successfully");
      setFormState((s) => ({
        ...s,
        items: s.items.filter((item) => item.id !== id),
      }));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/advocacy/${id}`,
        { active: !currentStatus },
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Status updated");
      loadAdvocacy();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Toggle failed");
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Advocacy"
          ctaText="Add New Card"
          cta={formState.items.length < 3}
          handleClick={() =>
            setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
          }
        />

        {formState.items.length >= 3 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-700">
            <Info className="w-5 h-5" />
            <p className="text-sm font-medium">
              Maximum 3 advocacy cards allowed.
            </p>
          </div>
        )}

        {isLoadingList ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500 font-poppin">Loading cards...</p>
          </div>
        ) : formState.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 font-medium font-poppin">
              No advocacy cards found.
            </p>
          </div>
        ) : (
          <div className=" pt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {formState.items.map((item) => (
              <AdvocacyCard
                key={item.id}
                item={item}
                onEdit={() =>
                  setFormState((v) => ({
                    ...v,
                    isFormOpen: true,
                    editItem: item,
                  }))
                }
                onDelete={() => setDeletingId(item.id)}
                onToggle={() => handleToggle(item.id, item.active)}
              />
            ))}
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <AdvocacyForm
          initialData={formState.editItem}
          onClose={() => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            loadAdvocacy();
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={async () => {
            await handleDelete(deletingId);
            setDeletingId(null);
          }}
          title="Delete Advocacy Card"
          message="Are you sure you want to delete this card? This action cannot be undone."
        />
      )}
    </>
  );
}

// Advocacy Card Component - Reference from 05_video.tsx
function AdvocacyCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: AdvocacyItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm ">
      <div className="h-[18rem] md:h-[20rem] xl:h-[14rem] 2xl:h-[19rem] relative rounded overflow-hidden ">
        <Image
          src={getUrl(item.image)}
          alt={item.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-row justify-between py-3">
          <div className="flex flex-row items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[12px] md:h-[12px] rounded-full bg-pink"></span>
            <p className="text-black font-medium">{item.label}</p>
          </div>
        </div>

        <div className="w-full md:w-[90%] pb-4">
          <h5 className="text-blacksecond text-base font-medium line-clamp-2  ">
            {item.title}
          </h5>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Link
            href={item.ctaLink}
            target="_blank"
            className="flex items-center gap-3 text-sm hover:text-pink text-darkgray"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="truncate max-w-[120px]">{item.ctaText}</span>
          </Link>
          <div className="flex gap-2">
            <Button
              theme="transparentGray"
              size="small"
              text="Delete"
              onClick={onDelete}
            />
            <Button theme="pink" size="small" text="Edit" onClick={onEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Advocacy Form Component
const advocacySchema = z.object({
  label: z.string().min(1, "Label is required"),
  title: z.string().min(1, "Title is required"),
  ctaText: z.string().min(1, "CTA Text is required"),
  ctaLink: z.string().url("Must be a valid URL").min(1, "CTA Link is required"),
  active: z.boolean().default(true),
  image: z.any(),
});

type AdvocacyFormValues = z.infer<typeof advocacySchema>;

function AdvocacyForm({
  initialData,
  onClose,
}: {
  initialData: AdvocacyItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<AdvocacyFormValues>({
    resolver: zodResolver(advocacySchema) as any,
    defaultValues: (initialData
      ? {
          label: initialData.label,
          title: initialData.title,
          ctaText: initialData.ctaText,
          ctaLink: initialData.ctaLink,
          active: initialData.active,
          image: initialData.image,
        }
      : {
          label: "",
          title: "",
          ctaText: "",
          ctaLink: "",
          active: true,
          image: "",
        }) as any,
  });

  const submitHandler: SubmitHandler<AdvocacyFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("label", data.label);
      formData.append("title", data.title);
      formData.append("ctaText", data.ctaText);
      formData.append("ctaLink", data.ctaLink);
      formData.append("active", String(data.active));

      const imgVal = data.image;
      if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("image", imgVal[0]);
      } else if (typeof imgVal === "string" && imgVal.startsWith("/")) {
        // If it's an existing image path, we might need to handle it depending on the backend
        // Some backends might want the string, others might not want anything if no new file is uploaded
        // Based on 04_blogs.tsx, it appends the string
        formData.append("image", imgVal);
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/advocacy`;
      let method = "post";

      if (initialData) {
        url = `${url}/${initialData.id}`;
        method = "patch";
      }

      const res = await axios({
        url,
        method,
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          initialData ? "Updated successfully" : "Created successfully",
        );
        onClose();
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initialData ? "Edit Advocacy Card" : "Create Advocacy Card"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-6 space-y-5"
        >
          <TextInput
            label="Label*"
            errors={errors.label}
            placeholder="e.g. InfraPandit Awards"
            register={register}
            registerer="label"
          />

          <TextInput
            label="Title/Description*"
            errors={errors.title}
            placeholder="e.g. A national effort at recognising outstanding doctoral research..."
            register={register}
            registerer="title"
          />

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="CTA Text*"
              errors={errors.ctaText}
              placeholder="e.g. Know more"
              register={register}
              registerer="ctaText"
            />
            <TextInput
              label="CTA Link*"
              errors={errors.ctaLink}
              placeholder="e.g. https://..."
              register={register}
              registerer="ctaLink"
            />
          </div>

          <ImagePicker
            label="Card Image*"
            errors={errors.image}
            register={register}
            registerer="image"
            watcher={watch("image")}
            accept=".png, .jpg, .jpeg, .webp"
          />

          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white pb-2 mt-auto">
            <Button
              type="button"
              text="Cancel"
              theme="transparentGray"
              size="large"
              className="flex-1"
              onClick={onClose}
            />
            <Button
              type="submit"
              text={initialData ? "Update Card" : "Create Card"}
              theme="pink"
              size="large"
              className="flex-1"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
