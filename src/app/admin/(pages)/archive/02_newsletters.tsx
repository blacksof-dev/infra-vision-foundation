"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import { X } from "lucide-react";
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

interface NewsletterItem {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  publishedDate: string; // YYYY-MM-DD
  coverImage: string;
  fileUrl: string;
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
  data: NewsletterItem[];
  meta: Pagination;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: NewsletterItem | null;
  items: NewsletterItem[];
}

export default function Newsletters() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("publishedDate");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [year, setYear] = useState<string>("All years");
  const [activeOnly, setActiveOnly] = useState<boolean>(true);
  const [years, setYears] = useState<number[]>([]);

  async function loadNewsletters(nextPage = page) {
    try {
      setIsLoadingList(true);
      const query = new URLSearchParams({
        page: String(nextPage),
        limit: String(limit),
        sortBy,
        sortOrder,
        activeOnly: String(activeOnly),
      });
      if (year && year!=="All years") query.append("year", year);

      const res = (await getData(
        `/archives/newsletter?${query.toString()}`,
        session
      )) as ListResponse;
      setFormState((s) => ({ ...s, items: res?.data ?? [] }));
      setPagination(res?.meta ?? null);
      setPage(nextPage);
    } catch (e) {
      toast.error("Failed to load newsletters");
    } finally {
      setIsLoadingList(false);
    }
  }

  async function loadYears() {
    try {
      const res = (await getData("/archives/newsletter/years",session)) as number[];
      setYears(res ?? []);
    } catch {}
  }

  useEffect(() => {
    loadNewsletters(1);
    loadYears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder, year, activeOnly]);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function deleteNewsletter(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/newsletter/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setFormState((s) => ({
          ...s,
          items: s.items.filter((p) => p.id !== id),
        }));
        setConfirmOpen(false);
        setDeletingId("");
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <section className="blade-top-margin-lg">
      <SectionHeading
        heading="Section 02 - (Newsletters)"
        ctaText="Add new newsletter"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center my-6">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray">
            <SelectItem key="i3xgm4u9gh8ajfk03c" value="All years">All years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray">
            <SelectItem value="asc">Oldest first</SelectItem>
            <SelectItem value="desc">Newest first</SelectItem>
          </SelectContent>
        </Select>

        {/* <Button
          text={activeOnly ? "Active Only" : "All"}
          theme="transparentPink"
          size="large"
          className="py-3.5"
          onClick={() => setActiveOnly((v) => !v)}
        /> */}
      </div>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {formState.items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No newsletters found.
          </div>
        )}
        {formState.items.map((it) => (
          <article
            key={it.id}
            className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md transition-shadow gap-4 flex flex-col justify-between"
          >
            <div> 
                <div className="w-full h-[14rem] rounded-md border border-gray">

              <img
                src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.coverImage}`}
                alt={it.title}
                className=" object-cover h-full w-full object-top "
                />
                </div>
              <div className="flex-1 mt-4">
                
                <div className="    flex justify-between">
                  <span className=" flex items-center gap-2"><span className="block w-2 h-2 shrink-0 bg-pink rounded-full"></span>{it.version}</span>  
                  <span className="block text-darkgray">
                  {new Date(it.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <h6 className="text-base font-medium mt-4">{it.title}</h6>
                {/* <p className="text-sm text-darkgray/80">{it.subtitle}</p> */}
                <div className="mt-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.fileUrl}`}
                    target="_blank"
                    className="underline text-base text-pink"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <Button
                text="Delete"
                theme="transparentPink"
                size="base"
                onClick={() => {
                  setDeletingId(it.id);
                  setConfirmOpen(true);
                }}
              />
              <Button
                text="Edit"
                theme="pink"
                size="base"
                onClick={() =>
                  setFormState((s) => ({
                    ...s,
                    isFormOpen: true,
                    editItem: it,
                  }))
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
            onClick={() => loadNewsletters(Math.max(1, page - 1))}
          />
          <span className="text-base text-darkgray/80">
            Page {page} of {pagination.totalPages ?? 1}
          </span>
          <Button
            text="Next"
            theme="pink"
            size="small"
            isDisabled={page >= (pagination.totalPages ?? 1)}
            onClick={() =>
              loadNewsletters(Math.min(pagination.totalPages, page + 1))
            }
          />
        </div>
      )}

      {formState.isFormOpen && (
        <NewsletterForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadNewsletters(page);
          }}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
          <div className="w-[24rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[70vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-base font-medium">Confirm deletion</h6>
              
            </div>
            <p className="text-sm text-darkgray/80">
              This action cannot be undone. Are you sure you want to delete this
              newsletter?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                text="Cancel"
                theme="transparentGray"
                size="small"
                onClick={() => setConfirmOpen(false)}
              />
              <Button
                text="Delete"
                theme="pink"
                size="small"
                onClick={() => deletingId && deleteNewsletter(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ================== FORM ==================

const newsletterSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: z.string().optional(),
  version: generalSchema("Version is required"),
  publishedDate: generalSchema("Publication date is required"),
  coverImageFile: fileSchema,
  pdfFile: fileSchema,
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

function NewsletterForm({
  initalData,
  onClose,
}: {
  initalData: NewsletterItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues: Partial<NewsletterFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        title: "",
        subtitle: "",
        version: "",
        publishedDate: "",
        coverImageFile: undefined,
        pdfFile: undefined,
      };
    }
    return {
      title: initalData.title,
      subtitle: initalData.subtitle,
      version: initalData.version,
      publishedDate: initalData.publishedDate?.slice(0, 10) || "",
      coverImageFile: initalData.coverImage,
      pdfFile: initalData.fileUrl,
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: defaultValues as NewsletterFormValues,
  });

  const submitHandler: SubmitHandler<NewsletterFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title ?? "");
      formData.append("subtitle", data.subtitle ?? "");
      formData.append("version", data.version);
      formData.append("publishedDate", data.publishedDate);
      formData.append("active", "true");

      const imgVal = data.coverImageFile as unknown;
      if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("coverImageUrl", imgVal);
      } else if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("coverImageFile", imgVal[0] as File);
      } else {
        setError("coverImageFile", {
          type: "manual",
          message: "Cover image is required",
        });
        return;
      }

      const pdfVal = data.pdfFile as unknown;
      if (typeof pdfVal === "string" && pdfVal.trim()) {
        formData.append("pdfUrl", pdfVal);
      } else if (pdfVal instanceof FileList && pdfVal.length > 0) {
        formData.append("pdfFile", pdfVal[0] as File);
      } else {
        setError("pdfFile", { type: "manual", message: "PDF is required" });
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/archives/newsletter`;
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
          initalData ? "Updated successfully" : "Created successfully"
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
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[32rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto">
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
              />
              {/* <TextInput
                label="Subtitle"
                errors={errors.subtitle}
                placeholder="Enter subtitle"
                register={register}
                registerer="subtitle"
              /> */}
              <TextInput
                label="Version"
                errors={errors.version}
                placeholder="Vol. 1, Issue 2"
                register={register}
                registerer="version"
              />
              <TextInput
                label="Publication Date"
                errors={errors.publishedDate}
                placeholder="2025-01-31"
                register={register}
                registerer="publishedDate"
              />

              <ImagePicker
                label="Cover Image"
                errors={errors.coverImageFile}
                register={register}
                registerer="coverImageFile"
                watcher={watch("coverImageFile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />

              <PdfPicker
                label="PDF File"
                errors={errors.pdfFile}
                register={register}
                registerer="pdfFile"
                watcher={watch("pdfFile")}
                accept=".pdf"
              />
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
    </div>
  );
}
