"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ConfirmationPopup from "../../components/confirmationPopup";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { getData } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

// --- Schema ---
const sectorSchema = z.object({
  sector: generalSchema("Sector name is required"),
  active: z.boolean(),
  imageFile: fileSchema,
});

type SectorFormValues = z.infer<typeof sectorSchema>;

interface SectorItem {
  id: string;
  sector: string;
  image: string;
  active: boolean;
  date: string;
}

interface Pagination {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ListResponse {
  sectors: SectorItem[];
  pagination: Pagination;
}

export default function Sectors() {
  const { data: session } = useSession();
  const [items, setItems] = useState<SectorItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filters
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [activeOnly, setActiveOnly] = useState<string>("all");

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SectorItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSectors = useCallback(
    async (targetPage = page) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
        });
        if (activeOnly !== "all") query.append("activeOnly", activeOnly);

        const res = (await getData(
          `/about-us/sectors?${query.toString()}`,
          session,
        )) as ListResponse;

        setItems(res?.sectors || []);
        setPagination(res?.pagination || null);
        setPage(targetPage);
      } catch (error) {
        console.error("Error fetching sectors:", error);
        toast.error("Failed to load sectors");
      } finally {
        setIsLoading(false);
      }
    },
    [session, limit, activeOnly, page],
  );

  useEffect(() => {
    fetchSectors(1);
  }, [activeOnly]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/about-us/sectors/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Sector deleted successfully");
      setDeletingId(null);
      fetchSectors(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete sector");
    }
  };

  const handleToggle = async (item: SectorItem) => {
    try {
      const formData = new FormData();
      formData.append("active", !item.active as any);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/about-us/sectors/${item.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      toast.success("Status updated");
      fetchSectors(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <section className="blade-top-margin">
        <SectionHeading
          heading="Sectors"
          ctaText="Add New Sector"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Select value={activeOnly} onValueChange={setActiveOnly}>
            <SelectTrigger className="w-40 h-11 border-gray bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Active Only</SelectItem>
              <SelectItem value="false">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading sectors...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No sectors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
                    alt={item.sector}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-base font-bold text-gray-900 mb-4 line-clamp-1">
                    {item.sector || "Unnamed Sector"}
                  </h4>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={item.active}
                        onChange={() => handleToggle(item)}
                      />
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        {item.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        theme="transparentGray"
                        size="small"
                        text="Delete"
                        onClick={() => setDeletingId(item.id)}
                      />
                      <Button
                        theme="pink"
                        size="small"
                        text="Edit"
                        onClick={() => {
                          setEditingItem(item);
                          setIsFormOpen(true);
                        }}
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
          <div className="flex items-center justify-center gap-4 py-10 mt-6 border-t border-gray-100">
            <Button
              text="Previous"
              theme="transparentGray"
              size="small"
              isDisabled={page <= 1}
              onClick={() => fetchSectors(page - 1)}
            />
            <div className="flex gap-2 items-center">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchSectors(p)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-pink text-white"
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
              onClick={() => fetchSectors(page + 1)}
            />
          </div>
        )}
      </section>

      {/* Modals */}
      {isFormOpen && (
        <SectorForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            fetchSectors(page);
            setIsFormOpen(false);
            setEditingItem(null);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => handleDelete(deletingId)}
        />
      )}
    </>
  );
}

// --- Form Component ---

function SectorForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: SectorItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SectorFormValues>({
    resolver: zodResolver(sectorSchema),
    defaultValues: initialData
      ? {
          sector: initialData.sector,
          active: initialData.active,
          imageFile: initialData.image,
        }
      : {
          active: true,
        },
  });

  const onSubmit: SubmitHandler<SectorFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("sector", data.sector);
      formData.append("active", data.active as any);

      // Handle Image
      const imageVal = data.imageFile as any;
      if (imageVal instanceof FileList && imageVal.length > 0) {
        formData.append("imageFile", imageVal[0]);
      } else if (!initialData) {
        setError("imageFile", { type: "manual", message: "Image is required" });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/about-us/sectors`;
      let method: "post" | "patch" = "post";

      if (initialData) {
        url = `${url}/${initialData.id}`;
        method = "patch";
      }

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      toast.success(initialData ? "Sector updated" : "Sector created");
      onSuccess();
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[32rem] relative bg-white rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Sector" : "Create New Sector"}
          </h3>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          className="overflow-y-auto flex-1 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-5">
            <TextInput
              label="Sector Name*"
              errors={errors.sector}
              placeholder="e.g. Energy, Water, Transport"
              register={register}
              registerer="sector"
            />

            <ImagePicker
              label="Sector Image* (Max-limit - 3MB)"
              errors={errors.imageFile}
              register={register}
              registerer="imageFile"
              watcher={watch("imageFile")}
              accept=".png, .jpg, .jpeg, .webp"
            />

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

          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              theme="transparentGray"
              size="large"
              className="flex-1"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              type="submit"
              theme="pink"
              size="large"
              className="flex-1"
              text={initialData ? "Update Sector" : "Create Sector"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
