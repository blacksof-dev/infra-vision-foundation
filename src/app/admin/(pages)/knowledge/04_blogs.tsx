"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import PdfPicker from "../../components/input/pdfPicker";
import { fileSchema, generalSchema } from "../../lib/zod";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import EditorJSWrapper from "../../components/editorjs";
import { OutputData } from "@editorjs/editorjs";
import Link from "next/link";
import { X, Calendar, ExternalLink, FileText, Info } from "lucide-react";
import { ToggleSwitch } from "../../components/toggleSwitch";
import ConfirmationPopup from "../../components/confirmationPopup";

// Types
type Sector = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

interface BlogItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string | null;
  docFile: string | null;
  publishedDate: string;
  content: any;
  active: boolean;
  sectorIds: string[];
  sectors?: { id: string; name: string }[];
  author: string;
  readingTime: number;
}

interface Pagination {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ListResponse {
  blogs: BlogItem[];
  pagination: Pagination;
  lastUpdated: string;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: BlogItem | null;
  items: BlogItem[];
}

export default function KnowledgeBlogs() {
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
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSectors = useCallback(async () => {
    try {
      const data = (await getData(
        "/knowledge/sectors?activeOnly=true",
        session,
      )) as Sector[];
      setSectors(data || []);
    } catch (e) {
      console.error("Failed to load sectors:", e);
    }
  }, [session]);

  const fetchYears = useCallback(async () => {
    try {
      const data = (await getData(
        "/knowledge/blogs/years?activeOnly=true",
        session,
      )) as number[];
      setYears(data || []);
    } catch (e) {
      console.error("Failed to load years:", e);
    }
  }, [session]);

  const loadBlogs = useCallback(
    async (targetPage = page, sectorId = sectorFilter, year = yearFilter) => {
      try {
        setIsLoadingList(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
        });
        if (sectorId !== "all") {
          query.append("sectorId", sectorId);
        }
        if (year !== "all") {
          query.append("year", year);
        }

        const res = (await getData(
          `/knowledge/blogs?${query.toString()}`,
          session,
        )) as ListResponse;
        setFormState((s) => ({ ...s, items: res?.blogs ?? [] }));
        setPagination(res?.pagination ?? null);
        setPage(targetPage);
      } catch (e) {
        toast.error("Failed to load blogs");
      } finally {
        setIsLoadingList(false);
      }
    },
    [session, limit, sectorFilter, yearFilter, page],
  );

  useEffect(() => {
    fetchSectors();
    fetchYears();
  }, [fetchSectors, fetchYears]);

  useEffect(() => {
    loadBlogs(1, sectorFilter, yearFilter);
  }, [sectorFilter, yearFilter]);

