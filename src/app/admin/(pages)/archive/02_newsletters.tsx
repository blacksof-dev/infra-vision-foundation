"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import { X, Calendar, ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import PdfPicker from "../../components/input/pdfPicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { fileSchema, generalSchema } from "../../lib/zod";
import { toast } from "react-toastify";
import ConfirmationPopup from "../../components/confirmationPopup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import MessageInput from "../../components/input/textareaInput";

interface NewsletterItem {
  id: string;
  title: string;
  subtitle: string;

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
  const [limit] = useState<number>(12);
  const [sortBy] = useState<string>("publishedDate");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [year, setYear] = useState<string>("All years");

  const [years, setYears] = useState<number[]>([]);

  const loadNewsletters = useCallback(
    async (nextPage = page) => {
      try {
        setIsLoadingList(true);
        const query = new URLSearchParams({
          page: String(nextPage),
          limit: String(limit),
          sortBy,
          sortOrder,
        });
        if (year && year !== "All years") query.append("year", year);

        const res = (await getData(
          `/archives/newsletter?${query.toString()}`,
          session,
        )) as ListResponse;
        setFormState((s) => ({ ...s, items: res?.data ?? [] }));
        setPagination(res?.meta ?? null);
        setPage(nextPage);
      } catch (e) {
        toast.error("Failed to load newsletters");
      } finally {
        setIsLoadingList(false);
      }
    },
    [session, limit, sortBy, sortOrder, year, page],
  );

  async function loadYears() {
    try {
      const res = (await getData(
        "/archives/newsletter/years",
        session,
      )) as number[];
      setYears(res ?? []);
    } catch {}
  }

  useEffect(() => {
    loadNewsletters(1);
    loadYears();
  }, [year, sortOrder, status]);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deleteNewsletter(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/newsletter/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setDeletingId(null);
        loadNewsletters(page);
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
          heading="Newsletters"
          ctaText="Add New Newsletter"
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
              Loading newsletters...
            </p>
          </div>
        ) : formState.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg translate-y-2">
            <p className="text-gray-500 font-medium font-poppin">
              No newsletters found.
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
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.coverImage}`}
                    alt={it.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs w-fit mb-2 font-medium text-pink px-2 py-0.5 bg-pink/10 rounded-full flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(it.publishedDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <h3 className="text-base font-medium text-gray-900 leading-tight mb-2 line-clamp-3  mt-2">
                    {it.title}
                  </h3>

                  <div className="mb-4 pt-2 border-t border-gray-50">
                    <a
                      href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-pink hover:underline uppercase tracking-widest transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View PDF
                    </a>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 space-y-4">
                    <div className="flex items-center justify-end">
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
              onClick={() => loadNewsletters(page - 1)}
            />
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => loadNewsletters(p)}
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
              onClick={() => loadNewsletters(page + 1)}
            />
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <NewsletterForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadNewsletters(page);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => deleteNewsletter(deletingId)}
        />
      )}
    </>
  );
}

// ================== FORM ==================

const newsletterSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: z.string().optional(),

  publishedDate: generalSchema("Publication date is required"),
  active: z.boolean(),
  coverImageFile: z.any(),
  pdfFile: z.any(),
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

  const {
    register,
    handleSubmit,
    watch,
    setError,

    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      title: initalData?.title || "",
      subtitle: initalData?.subtitle || "",

      publishedDate: initalData?.publishedDate?.slice(0, 10) || "",
      active: initalData ? initalData.active : true,
      coverImageFile: initalData?.coverImage || undefined,
      pdfFile: initalData?.fileUrl || undefined,
    } as any,
  });

  const submitHandler: SubmitHandler<NewsletterFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle || "");

      formData.append("publishedDate", data.publishedDate);
      formData.append("version", ""); //We have remoe this field from frontend
      formData.append("active", String(true));

      const imgVal = data.coverImageFile;
      if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("coverImageFile", imgVal[0]);
      } else if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("coverImageUrl", imgVal);
      } else if (!initalData) {
        setError("coverImageFile", {
          type: "manual",
          message: "Cover image is required",
        });
        setIsLoading(false);
        return;
      }

      const pdfVal = data.pdfFile;
      if (pdfVal instanceof FileList && pdfVal.length > 0) {
        formData.append("pdfFile", pdfVal[0]);
      } else if (typeof pdfVal === "string" && pdfVal.trim()) {
        formData.append("pdfUrl", pdfVal);
      } else if (!initalData) {
        setError("pdfFile", { type: "manual", message: "PDF is required" });
        setIsLoading(false);
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initalData ? "Edit Newsletter" : "Create New Newsletter"}
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
            <MessageInput
              label="Newsletter Title*"
              errors={errors.title}
              placeholder="e.g. Monthly Infrastructure Update"
              register={register}
              registerer="title"
            />

            <TextInput
              label="Publication Date*"
              placeholder="yyyy-mm-dd"
              errors={errors.publishedDate}
              register={register}
              registerer="publishedDate"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePicker
                label="Cover Image* (Max-limit - 3MB)"
                errors={errors.coverImageFile}
                register={register}
                registerer="coverImageFile"
                watcher={watch("coverImageFile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
              <PdfPicker
                label="PDF Document* (Max-limit - 10MB)"
                errors={errors.pdfFile}
                register={register}
                registerer="pdfFile"
                watcher={watch("pdfFile")}
                accept=".pdf"
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
              text={initalData ? "Update Newsletter" : "Create Newsletter"}
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
