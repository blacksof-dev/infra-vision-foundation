
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
import { fileSchema, generalSchema } from "../../lib/zod";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

type Tab = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

interface GalleryItem {
  id: string;
  image: string;
  event: string;
  year: number;
  description: string;
  tabId: string;
  active: boolean;
  tab?: { id: string; name: string; slug: string };
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ListResponse {
  data: GalleryItem[];
  meta: Pagination;
}

interface FormStateType {
  isFormOpen: boolean;
  editItem: GalleryItem | null;
  items: GalleryItem[];
}

// ============ MAIN LIST COMPONENT ============
export default function GallerySection() {
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

  // filters
  const [year, setYear] = useState<string>("");
  const [tabId, setTabId] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("year");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [tabs, setTabs] = useState<Tab[]>([]);

  async function loadGallery(nextPage = page) {
    try {
      setIsLoadingList(true);
      const query = new URLSearchParams({
        page: nextPage.toString(),
        limit: limit.toString(),
        ...(year ? { year } : {}),
        ...(tabId ? { tabId } : {}),
        sortBy,
        sortOrder,
      }).toString();

      const res = (await getData(
        `/archives/gallery?${query}`,
        session
      )) as ListResponse;

      setFormState((s) => ({ ...s, items: res?.data ?? [] }));
      setPagination(res?.meta ?? null);
      setPage(nextPage);
    } catch (e) {
      toast.error("Failed to load gallery");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadGallery(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, tabId, sortBy, sortOrder]);

  useEffect(() => {
    async function fetchTabs() {
      try {
        const data = (await getData("/archives/tabs", session)) as Tab[];
        setTabs(data.filter((t) => t.active));
      } catch {}
    }
    fetchTabs();
  }, [session]);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function deleteGallery(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/${id}`,
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
        heading="Gallery Section"
        ctaText="Add new gallery item"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      {/* Filters */}
      <div className="flex gap-4 mt-6 flex-wrap">
        {/* <TextInput
          label="Year"
          placeholder="2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        /> */}

        <div>
          <div className="font-medium pb-1.5">Tab</div>
          <Select value={tabId} onValueChange={(val) => setTabId(val)}>
            <SelectTrigger>
              <SelectValue placeholder="All Tabs" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {tabs.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="font-medium pb-1.5">Sort By</div>
          <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="font-medium pb-1.5">Sort Order</div>
          <Select value={sortOrder} onValueChange={(val) => setSortOrder(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {formState.items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No gallery items found.
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
                alt={it.event}
                className="w-full object-cover rounded-md border border-lightgray/40"
              />
              <div className="    flex justify-between mt-4">
                  <span className=" flex items-center gap-2"><span className="block w-2 h-2 shrink-0 bg-pink rounded-full"></span>{it.tab?.name}</span>  
                  <span className="block text-darkgray">
                 {it.year}
                  </span>
                </div>
              <div className="flex-1 mt-3">
                {/* <h6 className="text-base font-medium leading-snug">
                  {it.event}
                </h6> */}
                <p className="">
                  {it.description}
                </p> 
                
                {/* <div className="text-xs text-darkgray/70 mt-3 flex items-center gap-2 flex-wrap">
                  <span>{it.year}</span>
                  <span className="mx-1">•</span>
                  <span>{it.tab?.name}</span>
                </div> */}
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
            onClick={() => loadGallery(Math.max(1, page - 1))}
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
              loadGallery(Math.min(pagination.totalPages, page + 1))
            }
          />
        </div>
      )}

      {formState.isFormOpen && (
        <GalleryForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadGallery(page);
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
              gallery item?
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
                onClick={() => deletingId && deleteGallery(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============ FORM COMPONENT ============
const gallerySchema = z.object({
  // event: generalSchema("Event is required"),
  year: generalSchema("Year is required"),
  description: generalSchema("Description is required"),
  tabId: generalSchema("Tab is required"),
  file: fileSchema,
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

function GalleryForm({
  initalData,
  onClose,
}: {
  initalData: GalleryItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    async function fetchTabs() {
      try {
        const data = (await getData("/archives/tabs", session)) as Tab[];
        setTabs(data.filter((s) => s.active));
      } catch {}
    }
    fetchTabs();
  }, [session]);

  const defaultValues: Partial<GalleryFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        event: "",
        year: "",
        description: "",
        tabId: "",
        file: undefined,
      };
    }
    return {
      event: initalData.event,
      year: String(initalData.year),
      description: initalData.description,
      tabId: initalData.tabId,
      file: initalData.image,
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: defaultValues as GalleryFormValues,
  });

  const submitHandler: SubmitHandler<GalleryFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("event", "");
      formData.append("year", data.year);
      formData.append("description", data.description);
      formData.append("tabId", data.tabId);
      formData.append("active", "true");

      const fileVal = data.file as unknown;
      if (typeof fileVal === "string" && fileVal.trim()) {
        formData.append("imageUrl", fileVal);
      } else if (fileVal instanceof FileList && fileVal.length > 0) {
        formData.append("file", fileVal[0] as File);
      } else {
        setError("file", { type: "manual", message: "Image is required" });
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/archives/gallery`;
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
              {/* <TextInput
                label="Event"
                errors={errors.event}
                placeholder="Enter event name"
                register={register}
                registerer="event"
              /> */}
              <TextInput
                label="Year"
                errors={errors.year}
                placeholder="2023"
                register={register}
                registerer="year"
              />
              <TextInput
                label="Description"
                errors={errors.description}
                placeholder="Enter description"
                register={register}
                registerer="description"
              />

              <div>
                <div className="font-medium pb-1.5">Tab</div>
                <Select
                  value={watch("tabId") || ""}
                  onValueChange={(val) =>
                    setValue("tabId", val ?? "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {tabs.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <input type="hidden" {...register("tabId")} /> */}
                {errors.tabId && (
                  <p className="text-red-500 text-[15px] pt-1">
                    {errors.tabId.message as any}
                  </p>
                )}
              </div>

              <ImagePicker
                label="Image"
                errors={errors.file}
                register={register}
                registerer="file"
                watcher={watch("file")}
                accept=".png,.jpg,.jpeg,.webp"
                tooltip="Max 2MB. Recommended 1200x628"
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
