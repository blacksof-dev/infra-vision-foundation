"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import MessageInput from "../../components/input/textareaInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, ExternalLink, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { ToggleSwitch } from "../../components/toggleSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import ConfirmationPopup from "../../components/confirmationPopup";

type Fellow = {
  id: string;
  image: string;
  title: string;
  desig: string;
  subtitle: string;
  popupImg?: string;
  link?: string;
  socialMedia?: string;
  popupdesc?: string;
  active: boolean;
};

type FellowsResponse = {
  fellow: Fellow[];
  totalCount: number;
  lastUpdated?: string;
};

export default function Fellows() {
  const { data: session } = useSession();
  const [items, setItems] = useState<Fellow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Fellow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadFellows = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = (await getData(`/teams/fellow`, session)) as FellowsResponse;
      setItems(data.fellow ?? []);
    } catch (e) {
      toast.error("Failed to load fellows");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    loadFellows();
  }, [loadFellows]);

  // const handleToggle = async (id: string) => {
  //   try {
  //     await axios.patch(
  //       `${process.env.NEXT_PUBLIC_HOST_URL}/teams/fellow/${id}/toggle-status`,
  //       null,
  //       {
  //         headers: { Authorization: `Bearer ${session?.accessToken}` },
  //       }
  //     );
  //     toast.success("Status updated");
  //     loadFellows();
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Failed to toggle status");
  //   }
  // };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/teams/fellow/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Fellow deleted successfully");
      setDeletingId(null);
      loadFellows();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete fellow");
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Distinguished Fellows  "
          // description="Manage distinguished fellows, their roles, and biographies."
          ctaText="Add Fellow"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading fellows...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No fellows found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            {items.map((item) => (
              <FellowCard
                key={item.id}
                item={item}
                onEdit={() => {
                  setEditingItem(item);
                  setIsFormOpen(true);
                }}
                onDelete={() => setDeletingId(item.id)}
                // onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        )}

        {/* Instructions Note */}
        <div className="mt-10 p-6 bg-pink/5 rounded-2xl border border-pink/10 flex items-start gap-4 max-w-4xl">
          <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-pink" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-1">
              Admin Pro-Tip -{" "}
              <span className="font-medium text-gray-400">
                Only applicable for popup description
              </span>
            </h5>
            <ul className="list-disc list-outside pl-4">
              <li className="text-sm text-gray-600 leading-relaxed">
                To make text appear <span className="font-bold">bold</span>,
                wrap it in double asterisks: <br />
                <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block">
                  **your bold text here**
                </code>
              </li>
              <li className="text-sm text-gray-600 leading-relaxed mt-2">
                Use{" "}
                <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block">
                  &lt;br class="block" /&gt;
                </code>{" "}
                for line break
              </li>
            </ul>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <FellowForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            loadFellows();
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

function FellowCard({
  item,
  onEdit,
  onDelete,
}: // onToggle,
{
  item: Fellow;
  onEdit: () => void;
  onDelete: () => void;
  // onToggle: () => void;
}) {
  return (
    <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
          alt={item.title}
        />

        {item.popupImg && (
          <div className="absolute bottom-2 right-2 w-16 h-16 bg-white backdrop-blur-sm rounded-lg p-0.5 shadow-md border border-gray-100 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.popupImg}`}
              alt="Popup"
              className="w-full h-full object-cover rounded-[6px]"
            />
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h4 className="text-lg font-bold text-gray-900 leading-tight">
            {item.title}
          </h4>
          <p className="text-pink text-[10px] font-bold uppercase tracking-wider mt-0.5">
            {item.subtitle}
          </p>
          <p className="text-gray-600 text-xs font-medium mt-1">{item.desig}</p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-1">
          {item.popupdesc}
        </p>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {item.socialMedia || "Profile"}
          </a>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end">
          {/* <div className="flex items-center gap-2">
            <ToggleSwitch checked={item.active} onChange={onToggle} />
            <span className="text-[10px] uppercase font-bold text-gray-400">
              {item.active ? "Active" : "Inactive"}
            </span>
          </div> */}
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
    </article>
  );
}

const fellowSchema = z.object({
  title: z.string().min(1, "Name is required"),
  desig: z.string().min(1, "Designation is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  popupdesc: z.string().min(1, "Popup description is required"),
  link: z.string().optional().or(z.literal("")),
  socialMedia: z.string().optional().or(z.literal("")),
  active: z.boolean(),
  image: z.union([
    z.string().min(1, "image is required"),
    z.any().refine((file) => file?.length > 0, "image is required"),
  ]),
  popupImage: z.union([z.string(), z.any()]).optional(),
});

type FellowFormValues = z.infer<typeof fellowSchema>;

function FellowForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: Fellow | null;
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
  } = useForm<FellowFormValues>({
    resolver: zodResolver(fellowSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          desig: initialData.desig,
          subtitle: initialData.subtitle,
          popupdesc: initialData.popupdesc,
          link: initialData.link || "",
          socialMedia: initialData.socialMedia || "",
          active: initialData.active,
          image: initialData.image,
          popupImage: initialData.popupImg,
        }
      : {
          title: "",
          desig: "",
          subtitle: "",
          popupdesc: "",
          active: true,
          image: undefined,
          popupImage: undefined,
        },
  });

  const onSubmit: SubmitHandler<FellowFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("desig", data.desig);
      formData.append("subtitle", data.subtitle);
      formData.append("popupdesc", data.popupdesc);
      formData.append("active", String(data.active));

      if (data.link) formData.append("link", data.link);
      if (data.socialMedia) formData.append("socialMedia", data.socialMedia);

      // Handle main image
      const imageVal = data.image as any;
      if (imageVal instanceof FileList && imageVal.length > 0) {
        formData.append("image", imageVal[0]);
      } else if (!initialData) {
        setError("image", { type: "manual", message: "Image is required" });
        setIsSubmitting(false);
        return;
      }

      // Handle popup image - API parameter is popupImage
      const popupImgVal = data.popupImage as any;
      if (popupImgVal instanceof FileList && popupImgVal.length > 0) {
        formData.append("popupImage", popupImgVal[0]);
      }

      const method = initialData ? "put" : "post";
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_HOST_URL}/teams/fellow/${initialData.id}`
        : `${process.env.NEXT_PUBLIC_HOST_URL}/teams/fellow`;

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      toast.success(initialData ? "Fellow updated" : "Fellow created");
      onSuccess();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[40rem] relative bg-white rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Fellow" : "Create New Fellow"}
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
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Full Name"
                errors={errors.title}
                placeholder="e.g. Rasika Athawale"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Subtitle (Role Type)"
                errors={errors.subtitle}
                placeholder="e.g. Distinguished Fellow"
                register={register}
                registerer="subtitle"
              />
            </div>

            <TextInput
              label="Designation/Expertise"
              errors={errors.desig}
              placeholder="e.g. Electricity policy expert"
              register={register}
              registerer="desig"
            />

            <MessageInput
              label="Popup Bio Description"
              errors={errors.popupdesc}
              placeholder="Detailed profile bio..."
              register={register}
              registerer="popupdesc"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Social/Profile Link"
                errors={errors.link}
                placeholder="https://linkedin.com/in/..."
                register={register}
                registerer="link"
              />
              <div>
                <label className="font-semibold text-sm mb-2 block text-gray-700">
                  Platform Name
                </label>
                <Select
                  value={watch("socialMedia") || ""}
                  onValueChange={(val: string) => setValue("socialMedia", val)}
                >
                  <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-pink focus:border-pink bg-white">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-100 shadow-xl rounded-xl z-[150]">
                    <SelectItem
                      value="linkedin"
                      className="focus:bg-pink/5 focus:text-pink"
                    >
                      LinkedIn
                    </SelectItem>
                    <SelectItem
                      value="x"
                      className="focus:bg-pink/5 focus:text-pink"
                    >
                      X (Twitter)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.socialMedia && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.socialMedia.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <label className="font-medium text-sm text-gray-700">
                Active Status
              </label>
              <ToggleSwitch
                checked={watch("active")}
                onChange={(val: boolean) => setValue("active", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImagePicker
                label="Fellow Photo"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".png, .jpg, .jpeg, .webp"
              />
              <ImagePicker
                label="Popup Secondary Photo"
                errors={errors.popupImage}
                register={register}
                registerer="popupImage"
                watcher={watch("popupImage")}
                accept=".png, .jpg, .jpeg, .webp"
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
              text={initialData ? "Update Fellow" : "Create Fellow"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
