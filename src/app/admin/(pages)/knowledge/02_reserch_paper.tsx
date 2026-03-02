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

type Sector = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

interface ResearchPaperItem {
  id: string;
  title: string;
  image: string; // cover image path
  link: string; // pdf link path
  date: string; // YYYY-MM-DD
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
  researchPapers: ResearchPaperItem[];
  pagination: Pagination;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: ResearchPaperItem | null;
  items: ResearchPaperItem[];
}

export default function KnowledgeResearchPapers() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filters
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);

  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<boolean>(true);

  const fetchSectors = useCallback(async () => {
    try {
      const res = (await getData("/knowledge/sectors", session)) as any;
      const data = Array.isArray(res) ? res : res?.sectors || [];
      setSectors(data || []);
    } catch (e) {
      console.error("Failed to load sectors:", e);
    }
  }, [session]);

  const loadPapers = useCallback(
    async (targetPage = page) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
        });
        if (selectedSector !== "all") query.append("sectorId", selectedSector);
        query.append("activeOnly", String(activeFilter));

        const res = (await getData(
          `/knowledge/research-papers?${query.toString()}`,
          session,
        )) as any;
        console.log(res);
        const papers = res?.researchPapers || (Array.isArray(res) ? res : []);
        setFormState((s) => ({ ...s, items: papers }));
        setPagination(res?.pagination || null);
        setPage(targetPage);
      } catch (e) {
        toast.error("Failed to load research papers");
      } finally {
        setIsLoading(false);
      }
    },
    [session, limit, selectedSector, activeFilter],
  );

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  useEffect(() => {
    loadPapers(1);
  }, [selectedSector, activeFilter, loadPapers]);

  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/research-papers/${id}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Status updated");
      loadPapers(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle status");
    }
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deletePaper(id: string) {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/research-papers/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Deleted successfully");
      setDeletingId(null);
      loadPapers(page);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  // Format date to YYYY/MM/DD
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Research Papers"
          ctaText="Add New Paper"
          cta
          handleClick={() =>
            setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Select value={selectedSector} onValueChange={setSelectedSector}>
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

          <Select
            value={String(activeFilter)}
            onValueChange={(v) => setActiveFilter(v === "true")}
          >
            <SelectTrigger className="w-56 h-11 border-gray bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="true">Active Only</SelectItem>
              <SelectItem value="false">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && formState.items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500 font-poppin">
              Loading research papers...
            </p>
          </div>
        ) : formState.items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg translate-y-2">
            <p className="text-gray-500 font-medium font-poppin">
              No research papers found.
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
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
                    alt={it.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {it.sectorIds && it.sectorIds.length > 0 ? (
                      it.sectorIds.map((sid) => {
                        const sector = sectors.find((s) => s.id === sid);
                        return (
                          <span
                            key={sid}
                            className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-pink uppercase tracking-wider shadow-sm"
                          >
                            {sector ? sector.name : "Uncategorized"}
                          </span>
                        );
                      })
                    ) : (
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-pink uppercase tracking-wider shadow-sm">
                        Uncategorized
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs w-fit mb-2 font-medium text-pink px-2 py-0.5 bg-pink/10 rounded-full">
                    {new Date(it.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                    {it.title}
                  </h3>

                  <div className="mb-4 pt-2 border-t border-gray-50">
                    <a
                      href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-gray-700 uppercase tracking-widest transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View PDF
                    </a>
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
              onClick={() => loadPapers(page - 1)}
            />
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => loadPapers(p)}
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
              onClick={() => loadPapers(page + 4)}
            />
          </div>
        )}
      </section>

      {formState.isFormOpen && (
        <ResearchPaperForm
          sectors={sectors}
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadPapers(page);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => deletePaper(deletingId)}
        />
      )}
    </>
  );
}

const researchPaperSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Publication date is required"),
  active: z.boolean(),
  imageFile: z.any(),
  pdfFile: z.any(),
  sectorIds: z
    .array(z.string())
    .min(1, { message: "Select at least one sector" }),
});

type ResearchPaperFormValues = z.infer<typeof researchPaperSchema>;

function ResearchPaperForm({
  sectors,
  initalData,
  onClose,
}: {
  sectors: Sector[];
  initalData: ResearchPaperItem | null;
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
  } = useForm<ResearchPaperFormValues>({
    resolver: zodResolver(researchPaperSchema),
    defaultValues: {
      title: initalData?.title || "",
      date: initalData?.date?.slice(0, 10) || "",
      active: initalData ? initalData.active : true,
      imageFile: initalData?.image || undefined,
      pdfFile: initalData?.link || "",
      sectorIds: initalData?.sectorIds || [],
    } as any,
  });

  const submitHandler: SubmitHandler<ResearchPaperFormValues> = async (
    data,
  ) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      // Sending title as description to satisfy backend requirement if any
      formData.append("description", data.title);
      formData.append("date", data.date);
      formData.append("active", String(data.active));
      data.sectorIds.forEach((s) => formData.append("sectorIds", s));

      const imgVal = data.imageFile;
      if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("imageFile", imgVal[0]);
      } else if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("imageUrl", imgVal);
      } else if (!initalData) {
        setError("imageFile", {
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

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/research-papers`;
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
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            {initalData ? "Edit Research Paper" : "Create New Research Paper"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Title*"
                errors={errors.title}
                placeholder="e.g. Urban Policy Review 2024"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Publication Date*"
                placeholder="yyyy/mm/dd"
                errors={errors.date}
                register={register}
                registerer="date"
              />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePicker
                label="Cover Image* (Max-limit - 3MB)"
                errors={errors.imageFile}
                register={register}
                registerer="imageFile"
                watcher={watch("imageFile")}
                accept=".png, .jpg, .jpeg, .webp"
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
              text={initalData ? "Update Paper" : "Create Paper"}
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
