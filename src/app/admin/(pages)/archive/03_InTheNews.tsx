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
import { generalSchema, fileSchema } from "../../lib/zod";
import { toast } from "react-toastify";

import { cn } from "@/lib/utils";
import PdfPicker from "../../components/input/pdfPicker";

interface MediaItem {
  id: string;
  image: string;
  category: string;
  title?: string;
  date: string;
  description: string;
  link?: string;
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
  lastUpdated: string;
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
  const [limit] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>("desc");

  async function loadMedia(nextPage = page) {
    try {
      setIsLoadingList(true);
      const query = new URLSearchParams({
        page: String(nextPage),
        limit: String(limit),
        sortOrder,
        activeOnly: "true",
      });

      const res = (await getData(
        `/archives/media-coverage?${query.toString()}`,
        session
      )) as ListResponse;

      setFormState((s) => ({ ...s, items: res?.data ?? [] }));
      setPagination(res?.meta ?? null);
      setPage(nextPage);
    } catch (e) {
      toast.error("Failed to load media coverage");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadMedia(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function deleteMedia(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/media-coverage/${id}`,
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
        heading="Section 03 - (News & Media Coverage)"
        ctaText="Add new coverage"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {formState.items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No media coverage found.
          </div>
        )}
        {formState.items.map((it) => (
          <article
            key={it.id}
            className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-[12rem] rounded-md border border-gray">
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
                  alt={it.title}
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
              <div className="flex-1 mt-4">
                <div className="flex justify-between">

                <p className=" text-darkgray/70 flex items-center gap-2"><span className="w-2 h-2 shrink-0 bg-pink rounded-full block"/>{it.category}</p>
                <span className="block text-darkgray text-sm">{it.date}</span>
                </div>
                <h6 className="text-base font-medium mt-2">{it.title}</h6>
                <p className="text-sm text-darkgray/80 mt-1">
                  {it.description}
                </p>
                
                {it.link && (
                  <a
                    href={it.link}
                    target="_blank"
                    className="underline text-pink mt-2 inline-block"
                  >
                    View Article
                  </a>
                )}
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

      {formState.isFormOpen && (
        <MediaForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadMedia(page);
          }}
        />
      )}

      {/* Confirm Delete */}
      {confirmOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 flex justify-center items-center">
          <div className="w-[24rem] bg-white rounded-md shadow-2xl p-6">
            <h6 className="text-base font-medium">Confirm deletion</h6>
            <p className="text-sm text-darkgray/80 mt-2">
              Are you sure you want to delete this media coverage?
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
                onClick={() => deletingId && deleteMedia(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ================== FORM ==================
const mediaSchema = z
  .object({
    category: generalSchema("Category is required"),
    title: generalSchema("Title is required"),
    date: generalSchema("Date is required"),
    description: generalSchema("Description is required"),
    link: z.string().optional(),
    coverImageFile: fileSchema,
    additionalImage: fileSchema.optional(),
    pdfFile: fileSchema.optional(),
  })
  .refine(
    (data) =>
      (data.link && !data.additionalImage) ||
      (!data.link && data.additionalImage),
    {
      message: "Provide either a link OR a image file, not both",
      path: ["link"],
    }
  );


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

const defaultValues: Partial<MediaFormValues> = useMemo(() => {
  if (!initalData) {
    return {
      category: "News",
      title: "",
      date: "",
      description: "",
      link: "",
      coverImageFile: undefined,
      additionalImage: undefined,
      pdfFile: undefined,
    };
  }
  return {
    category: initalData.category,
    title: initalData.title,
    date: initalData.date,
    description: initalData.description,
    link: initalData.link,
    coverImageFile: initalData.image,
    additionalImage: undefined,
    pdfFile: undefined,
  };
}, [initalData]);


  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: defaultValues as MediaFormValues,
  });

  const watchLink = watch("link");
  const watchFile = watch("coverImageFile"); 

async function uploadFile(file: File, type: "image" | "pdf", sessionToken?: string) {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = type === "image" ? "/uploads/image" : "/uploads/pdf";
  const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}${endpoint}`, formData, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return process.env.NEXT_PUBLIC_HOST_URL+res.data.url; // The uploaded file URL
}

const submitHandler: SubmitHandler<MediaFormValues> = async (data) => {
  try {
    setIsLoading(true);

    // If additionalImage or pdfFile exists, upload first
    let generatedLink = data.link || "";
    if (data.additionalImage instanceof FileList && data.additionalImage.length > 0) {
      generatedLink = await uploadFile(data.additionalImage[0], "image", session?.accessToken);
    } else if (data.pdfFile instanceof FileList && data.pdfFile.length > 0) {
      generatedLink = await uploadFile(data.pdfFile[0], "pdf", session?.accessToken);
    }

    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title ?? "");
    formData.append("date", data.date);
    formData.append("description", data.description);
    formData.append("active", "true");

    formData.append("link", generatedLink);

    // Always require coverImageFile
    if (data.coverImageFile instanceof FileList && data.coverImageFile.length > 0) {
      formData.append("coverImageFile", data.coverImageFile[0]);
    } else if (typeof data.coverImageFile === "string" && data.coverImageFile.trim()) {
      formData.append("coverImageUrl", data.coverImageFile);
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
    <div className="fixed inset-0 w-screen h-screen bg-black/60 flex justify-center items-center">
      <div className="w-[32rem] bg-white rounded-md shadow-2xl max-h-[85vh] overflow-auto">
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
          <div className="flex flex-col gap-y-6 p-8 pt-1">
            <TextInput
              label="Category"
              errors={errors.category}
              placeholder="News"
              register={register}
              registerer="category"
            />
            <TextInput
              label="Title"
              errors={errors.title}
              placeholder="Enter title"
              register={register}
              registerer="title"
            />
            <TextInput
              label="Date"
              errors={errors.date}
              placeholder="2023/07/15"
              register={register}
              registerer="date"
            />
            <TextInput
              label="Description"
              errors={errors.description}
              placeholder="Enter description"
              register={register}
              registerer="description"
            />

            {/* Mutually exclusive inputs */}
            <ImagePicker
              label="Cover Image"
              errors={errors.coverImageFile}
              register={register}
              registerer="coverImageFile"
              watcher={watch("coverImageFile")}
              accept=".png,.jpg,.jpeg,.webp"
              tooltip="Image is required"
            />
            <ImagePicker
              label="Image file (optional)"
              errors={errors.additionalImage}
              register={register}
              registerer="additionalImage"
              watcher={watch("additionalImage")}
              accept=".png,.jpg,.jpeg,.webp"
              tooltip="Will generate a link automatically"
            />

            <PdfPicker
              label="PDF Upload (optional)"
              errors={errors.pdfFile}
              register={register}
              registerer="pdfFile"
              watcher={watch("pdfFile")}
              accept=".pdf"
              tooltip="Will generate a link automatically"
            />

            <TextInput
              label="Link (optional)"
              errors={errors.link}
              placeholder="https://example.com"
              register={register}
              registerer="link"
              tooltip="Provide either a link OR upload a file"
            />

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
        </form>
      </div>
    </div>
  );
}