  async function deleteBlog(id: string) {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Deleted successfully");
      setFormState((s) => ({
        ...s,
        items: s.items.filter((b) => b.id !== id),
      }));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${id}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Status updated");
      loadBlogs(page, sectorFilter, yearFilter);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Toggle failed");
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Section - 04 (Blogs)"
          ctaText="Add New Blog"
          cta
          handleClick={() =>
            setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-56 h-11 border-gray bg-white">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-56 h-11 border-gray bg-white">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoadingList && formState.items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500 font-poppin">Loading blogs...</p>
          </div>
        ) : formState.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg translate-y-2">
            <p className="text-gray-500 font-medium font-poppin">
              No blogs found.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {formState.items.map((it) => (
              <article
                key={it.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {it.coverImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.coverImage}`}
                      alt={it.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {(it.sectors && it.sectors.length > 0
                      ? it.sectors
                      : [{ name: "Uncategorized" }]
                    ).map((s: any, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-pink uppercase tracking-wider shadow-sm"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs w-fit mb-2 font-medium text-pink px-2 py-0.5 bg-pink/10 rounded-full">
                    {new Date(it.publishedDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-base my-2 font-bold text-gray-900 leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                    {it.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {it.subtitle}
                  </p>

                  <div className="mb-4 pt-2 border-t border-gray-50 flex items-center gap-3">
                    <Link
                      href={`/blogs/${it.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-gray-700 uppercase tracking-widest transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Blog
                    </Link>
                    {it.docFile && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.docFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        View PDF
                      </a>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ToggleSwitch
                          checked={it.active}
                          onChange={() => handleToggle(it.id)}
                        />
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {it.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex gap-2">
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
              onClick={() => loadBlogs(page - 1, sectorFilter, yearFilter)}
            />
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => loadBlogs(p, sectorFilter, yearFilter)}
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
              onClick={() => loadBlogs(page + 1, sectorFilter, yearFilter)}
            />
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <BlogForm
          initalData={formState.editItem}
          sectors={sectors}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadBlogs(page, sectorFilter, yearFilter);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={async () => {
            await deleteBlog(deletingId);
            setDeletingId(null);
          }}
          title="Delete Blog"
          message="Are you sure you want to delete this blog? This action cannot be undone."
        />
      )}
    </>
  );
}

const blogSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: generalSchema("Description is required"),
  publishedDate: generalSchema("Publication date is required"),
  author: generalSchema("Author is required"),
  readingTime: z
    .number({ required_error: "Reading time is required" })
    .min(1, { message: "Reading time must be at least 1 minute" })
    .int({ message: "Reading time must be a whole number" }),
  coverImageFile: fileSchema,
  docFile: fileSchema.optional(),
  sectorIds: z
    .array(z.string())
    .min(1, { message: "Select at least one sector" }),
  content: z.any().optional(),
});
type BlogFormValues = z.infer<typeof blogSchema>;

function BlogForm({
  initalData,
  onClose,
  sectors: parentSectors,
}: {
  initalData: BlogItem | null;
  onClose: () => void;
  sectors: Sector[];
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [editorData, setEditorData] = useState<OutputData | undefined>(
    initalData?.content
      ? typeof initalData.content === "string"
        ? JSON.parse(initalData.content)
        : initalData.content
      : undefined,
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorHolderId] = useState(
    () =>
      `editorjs-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  );

  useEffect(() => {
    async function fetchSectors() {
      try {
        const data = (await getData(
          "/knowledge/sectors?activeOnly=true",
          session,
        )) as Sector[];
        setSectors(data.filter((s) => s.active));
      } catch {}
    }
    fetchSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues: Partial<BlogFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        title: "",
        subtitle: "",
        publishedDate: "",
        author: "",
        readingTime: undefined,
        coverImageFile: undefined,
        docFile: "",
        sectorIds: [],
        content: "",
      };
    }
    return {
      title: initalData.title,
      subtitle: initalData.subtitle,
      publishedDate: initalData.publishedDate?.slice(0, 10) || "",
      author: initalData.author || "",
      readingTime: initalData.readingTime || undefined,
      coverImageFile: initalData.coverImage || "",
      docFile: initalData.docFile || "",
      sectorIds: initalData.sectorIds,
      content: initalData.content,
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    setValue,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValues as BlogFormValues,
  });

  const submitHandler: SubmitHandler<BlogFormValues> = async (data) => {
    try {
      setIsLoading(true);
      console.log(JSON.stringify(editorData));
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("publishedDate", data.publishedDate);
      formData.append("author", data.author);
      formData.append("readingTime", String(data.readingTime));
      formData.append("active", "true");
      data.sectorIds.forEach((s) => formData.append("sectorIds", s));
      if (editorData) formData.append("content", JSON.stringify(editorData));

      // coverImage
      const imgVal = data.coverImageFile as unknown;
      if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("coverImage", imgVal);
      } else if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("coverImageFile", imgVal[0] as File);
      }

      // docFile
      const pdfVal = data.docFile as unknown;
      if (typeof pdfVal === "string" && pdfVal.trim()) {
        formData.append("docFile", pdfVal);
      } else if (pdfVal instanceof FileList && pdfVal.length > 0) {
        formData.append("docFile", pdfVal[0] as File);
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs`;
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
      } else {
        toast.error("Save failed");
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initalData ? "Edit Blog" : "Create New Blog"}
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
                label="Title*"
                errors={errors.title}
                placeholder="e.g. Infrastructure Development Trends 2024"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Publication Date*"
                placeholder="YYYY-MM-DD"
                errors={errors.publishedDate}
                register={register}
                registerer="publishedDate"
              />
            </div>

            <TextInput
              label="Description*"
              errors={errors.subtitle}
              placeholder="A short description  "
              register={register}
              registerer="subtitle"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Author*"
                errors={errors.author}
                placeholder="e.g. By Lawrence Cardoza"
                register={register}
                registerer="author"
              />
              <div>
                <label className="text-sm font-bold text-gray-700 font-poppin block mb-2">
                  Reading Time (minutes)*
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 6"
                  {...register("readingTime", {
                    valueAsNumber: true,
                    required: "Reading time is required",
                    min: {
                      value: 1,
                      message: "Reading time must be at least 1 minute",
                    },
                  })}
                  className="w-full h-11 px-3 border border-gray bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent"
                />
                {errors.readingTime && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.readingTime.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 font-poppin">
                Sector Category*
              </label>
              <Select
                value={
                  ((watch("sectorIds") as unknown as string[]) || [])[0] || ""
                }
                onValueChange={(val) =>
                  setValue("sectorIds", val ? [val] : [], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger className="w-full h-11 border border-gray bg-white rounded-lg">
                  <SelectValue placeholder="Select primary sector" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 z-[1001] shadow-xl">
                  {sectors.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sectorIds && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.sectorIds.message as any}
                </p>
              )}
            </div>

            <ImagePicker
              label="Thumbnail* (Max-limit - 3MB)"
              errors={errors.coverImageFile}
              register={register}
              registerer="coverImageFile"
              watcher={watch("coverImageFile")}
              accept=".svg, .png, .jpg, .jpeg, .webp"
            />
            <PdfPicker
              label="PDF File (optional)  (Max-limit - 10MB)"
              errors={errors.docFile}
              register={register}
              registerer="docFile"
              watcher={watch("docFile")}
              accept=".pdf"
            />

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 font-poppin">
                Content
              </label>
              <div className="text-sm text-gray-600 mb-2">
                You can add detailed content for the blog using editor.
              </div>
              <Button
                type="button"
                text="Open Blog Editor"
                theme="transparentPink"
                size="small"
                onClick={() => setIsEditorOpen(true)}
              />
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
              text={initalData ? "Update Blog" : "Create Blog"}
              theme="pink"
              size="large"
              className="flex-1"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
          <div className="rounded-xl border border-pink/20 bg-pink/5 p-4 sm:p-5 space-y-3">
            {/* Header */}
            <div className="flex items-center gap-2 text-pink font-semibold">
              <Info className="w-4 h-4" />
              <span>Blog Metadata Guidelines</span>
            </div>

            {/* Content */}
            <ul className="space-y-2 text-sm sm:text-[15px] text-gray-700">
              <li>
                <span className="font-medium text-pink ">
                  Title, description, date, author,cover image, and reading time
                </span>{" "}
                are used as metadata for the blog.
              </li>

              <li>
                <span className="font-medium text-pink">
                  Always use a unique title
                </span>{" "}
                because it will be used to generate the blog URL.
              </li>
            </ul>
          </div>
        </form>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
          <div className="w-[90vw] h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray">
              <h6 className="text-xl font-semibold">Blog Content Editor</h6>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 rounded-full ring-1 ring-black hover:bg-gray-100 cursor-pointer hover:scale-110 transition-all duration-300"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <EditorJSWrapper
                  holder={editorHolderId}
                  data={editorData}
                  onChange={(data) => setEditorData(data)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray">
              <Button
                text="Discard Changes"
                theme="transparentGray"
                size="base"
                type="button"
                onClick={() => setIsEditorOpen(false)}
              />

              <Button
                text="Done"
                theme="pink"
                size="base"
                type="button"
                onClick={() => {
                  setIsEditorOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
