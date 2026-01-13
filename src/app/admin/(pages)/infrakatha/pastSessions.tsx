"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import { X, Filter } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
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
import MessageInput from "../../components/input/textareaInput";

// --- Schema ---
const infraKathaSchema = z.object({
  infraKathaLabel: generalSchema("Label is required"),
  title: generalSchema("Title is required"),
  description: generalSchema("Description is required"),
  date: generalSchema("Date is required (DD-MM-YYYY)"),
  youtubeVideoUrl: generalSchema("YouTube URL is required"),
  active: z.boolean(),
  thumbnail: fileSchema,
});

type InfraKathaFormValues = z.infer<typeof infraKathaSchema>;

interface InfraKathaItem {
  id: string;
  infraKathaLabel: string;
  title: string;
  description: string;
  date: string;
  youtubeVideoUrl: string;
  thumbnailUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ListResponse {
  data: InfraKathaItem[];
  meta: Pagination;
}

export default function PastSessions() {
  const { data: session } = useSession();
  const [items, setItems] = useState<InfraKathaItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filters
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<string>("desc");
  const [active, setActive] = useState<string>("all");

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InfraKathaItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSessions = useCallback(
    async (targetPage = page) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
          sort,
        });
        if (active !== "all") query.append("active", active);

        const res = (await getData(
          `/infrakatha?${query.toString()}`,
          session
        )) as ListResponse;
        setItems(res?.data || []);
        setPagination(res?.meta || null);
        setPage(targetPage);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    },
    [session, limit, sort, active, page]
  );

  useEffect(() => {
    fetchSessions(1);
  }, [sort, active]); // Fetch on filter change

  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrakatha/${id}/toggle-status`,
        null,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Status updated");
      fetchSessions(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrakatha/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Session deleted successfully");
      setDeletingId(null);
      fetchSessions(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete session");
    }
  };

  return (
    <>
      <section className="blade-top-margin">
        <SectionHeading
          heading="Section - 03 (Past Sessions)"
          ctaText="Add New Session"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4   mt-6  ">
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
               
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40 h-11 border-gray">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              
              <Select value={active} onValueChange={setActive}>
                <SelectTrigger className="w-40 h-11 border-gray">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="true">Active Only</SelectItem>
                  <SelectItem value="false">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading sessions...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              No sessions found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-gray-200 rounded-md overflow-hidden   transition-all duration-300 flex flex-col"
              >
                <div className="  aspect-video overflow-hidden">
                  <img
                    className="w-full h-full object-cover "
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.thumbnailUrl}`}
                    alt={item.title}
                  />
                 
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                     <div className="  bg-white/90   px-2 py-1 rounded-md text-sm font-semibold text-pink shadow-sm   tracking-wider">
                    {item.infraKathaLabel}
                  </div>
                    <span className="text-xs font-medium text-pink px-2 py-0.5 bg-pink/10 rounded-full">
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                   
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-2  mt-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                    <a
                      href={
                         item.youtubeVideoUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-pink   underline        "
                    >
                      Watch on YouTube
                    </a>

                    <div className="flex gap-3 items-center">
                         <ToggleSwitch
                      checked={item.active}
                      onChange={() => handleToggle(item.id)}
                    />
                      <Button
                        theme="transparentGray"
                        size="small"
                        text="Delete"
                        onClick={() => setDeletingId(item.id)}
                        // className="py-1 px-3 !text-[11px] font-semibold"
                      />
                      <Button
                        theme="pink"
                        size="small"
                        text="Edit"
                        onClick={() => {
                          setEditingItem(item);
                          setIsFormOpen(true);
                        }}
                        // className="py-1 px-3 !text-[11px] font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-10 mt-6 md:mt-10 border-t border-gray-100">
            <Button
              text="Previous"
              theme="transparentGray"
              size="small"
              isDisabled={!pagination.hasPrevious}
              onClick={() => fetchSessions(page - 1)}
            />
            <div className="flex gap-2 items-center">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchSessions(p)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-pink text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-pink hover:text-pink"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button
              text="Next"
              theme="transparentGray"
              size="small"
              isDisabled={!pagination.hasNext}
              onClick={() => fetchSessions(page + 1)}
            />
          </div>
        )}
      </section>

      {/* Modals */}
      {isFormOpen && (
        <InfraKathaForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            fetchSessions(page);
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

function InfraKathaForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: InfraKathaItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to format date for display in input if needed
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<InfraKathaFormValues>({
    resolver: zodResolver(infraKathaSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: getFormattedDate(initialData.date),
          thumbnail: initialData.thumbnailUrl,
        }
      : {
          active: true,
        },
  });

  const onSubmit: SubmitHandler<InfraKathaFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("infraKathaLabel", data.infraKathaLabel);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date); // Expected DD-MM-YYYY
      formData.append("youtubeVideoUrl", data.youtubeVideoUrl);
      formData.append("active", String(data.active));

      const thumbValue = data.thumbnail as any;
      if (thumbValue instanceof FileList && thumbValue.length > 0) {
        formData.append("thumbnail", thumbValue[0]);
      } else if (typeof thumbValue === "string" && thumbValue.length > 0) {
        // Keeping existing thumbnail
        // Backend handles patch without thumbnail if not provided,
        // but if we want to explicitly keep it, we might not need to append anything
        // unless the backend requires it. Usually patch only updates sent fields.
      } else if (!initialData) {
        setError("thumbnail", {
          type: "manual",
          message: "Thumbnail is required",
        });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/infrakatha`;
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
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(initialData ? "Session updated" : "Session created");
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
            {initialData ? "Edit Session" : "Create New Session"}
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
                label="InfraKatha Label"
                errors={errors.infraKathaLabel}
                placeholder="e.g. InfraKatha #8"
                register={register}
                registerer="infraKathaLabel"
              />
              <TextInput
                label="Date (DD-MM-YYYY)"
                errors={errors.date}
                placeholder="DD-MM-YYYY"
                register={register}
                registerer="date"
              />
            </div>

            <TextInput
              label="Title"
              errors={errors.title}
              placeholder="Enter session title"
              register={register}
              registerer="title"
            />
            <MessageInput
            label="Description"
            errors={errors.description}
            placeholder="Enter session description"
            register={register}
            registerer="description"
            />
             

            <TextInput
              label="YouTube Video URL"
              errors={errors.youtubeVideoUrl}
              placeholder="https://youtube.com/watch?v=..."
              register={register}
              registerer="youtubeVideoUrl"
            />

            <ImagePicker
              label="Thumbnail Image"
              errors={errors.thumbnail}
              register={register}
              registerer="thumbnail"
              watcher={watch("thumbnail")}
              accept=".png, .jpg, .jpeg, .webp"
            />

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
              text={initialData ? "Update Session" : "Create Session"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
