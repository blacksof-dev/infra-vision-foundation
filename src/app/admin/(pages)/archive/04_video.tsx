"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import { X, Calendar, Play, ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import { fileSchema, generalSchema } from "../../lib/zod";
import { toast } from "react-toastify";
import ConfirmationPopup from "../../components/confirmationPopup";
import { ToggleSwitch } from "../../components/toggleSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

// ============ TYPES ============
interface Category {
  id: string;
  name: string;
  slug: string;
}
interface VideoItem {
  id: string;
  image: string; // Thumbnail image path
  title: string;
  subtitle: string; // Optional in API, but used in UI
  description: string;
  link: string; // Embed URL
  date: string; // YYYY-MM-DD
  tab: string; // Tab ID
  active: boolean;
  categoryIds: string[];
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
  data: VideoItem[];
  meta: Pagination;
}

// ============ MAIN LIST COMPONENT ============
export default function VideoSection() {
  const { data: session } = useSession();
  const [items, setItems] = useState<VideoItem[]>([]);
  const [tabs, setTabs] = useState<Category[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("All");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const [formState, setFormState] = useState<{
    isFormOpen: boolean;
    editItem: VideoItem | null;
  }>({ isFormOpen: false, editItem: null });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadVideos = useCallback(
    async (nextPage = page) => {
      try {
        setIsLoadingList(true);
        const queryParams = new URLSearchParams({
          page: nextPage.toString(),
          limit: limit.toString(),
        });
        if (activeTabId !== "All") {
          queryParams.append("categoryId", activeTabId);
        }

        const res = (await getData(
          `/archives/videos?${queryParams.toString()}`,
          session,
        )) as ListResponse;

        setItems(res?.data ?? []);
        setPagination(res?.meta ?? null);
        setPage(nextPage);
      } catch (e) {
        toast.error("Failed to load videos");
      } finally {
        setIsLoadingList(false);
      }
    },
    [session, limit, activeTabId, page],
  );

  const loadTabs = useCallback(async () => {
    try {
      const res = (await getData(
        "/archives/videos/categories?activeOnly=false",
        session,
      )) as Category[];
      setTabs(res ?? []);
    } catch {}
  }, [session]);

  useEffect(() => {
    loadVideos(1);
    loadTabs();
  }, [activeTabId, loadVideos, loadTabs]);

  async function deleteVideo(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/videos/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } },
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setDeletingId(null);
        loadVideos(page);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <>
      <section className="blade-top-margin pb-10 border-t border-gray-100 pt-10">
        <SectionHeading
          heading="Archives - Videos"
          description="Manage video conversations and event recordings."
          ctaText="Add New Video"
          cta
          handleClick={() => setFormState({ isFormOpen: true, editItem: null })}
        />

        {/* Tabs Filtering */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          <button
            onClick={() => setActiveTabId("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTabId === "All"
                ? "bg-pink text-white shadow-md shadow-pink/20"
                : "bg-white border border-gray-200 text-gray-500 hover:border-pink hover:text-pink"
            }`}
          >
            All Videos
          </button>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTabId === tab.id
                  ? "bg-pink text-white shadow-md shadow-pink/20"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-pink hover:text-pink"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {isLoadingList && items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg border border-dashed border-gray-200">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading videos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 font-medium">
              No videos found for this category.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((it) => (
              <article
                key={it.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100 border-b border-gray-50">
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
                    alt={it.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 text-pink fill-pink" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-pink uppercase tracking-wider shadow-sm">
                      {tabs.find((t) => t.id === it.categoryIds?.[0])?.name ||
                        "Uncategorized"}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[10px] w-fit mb-2 font-bold text-gray-400 uppercase flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(it.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-3   pb-2">
                    {it.title}
                  </h3>

                  {/* {it.subtitle && (
                    <p className="text-xs text-pink font-medium line-clamp-1 mb-4 italic">
                      {it.subtitle}
                    </p>
                  )} */}

                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <a
                        href={it.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-sm flex items-center gap-1 underline text-pink transition-colors"
                      >
                        Video <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        theme="transparentGray"
                        size="small"
                        text="Delete"
                        className=""
                        onClick={() => setDeletingId(it.id)}
                      />
                      <Button
                        theme="pink"
                        size="small"
                        text="Edit"
                        className=""
                        onClick={() =>
                          setFormState({ isFormOpen: true, editItem: it })
                        }
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-10 mt-6 border-t border-gray-100">
            <Button
              text="Previous"
              theme="transparentGray"
              size="small"
              isDisabled={page <= 1}
              onClick={() => loadVideos(page - 1)}
            />
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => loadVideos(p)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-pink text-white shadow-md shadow-pink/20"
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
              isDisabled={page >= pagination.totalPages}
              onClick={() => loadVideos(page + 1)}
            />
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <VideoForm
          tabs={tabs}
          initalData={formState.editItem}
          onClose={async () => {
            setFormState({ isFormOpen: false, editItem: null });
            await loadVideos(page);
            await loadTabs();
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => deleteVideo(deletingId)}
        />
      )}
    </>
  );
}

// ============ FORM COMPONENT ============
const videoSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: z.string().optional(),
  link: generalSchema("Video link is required"),
  date: generalSchema("Date is required"),
  tab: generalSchema("Category (Tab) is required"),
  active: z.boolean(),
  image: fileSchema, // REQUIRED in frontend
});

type VideoFormValues = z.infer<typeof videoSchema>;

function VideoForm({
  tabs,
  initalData,
  onClose,
}: {
  tabs: Category[];
  initalData: VideoItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: initalData?.title || "",
      subtitle: initalData?.subtitle || "",
      link: initalData?.link || "",
      date: initalData?.date ? initalData.date.split("T")[0] : "",
      tab: initalData?.categoryIds?.[0] || "",
      active: initalData ? initalData.active : true,
      image: initalData?.image || undefined,
    } as any,
  });

  const submitHandler: SubmitHandler<VideoFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle || "");
      formData.append("description", ""); // Required by API
      formData.append("link", data.link);
      formData.append("date", data.date);
      formData.append("active", String(true));

      if (data.tab) {
        formData.append("tab", data.tab);
        formData.append("categoryIds", JSON.stringify([data.tab]));
      } else if (!initalData) {
        setError("tab", {
          type: "manual",
          message: "Please select a category",
        });
        setIsLoading(false);
        return;
      }

      const fileVal = data.image;
      if (fileVal instanceof FileList && fileVal.length > 0) {
        formData.append("image", fileVal[0]);
      } else if (typeof fileVal === "string" && fileVal.trim()) {
        formData.append("imageUrl", fileVal);
      } else if (!initalData) {
        setError("image", { type: "manual", message: "Image is required" });
        setIsLoading(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/archives/videos`;
      let method: "post" | "patch" = "post";
      if (initalData?.id) {
        url = `${url}/${initalData.id}`;
        method = "patch";
      }

      const res = await axios.request({
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
          initalData ? "Updated successfully" : "Created successfully",
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
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initalData ? "Edit Video Entry" : "Add New Video"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-5">
            <div className="grid  ">
              <TextInput
                label="Video Title"
                errors={errors.title}
                placeholder="e.g. HSR will be the next multiplier"
                register={register}
                registerer="title"
              />
              {/* <TextInput
                label="Subtitle (Optional)"
                errors={errors.subtitle}
                placeholder="e.g. The Infravision Conversation"
                register={register}
                registerer="subtitle"
              /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Embed Link"
                errors={errors.link}
                placeholder="https://www.youtube.com/embed/..."
                register={register}
                registerer="link"
                tooltip="Please provide a valid embed URL"
              />
              <TextInput
                label="Published Date"
                errors={errors.date}
                placeholder="YYYY-MM-DD"
                register={register}
                registerer="date"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div>
                <label className="font-medium text-sm text-gray-700 block mb-1.5">
                  Available Sector (Tab)
                </label>
                <Select
                  value={watch("tab") || ""}
                  onValueChange={(val) =>
                    setValue("tab", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full h-11 border border-gray bg-white rounded-lg">
                    <SelectValue placeholder="Select primary sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 z-[1001] shadow-xl">
                    {tabs.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.tab && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.tab.message}
                  </p>
                )}
              </div>
              <ImagePicker
                label="Thumbnail Image"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".png,.jpg,.jpeg,.webp"
                tooltip="Maximum size 10MB"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-8 flex gap-3 sticky bottom-0 bg-white pb-2">
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
              text={initalData ? "Update Video" : "Add Video"}
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
