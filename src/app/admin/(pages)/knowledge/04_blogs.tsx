"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import MarkdownEditor from "../../components/markdownEditor";
import Link from "next/link";
import { X } from "lucide-react";

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
  coverImage: string | null;
  docFile: string | null;
  publishedDate: string;
  content: string;
  active: boolean;
  sectorIds: string[];
  sectors?: { id: string; name: string }[];
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
  const [limit] = useState<number>(10); // items per page

  async function loadBlogs(nextPage = page) {
    try {
      setIsLoadingList(true);
      const res = (await getData(
        `/knowledge/blogs?page=${nextPage}&limit=${limit}`,
        session
      )) as ListResponse;
      setFormState((s) => ({ ...s, items: res?.blogs ?? [] }));
      setPagination(res?.pagination ?? null);
      setPage(nextPage);
    } catch (e) {
      toast.error("Failed to load blogs");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadBlogs(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteBlog(id: string) {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
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

  async function toggleStatus(id: string) {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/blogs/${id}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Status updated");
      await loadBlogs(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Toggle failed");
    }
  }

  return (
    <section className="blade-top-margin-lg">
      <SectionHeading
        heading="Section - 04 (Blogs)"
        ctaText="Add new blog"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {formState.items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-gray rounded-md bg-white">
            No blogs found.
          </div>
        )}
        {formState.items.map((it) => (
          <article
            key={it.id}
            className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md transition-shadow gap-4 flex flex-col justify-between"
          > 
          <div>
            
            {it.coverImage && (
              <img
                src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.coverImage}`}
                alt={it.title}
                className="w-full object-cover rounded-md border border-lightgray/40"
              />
            )}
            <div className="flex-1 mt-3">
              <h6 className="text-base font-medium">{it.title}</h6>
              <p className="text-sm text-darkgray/80">{it.subtitle}</p>
              <div className="text-xs text-darkgray/70 mt-2 flex gap-2 flex-wrap">
                <span>{new Date(it.publishedDate).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span>
                  {(it.sectors?.map((s) => s.name) ?? it.sectorIds).join(", ")}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Link
                  href={`/blogs/${it.title.split(" ").join("-").toLowerCase()}`}
                  target="_blank"
                  className="underline text-base"
                >
                  View Blog
                </Link>
                {it.docFile && (
                  <a
                    href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.docFile}`}
                    target="_blank"
                    className="underline text-base"
                  >
                    View PDF
                  </a>
                )}
              </div>
            </div>
          </div>

            <div className="flex justify-between gap-2 mt-8">
              <Button
                text={it.active ? "Deactivate" : "Activate"}
                theme="transparentGray"
                size="base"
                onClick={() => toggleStatus(it.id)}
              />
              <Button
                text="Delete"
                theme="transparentPink"
                size="base"
                onClick={() => deleteBlog(it.id)}
              />
              <Button
                text="Edit"
                theme="pink"
                size="base"
                onClick={() =>
                  setFormState((s) => ({ ...s, isFormOpen: true, editItem: it }))
                }
              />
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-center gap-4 pt-6 mt-6 border-t border-lightgray/30">
          <Button
            text="Prev"
            theme="pink"
            size="small"
            isDisabled={page <= 1}
            onClick={() => loadBlogs(Math.max(1, page - 1))}
          />
          <span className="text-base text-darkgray/80">
            Page {page} of {pagination.totalPages ?? 1}
          </span>
          <Button
            text="Next"
            theme="pink"
            size="small"
            isDisabled={page >= (pagination.totalPages ?? 1)}
            onClick={() => loadBlogs(Math.min(pagination.totalPages, page + 1))}
          />
        </div>
      )}

      {formState.isFormOpen && (
        <BlogForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadBlogs(page);
          }}
        />
      )}
    </section>
  );
}

const blogSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: generalSchema("Subtitle is required"),
  publishedDate: generalSchema("Publication date is required"),
  coverImageFile: fileSchema.optional(),
  docFile: fileSchema.optional(),
  sectorIds: z.array(z.string()).min(1, { message: "Select at least one sector" }),
  content: z.string().optional(),
});
type BlogFormValues = z.infer<typeof blogSchema>;

