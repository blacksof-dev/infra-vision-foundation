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
  description: string;
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

// sectors will be fetched dynamically in the form

export default function KnowledgeResearchPapers() {
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

  async function loadPapers(nextPage = page) {
    try {
      setIsLoadingList(true);
      const res = (await getData(
        `/knowledge/research-papers?page=${nextPage}&limit=${limit}`,
        session
      )) as ListResponse;
      setFormState((s) => ({ ...s, items: res?.researchPapers ?? [] }));
      setPagination(res?.pagination ?? null);
      setPage(nextPage);
    } catch (e) {
      toast.error("Failed to load research papers");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadPapers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function deletePaper(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/research-papers/${id}`,
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
        heading="Section - 02 (Research Papers)"
        ctaText="Add new research papers"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {formState.items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No research papers found.
          </div>
        )}
        {formState.items.map((it) => (
          <article
            key={it.id}
            className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md transition-shadow gap-4 flex flex-col justify-between"
          > 
          <div>

            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
              alt={it.title}
              className="w-full object-cover rounded-md border border-lightgray/40"
            />
            <div className="flex-1 mt-3">
              <h6 className="text-base font-medium leading-snug">{it.title}</h6>
              <p className="text-sm text-darkgray/80 line-clamp-2 ">
                {it.description}
              </p>
              <div className="text-xs text-darkgray/70 mt-3 flex items-center gap-2 flex-wrap">
                <span className="whitespace-nowrap">
                  {new Date(it.date).toLocaleDateString()}
                </span>
                <span className="mx-1">•</span>
                <span className="truncate">
                  {(it.sectors && it.sectors.length > 0
                    ? it.sectors.map((s) => s.name)
                    : it.sectorIds
                  ).join(", ")}
                </span>
              </div>
              <div className="mt-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}${it.link}`}
                  target="_blank"
                  className="underline text-base"
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
            onClick={() => loadPapers(Math.max(1, page - 1))}
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
              loadPapers(Math.min(pagination.totalPages, page + 1))
            }
          />
        </div>
      )}

      {formState.isFormOpen && (
        <ResearchPaperForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadPapers(page);
          }}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
          <div className="w-[24rem] relative blade-top-padding-s bg-white rounded-md shadow-2xl h-auto max-h-[70vh] overflow-auto overflow-x-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-base font-medium">Confirm deletion</h6>
              <button
                type="button"
                aria-label="close modal"
                className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
                onClick={() => setConfirmOpen(false)}
              >
                <X />
              </button>
            </div>
            <p className="text-sm text-darkgray/80">
              This action cannot be undone. Are you sure you want to delete this
              research paper?
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
                onClick={() => deletingId && deletePaper(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const researchPaperSchema = z.object({
  title: generalSchema("Title is required"),
  description: generalSchema("Description is required"),
  date: generalSchema("Publication date is required"),
  imageFile: fileSchema,
  pdfFile: fileSchema,
  sectorIds: z
    .array(z.string())
    .min(1, { message: "Select at least one sector" }),
});

type ResearchPaperFormValues = z.infer<typeof researchPaperSchema>;

function ResearchPaperForm({
  initalData,
  onClose,
}: {
  initalData: ResearchPaperItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sectors, setSectors] = useState<Sector[]>([]);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const data = (await getData(
          "/knowledge/sectors?activeOnly=true",
          session
        )) as Sector[];
        setSectors(data.filter((s) => s.active));
      } catch (e) {
        try {
          const data = (await getData(
            "/knowledge/sectors",
            session
          )) as Sector[];
          setSectors(data.filter((s) => s.active));
        } catch {}
      }
    }
    fetchSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues: Partial<ResearchPaperFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        title: "",
        description: "",
        date: "",
        imageFile: "",
        pdfFile: "",
        sectorIds: [],
      };
    }
    return {
      title: initalData.title,
      description: initalData.description,
      date: initalData.date?.slice(0, 10) || "",
      imageFile: initalData.image,
      pdfFile: initalData.link,
      sectorIds: initalData.sectorIds,
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    setValue,
  } = useForm<ResearchPaperFormValues>({
    resolver: zodResolver(researchPaperSchema),
    defaultValues: defaultValues as ResearchPaperFormValues,
  });

  const submitHandler: SubmitHandler<ResearchPaperFormValues> = async (
    data
  ) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("active", "true");
      data.sectorIds.forEach((s) => formData.append("sectorIds", s));

      const imgVal = data.imageFile as unknown;
      if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("imageUrl", imgVal);
      } else if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("imageFile", imgVal[0] as File);
      } else {
        setError("imageFile", {
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
          initalData ? "Updated successfully" : "Created successfully"
        );
        onClose(); // auto-close and parent will refresh
      } else {
        toast.error("Save failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  function onSelectSectorIds(e: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setValue("sectorIds", values, { shouldValidate: true, shouldDirty: true });
  }

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
                tooltip="Title is required"
              />
              <TextInput
                label="Description"
                errors={errors.description}
                placeholder="Enter description"
                register={register}
                registerer="description"
                tooltip="Description is required"
              />
              <TextInput
                label="Publication Date (YYYY-MM-DD)"
                errors={errors.date}
                placeholder="2025-01-31"
                register={register}
                registerer="date"
                tooltip="Format: YYYY-MM-DD"
              />

              {/* Active field removed: defaults to true */}

              <ImagePicker
                label="Cover Image"
                errors={errors.imageFile}
                register={register}
                registerer="imageFile"
                watcher={watch("imageFile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Max 2MB. Recommended 1200x628"
              />

              <PdfPicker
                label="PDF File"
                errors={errors.pdfFile}
                register={register}
                registerer="pdfFile"
                watcher={watch("pdfFile")}
                accept=".pdf"
                tooltip="PDF only"
              />

              <div>
                <div className="font-medium pb-1.5">Sectors</div>
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
