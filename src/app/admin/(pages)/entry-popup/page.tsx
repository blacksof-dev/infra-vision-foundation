"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, Info, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------ Types & Schema ------------------
interface EntryPopupData {
  id: string;
  title: string;
  description: string;
  date: string;
  cta: string;
  ctaLink: string;
  active: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const popupSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().optional(),
  cta: z.string().optional(),
  ctaLink: z.string().optional(),
  active: z.boolean(),
  image: z.any().optional(),
});

type PopupFormValues = z.infer<typeof popupSchema>;

// ------------------ ToggleSwitch ------------------
function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${checked ? "bg-pink" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ------------------ Main Page Component ------------------
export default function EntryPopupAdmin() {
  const { data: session } = useSession();
  const [data, setData] = useState<EntryPopupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const fetchPopupData = async () => {
    try {
      setIsLoading(true);
      const res = await getData("/entry-popup", session);
      setData(res);
    } catch (error) {
      console.error("Error fetching entry popup:", error);
      toast.error("Failed to load entry popup details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchPopupData();
    }
  }, []);

  const handleToggleStatus = async () => {
    if (!data || isToggling) return;
    try {
      setIsToggling(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/entry-popup/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      toast.success("Status toggled successfully");
      setData({ ...data, active: !data.active });
    } catch (error: any) {
      console.error("Error toggling status:", error);
      toast.error(error?.response?.data?.message || "Failed to toggle status");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-10 pb-20">
      <section className="blade-top-margin">
        <SectionHeading
          heading="Entry Popup Management"
          description="Manage the popup that appears when users first enter the platform."
          cta={true}
          ctaText="Update Popup"
          handleClick={() => setIsFormOpen(true)}
        />

        <div className="mt-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500">Loading details...</p>
              </div>
            </div>
          ) : data ? (
            <PopupPreviewCard
              data={data}
              onToggle={handleToggleStatus}
              isToggling={isToggling}
            />
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <p className="text-gray-500">No entry popup found.</p>
            </div>
          )}
        </div>
      </section>

      {isFormOpen && data && (
        <PopupForm
          initialData={data}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            fetchPopupData();
          }}
          session={session}
        />
      )}
    </div>
  );
}

// ------------------ Preview Card ------------------
function PopupPreviewCard({
  data,
  onToggle,
  isToggling,
}: {
  data: EntryPopupData;
  onToggle: () => void;
  isToggling: boolean;
}) {
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-5xl">
      <div className="p-8">
        <div className="flex flex-col  md:flex-row gap-10">
          {/* Image Side */}
          <div className="md:w-1/3 border border-gray-300 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
                Popup Image
              </span>
            </div>
            <div className="rounded-xl  overflow-hidden border border-gray-100   bg-gray-50">
              {data.imageUrl ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${data.imageUrl}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 "
                  alt="Popup Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
              )}
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-2/3 flex flex-col justify-between ">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                  {data.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mt-2 max-w-sm">
                  {data.description}
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div>
                    {data.cta && (
                      <>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          CTA Text
                        </p>

                        <p className="text-sm font-medium text-gray-900">
                          {data.cta}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    {data.ctaLink && (
                      <>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          CTA Link
                        </p>

                        <p
                          className="text-sm font-medium text-gray-900 truncate"
                          title={data.ctaLink}
                        >
                          {data.ctaLink || "N/A"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {data.date && data.date.trim() !== "" && (
                <div className="text-end  h-fit ">
                  <p className="text-sm font-medium text-gray-900">
                    {(() => {
                      const d = new Date(data.date);
                      return isNaN(d.getTime())
                        ? "Invalid Date"
                        : d.toLocaleDateString("en-GB");
                    })()}
                  </p>
                </div>
              )}
            </div>

            <div className=" text-[10px] text-gray-600 font-medium uppercase tracking-widest  flex justify-between">
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <ToggleSwitch
                  checked={data.active}
                  onChange={onToggle}
                  disabled={isToggling}
                />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {data.active ? "Live on website" : "Not live on website"}
                </span>
              </div>
              <span className="mt-auto">
                Last Updated: {new Date(data.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ------------------ Form Modal ------------------
function PopupForm({
  initialData,
  onClose,
  onSuccess,
  session,
}: {
  initialData: EntryPopupData;
  onClose: () => void;
  onSuccess: () => void;
  session: any;
}) {
  const [isSaving, setIsSaving] = useState(false);

  // Helper to format date from ISO to DD-MM-YYYY
  const formatDateForForm = (isoDate: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PopupFormValues>({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      date: formatDateForForm(initialData.date),
      cta: initialData.cta,
      ctaLink: initialData.ctaLink,
      active: initialData.active,
      image: initialData.imageUrl,
    },
  });

  const onSubmit: SubmitHandler<PopupFormValues> = async (data) => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date || "");
      formData.append("cta", data.cta || "");
      formData.append("ctaLink", data.ctaLink || "");
      formData.append("active", String(data.active));

      if (data.image instanceof FileList && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else if (typeof data.image === "string") {
        // If it's a string, we don't append anything to "image"
        // effectively telling the backend to keep the old one
        // (assuming the backend handles it that way for PATCH)
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/entry-popup`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Entry popup updated successfully");
      onSuccess();
    } catch (error: any) {
      console.error("Error updating popup:", error);
      toast.error(
        error?.response?.data?.message[0] ||
          error?.response?.data?.message ||
          "Failed to update popup",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[100vh] flex flex-col ">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update Entry Popup
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-8 space-y-6 "
        >
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-sm font-medium text-gray-700">
              Display Popup
            </span>
            <ToggleSwitch
              checked={watch("active")}
              onChange={(val) => setValue("active", val)}
            />
          </div>

          <TextInput
            label="Title"
            errors={errors.title}
            placeholder="Main heading of the popup"
            register={register}
            registerer="title"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink/20 focus:border-pink transition-all resize-none"
              placeholder="Detailed message..."
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date (DD-MM-YYYY) (optional)"
              errors={errors.date}
              placeholder="e.g. 22-01-2026"
              register={register}
              registerer="date"
            />
            <TextInput
              label="CTA Button Text (optional)"
              errors={errors.cta}
              placeholder="e.g. Learn More"
              register={register}
              registerer="cta"
            />
          </div>

          <TextInput
            label="CTA Link (Optional)"
            errors={errors.ctaLink}
            placeholder="https://example.com/..."
            register={register}
            registerer="ctaLink"
          />

          <ImagePicker
            label="Popup Image (Max-limit - 3MB)"
            errors={errors.image}
            register={register}
            registerer="image"
            watcher={watch("image")}
            accept=".png, .jpg, .jpeg, .webp"
          />

          <div className="flex gap-4 pt-6 mt-4 border-t border-gray-100">
            <Button
              type="button"
              text="Cancel"
              theme="transparentGray"
              size="large"
              className="flex-1"
              onClick={onClose}
              isDisabled={isSaving}
            />
            <Button
              type="submit"
              text={isSaving ? "Saving..." : "Update Content"}
              theme="pink"
              size="large"
              className="flex-1"
              isLoading={isSaving}
              isDisabled={isSaving}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