function BlogForm({
  initalData,
  onClose,
}: {
  initalData: BlogItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [markDownValue, setMarkDownValue] = useState<string>(
    initalData?.content || ""
  );
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(false);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const data = (await getData("/knowledge/sectors?activeOnly=true", session)) as Sector[];
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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("publishedDate", data.publishedDate);
      formData.append("active", "true");
      data.sectorIds.forEach((s) => formData.append("sectorIds", s));
      if (markDownValue) formData.append("content", markDownValue);

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
        toast.success(initalData ? "Updated successfully" : "Created successfully");
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
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[32rem] relative blade-top-padding-s bg-white rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto overflow-x-hidden">
        <form className="h-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex justify-end sticky top-2 px-1 z-[999]">
            <button
              type="button"
              aria-label="close modal"
              className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-y-6 h-full p-8 pt-1">
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                label="Title"
                errors={errors.title}
                placeholder="Enter title"
                register={register}
                registerer="title"
                tooltip="The main title of the blog"
              />
              <TextInput
                label="Subtitle"
                errors={errors.subtitle}
                placeholder="Enter subtitle"
                register={register}
                registerer="subtitle"
                tooltip="A short description or subtitle for the blog"
              />
              <TextInput
                label="Publication Date (YYYY-MM-DD)"
                errors={errors.publishedDate}
                placeholder="2025-01-31"
                register={register}
                registerer="publishedDate"
                tooltip="Format: YYYY-MM-DD"
              />

              <ImagePicker
                label="Cover Image"
                errors={errors.coverImageFile}
                register={register}
                registerer="coverImageFile"
                watcher={watch("coverImageFile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Recommended size - 1024x700. Max file size 2MB."
              />

              <PdfPicker
                label="PDF File"
                errors={errors.docFile}
                register={register}
                registerer="docFile"
                watcher={watch("docFile")}
                accept=".pdf" 
                tooltip="Upload PDF document"
              />

              <div>
                <div className="font-medium pb-1.5">Sectors</div>
                <Select
                  value={((watch("sectorIds") as unknown as string[]) || [])[0] || ""}
                  onValueChange={(val) =>
                    setValue("sectorIds", val ? [val] : [], {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {sectors.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sectorIds && (
                  <p className="text-red-500 text-[15px] pt-1">
                    {errors.sectorIds.message as any}
                  </p>
                )}
              </div>

              {/* Markdown button */}
              <div> 
                <div className="font-medium ">Content</div>
                <div className="text-sm text-darkgray/80 mb-2">
                    You can add detailed content for the blog using editor.
                  </div>
                <Button
                  type="button"
                  text="Open Markdown Editor"
                  theme="transparentPink"
                  size="small"
                  onClick={() => setIsMarkdownOpen(true)}
                />
              </div>
            </div>

            <div className="mt-auto">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text={initalData ? "Update" : "Create"}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>

     {isMarkdownOpen && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
          <div className="w-[80vw] h-[80vh] bg-white rounded-lg shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray">
              <h6 className="text-base font-medium">Markdown Editor</h6>
              <button
                onClick={() => setIsMarkdownOpen(false)}
                className="p-1 rounded-full ring-1 ring-black hover:bg-gray-100 cursor-pointer hover:scale-110 transition-all duration-300"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-auto p-4">
              <MarkdownEditor
                value={markDownValue}
                // onChange={(val) => setMarkDownValue(val || "")}

                setValue={setMarkDownValue}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray">
              <Button
                text="Cancel"
                theme="transparentPink"
                size="base"
                type="button"
                onClick={() => setIsMarkdownOpen(false)}
                 
              />
               
              
              <Button
                text="Save"
                theme="pink"
                size="base"
                type="button"
                onClick={() => {
                  console.log("Markdown Saved:", markDownValue);
                  setIsMarkdownOpen(false);
                }}
                
              />
                
               
            </div>
          </div>
        </div>
      )}
      </div>)
}