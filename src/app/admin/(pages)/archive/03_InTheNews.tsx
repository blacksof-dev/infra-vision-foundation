"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import {
  X,
  Calendar,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import PdfPicker from "../../components/input/pdfPicker";
import { generalSchema, fileSchema } from "../../lib/zod";
import { toast } from "react-toastify";
import ConfirmationPopup from "../../components/confirmationPopup";
import Tooltip from "../../components/input/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

interface MediaItem {
  id: string;
  image: string | null; // Cover image path
  title: string;
  date: string; // YYYY/MM/DD
  author: string;
  link: string | null; // Article link
  pdfFile: string | null; // PDF path
  imageFile: string | null; // Full image path
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
  data: MediaItem[];
  meta: Pagination;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: MediaItem | null;
  items: MediaItem[];
}

export default function InTheNews() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [year, setYear] = useState<string>("All years");
  const [years, setYears] = useState<string[]>([]);

  const loadMedia = useCallback(
    async (nextPage = page) => {
      try {
        setIsLoadingList(true);
        const query = new URLSearchParams({
          page: String(nextPage),
          limit: String(limit),
          sortOrder,
        });

        if (year && year !== "All years") {
          query.append("year", year);
        }

        const res = (await getData(
          `/archives/media-coverage?${query.toString()}`,
          session,
        )) as ListResponse;

        setFormState((s) => ({ ...s, items: res?.data ?? [] }));
        setPagination(res?.meta ?? null);
        setPage(nextPage);
      } catch (e) {
        toast.error("Failed to load media coverage");
      } finally {
        setIsLoadingList(false);
      }
    },
    [session, limit, sortOrder, page, year],
  );

  const loadYears = useCallback(async () => {
    try {
      const res = (await getData(
        "/archives/media-coverage/years",
        session,
      )) as string[];
      setYears(res ?? []);
    } catch {}
  }, [session]);

  useEffect(() => {
    loadMedia(1);
    loadYears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, year]);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deleteMedia(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/media-coverage/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setDeletingId(null);
        loadMedia(page);
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="In the News"
          ctaText="Add New Entry"
          cta
          handleClick={() =>
            setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-48 h-11 border-gray bg-white">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="All years">All years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-48 h-11 border-gray bg-white">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="asc">Oldest first</SelectItem>
              <SelectItem value="desc">Newest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoadingList && formState.items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500 font-poppin">
              Loading media entries...
            </p>
          </div>
        ) : formState.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg translate-y-2">
            <p className="text-gray-500 font-medium font-poppin">
              No media coverage found.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {formState.items.map((it) => (
              <article
                key={it.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 border-b border-gray-100">
                  {it.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
                      alt={it.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs w-fit mb-2 font-medium text-pink px-2 py-0.5 bg-pink/10 rounded-full flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(it.date).toLocaleDateString("en-IN",{
                      day:"2-digit",
                      month:"short",
                      year:"numeric"
                    })}
                  </div>

                  <h3 className="text-base font-medium text-gray-900 leading-tight mb-2 line-clamp-3  ">
                    {it.title}
                  </h3> 
                  <h4 className="text-sm font-medium text-gray-500 leading-tight mb-2 line-clamp-3">
                    {it.author}
                  </h4>

                  <div className="flex flex-wrap gap-3 mb-4 pt-2 border-t border-gray-50">
                    {it.link && (
                      <a
                        href={it.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-pink hover:underline uppercase tracking-widest transition-colors"
                      >
                        <LinkIcon className="w-3 h-3" />
                        Link
                      </a>
                    )}
                    {it.pdfFile && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.pdfFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-pink hover:underline uppercase tracking-widest transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        PDF
                      </a>
                    )}
                    {it.imageFile && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.imageFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-pink hover:underline uppercase tracking-widest transition-colors"
                      >
                        <ImageIcon className="w-3 h-3" />
                        Image
                      </a>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-end gap-2">
                      <Button
                        theme="transparentGray"
                        size="small"
                        text="Delete"
                        onClick={() => setDeletingId(it.id)}
                      />
                      <Button
                        theme="pink"
                        size="small"
                        text="Edit"
                        onClick={() =>
                          setFormState((s) => ({
                            ...s,
                            isFormOpen: true,
                            editItem: it,
                          }))
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
              onClick={() => loadMedia(page - 1)}
            />
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => loadMedia(p)}
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
              onClick={() => loadMedia(page + 1)}
            />
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <MediaForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadMedia(page);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => deleteMedia(deletingId)}
        />
      )}
    </>
  );
}

// ================== FORM ==================

const mediaSchema = z.object({
  title: generalSchema("Title is required"),
  author: generalSchema("Author/Publication is required"),
  date: generalSchema("Date is required"),
  link: z.string().optional().or(z.literal("")),
  thumbnail: fileSchema,
  pdfFile: z.any().optional(),
  imageFile: z.any().optional(),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

function MediaForm({
  initalData,
  onClose,
}: {
  initalData: MediaItem | null;
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
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: initalData?.title || "",
      author: initalData?.author || "",
      date: initalData?.date || "",
      link: initalData?.link || "",
      thumbnail: initalData?.image || undefined,
      pdfFile: initalData?.pdfFile || undefined,
      imageFile: initalData?.imageFile || undefined,
    } as any,
  });

  const submitHandler: SubmitHandler<MediaFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("date", data.date);
      formData.append("active", "true");
      formData.append("link", data.link || "");

      // Thumbnail (Cover Image)
      const thumbnailVal = data.thumbnail;
      if (thumbnailVal instanceof FileList && thumbnailVal.length > 0) {
        formData.append("coverImageFile", thumbnailVal[0]);
      } else if (typeof thumbnailVal === "string" && thumbnailVal.trim()) {
        formData.append("coverImageFile", thumbnailVal);
      } else {
        setError("thumbnail", {
          type: "manual",
          message: "Thumbnail is required",
        });
        setIsLoading(false);
        return;
      }

      // PDF File
      const pdfVal = data.pdfFile;
      if (pdfVal instanceof FileList && pdfVal.length > 0) {
        formData.append("pdfFile", pdfVal[0]);
      } else if (typeof pdfVal === "string" && pdfVal.trim()) {
        formData.append("pdfUrl", pdfVal);
      }

      // secondary imageFile
      const imgVal = data.imageFile;
      if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("imageFile", imgVal[0]);
      } else if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("imageUrl", imgVal);
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/archives/media-coverage`;
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

  const handleClearContent = async () => {
    if (!initalData?.id) {
      // If it's a new entry, just clear the form fields locally
      setValue("link", "");
      setValue("pdfFile", undefined);
      setValue("imageFile", undefined);
      toast.info("Local fields cleared");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/media-coverage/${initalData.id}/content`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Media content cleared successfully");
        setValue("link", "");
        setValue("pdfFile", undefined);
        setValue("imageFile", undefined);
      } else {
        toast.error("Failed to clear content");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to clear content");
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initalData ? "Edit Media Entry" : "Create New Media Entry"}
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
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Article Title*"
                errors={errors.title}
                placeholder="Title of the news piece"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Publication / Author*"
                errors={errors.author}
                placeholder="e.g. The Economic Times"
                register={register}
                registerer="author"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImagePicker
                label="Thumbnail / Cover Image*"
                errors={errors.thumbnail}
                register={register}
                registerer="thumbnail"
                watcher={watch("thumbnail")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
              <TextInput
                label="Date (YYYY/MM/DD)*"
                placeholder="YYYY/MM/DD"
                errors={errors.date}
                register={register}
                registerer="date"
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <TextInput
                label="External Link (Optional)"
                errors={errors.link}
                placeholder="https://example.com/article"
                register={register}
                registerer="link"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PdfPicker
                  label="PDF   (Optional)"
                  errors={errors.pdfFile}
                  register={register}
                  registerer="pdfFile"
                  watcher={watch("pdfFile")}
                  accept=".pdf"
                />
                <ImagePicker
                  label="Full Article Image (Optional)"
                  errors={errors.imageFile}
                  register={register}
                  registerer="imageFile"
                  watcher={watch("imageFile")}
                  accept=".svg, .png, .jpg, .jpeg, .webp"
                />
              </div>
              <div className="flex gap-4  justify-between pt-4">
                <p className="text-[12px] text-yellow-600 font-medium bg-yellow-50 p-2 rounded-md">
                  Note: You can provide the full article content via an external
                  link, a PDF document, or an image.
                </p>
                <div className="relative">
                  <div className="absolute -top-5 right-0">
                    <Tooltip text="Clear all links and uploaded files." />
                  </div>
                  <button
                    type="button"
                    onClick={handleClearContent}
                    className="bg-red-100 cursor-pointer p-2 text-sm rounded-md flex items-center gap-2 text-red-500 hover:bg-red-200 transition-colors"
                  >
                    Remove
                    <Trash className="size-4 " />
                  </button>
                </div>
              </div>
            </div>
          </div>

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
              text={initalData ? "Update Entry" : "Create Entry"}
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
