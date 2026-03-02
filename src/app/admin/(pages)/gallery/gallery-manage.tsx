"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import {
  X,
  Edit2,
  Trash2,
  Filter,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import ImagePicker from "../../components/input/imagePicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ConfirmationPopup from "../../components/confirmationPopup";
import { getData } from "../../lib/utils";
import * as z from "zod";

// --- Types ---

interface GalleryItem {
  id: string;
  imageUrl: string;
  description: string;
  year: string;
  event: string;
  date: string;
  activeOnMain: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FilterOptions {
  years: string[];
  events: string[];
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const gallerySchema = z.object({
  description: z.string().min(1, "Description is required"),
  event: z.string().min(1, "Event is required"),
  date: z.string().min(1, "Date is required"),
  activeOnMain: z.boolean(),
  archived: z.boolean(),
  file: z.any().optional(),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

// --- Components ---

export default function GalleryManage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    years: [],
    events: [],
  });

  // States for filters
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");

  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (yearFilter !== "all") params.append("year", yearFilter);
      if (eventFilter !== "all") params.append("event", eventFilter);

      if (visibilityFilter === "main") {
        params.append("activeOnMain", "true");
      } else if (visibilityFilter === "archived") {
        params.append("archived", "true");
      } else if (visibilityFilter === "both") {
        params.append("activeOnMain", "true");
        params.append("archived", "true");
      }

      const res = await getData(`/gallery?${params.toString()}`, session);
      setItems(res.data || []);
      setMeta(res.meta || null);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to fetch gallery items");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, yearFilter, eventFilter, visibilityFilter, session]);

  const fetchFilters = useCallback(async () => {
    try {
      const res = await getData("/gallery/filters", session);
      setFilterOptions({
        years: res.years || [],
        events: res.events || [],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  }, [session]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/gallery/${deletingId}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Item deleted successfully");
      fetchGallery();
      fetchFilters();
      setDeletingId(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete item");
    }
  };

  const handleToggleArchive = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/gallery/${id}/toggle-archive`,
        null,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Archived status toggled");
      fetchGallery();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to toggle archived status",
      );
    }
  };

  const handleToggleMain = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/gallery/${id}/toggle-main`,
        null,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Main display status toggled");
      fetchGallery();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to toggle main display status",
      );
    }
  };

  const openAddForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  return (
    <div className="p-0">
      <SectionHeading
        heading="Gallery Management"
        description="Manage your gallery images, events, and display settings."
        cta={true}
        ctaText="Add New Image"
        handleClick={openAddForm}
      />

      {/* Filters Section */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-gray shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-darkgray" />
            <span className="text-sm font-medium text-darkgray">Filters:</span>
          </div>

          {/* Year Filter */}
          <div className="w-40">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="bg-white border-gray shadow-none">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Years</SelectItem>
                {filterOptions.years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Filter */}
          <div className="w-48">
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="bg-white border-gray shadow-none">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Events</SelectItem>
                {filterOptions.events.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Visibility Dropdown Filter */}
          <div className="w-56">
            <Select
              value={visibilityFilter}
              onValueChange={setVisibilityFilter}
            >
              <SelectTrigger className="bg-white border-gray shadow-none font-medium">
                <SelectValue placeholder="All Display Locations" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Display Locations</SelectItem>
                <SelectItem value="main">On Main Page</SelectItem>
                <SelectItem value="archived">In Archive</SelectItem>
                <SelectItem value="both">On Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Guide Text */}
          <div className="ml-auto flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-pink"></div>
              <span className="text-[10px] text-darkgray/70 uppercase tracking-wider font-bold">
                Main Page
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <span className="text-[10px] text-darkgray/70 uppercase tracking-wider font-bold">
                Archive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="mt-10 flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 text-center py-20 border-2 border-dashed border-gray rounded-xl bg-white">
          <ImageIcon className="mx-auto text-gray mb-4" size={48} />
          <p className="text-darkgray font-medium">
            No gallery items found matching your filters.
          </p>
          <Button
            theme="pink"
            text="Reset Filters"
            size="small"
            className="mt-4"
            onClick={() => {
              setYearFilter("all");
              setEventFilter("all");
              setVisibilityFilter("all");
            }}
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.imageUrl}`}
                  alt={item.description}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {item.activeOnMain && (
                    <span className="bg-pink text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                      MAIN PAGE
                    </span>
                  )}
                  {item.archived && (
                    <span className="bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                      IN ARCHIVE
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-pink bg-pink/10 px-2 py-0.5 rounded uppercase">
                    {item.event}
                  </span>
                  <span className="text-xs text-darkgray/60 font-medium ml-auto">
                    {item.year}
                  </span>
                </div>
                <p className="text-sm text-darkgray line-clamp-2 min-h-[2.5rem] mb-4">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-darkgray/50 border-t border-gray/50 pt-3">
                  <Calendar size={12} />
                  <span>{new Date(item.date).toLocaleDateString("en-GB")}</span>
                </div>
              </div>

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="w-10 h-10 rounded-full cursor-pointer bg-white text-darkgray flex items-center justify-center hover:bg-pink hover:text-white transition-colors"
                    title="Edit Item"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="w-10 h-10 rounded-full cursor-pointer bg-white text-darkgray flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    title="Choose “Yes” if this section has its own dedicated page (such as Infrapandit or Infrakatha), and you want the archived image to appear there as well. 

Choose “No” if this section exists only as a tab inside the Archive page (such as CAIRA) and does not have a separate dedicated page.
  
                    "
                    onClick={() => handleToggleMain(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      item.activeOnMain
                        ? "bg-pink text-white"
                        : "bg-white text-darkgray hover:bg-pink hover:text-white"
                    }`}
                  >
                    {item.activeOnMain ? "Remove from Main" : "Add to Main"}
                  </button>
                  <button
                    onClick={() => handleToggleArchive(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      item.archived
                        ? "bg-slate-700 text-white"
                        : "bg-white text-darkgray hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {item.archived ? "Restore from Archive" : "Move to Archive"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            text="Previous"
            theme="transparentGray"
            size="small"
            isDisabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          <span className="text-sm font-medium text-darkgray">
            Page {page} of {meta.totalPages}
          </span>
          <Button
            text="Next"
            theme="transparentGray"
            size="small"
            isDisabled={page === meta.totalPages}
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <GalleryForm
          initialData={editingItem}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            fetchGallery();
            fetchFilters();
          }}
          eventOptions={filterOptions.events}
        />
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={handleDelete}
          title="Delete Gallery Image"
          message="Are you sure you want to delete this image? This action cannot be undone."
        />
      )}
    </div>
  );
}

// --- Form Component ---

function GalleryForm({
  initialData,
  onClose,
  onSuccess,
  eventOptions,
}: {
  initialData: GalleryItem | null;
  onClose: () => void;
  onSuccess: () => void;
  eventOptions: string[];
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewEventField, setShowNewEventField] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: initialData
      ? {
          description: initialData.description,
          event: initialData.event,
          date: initialData.date.split("T")[0],
          activeOnMain: initialData.activeOnMain,
          archived: initialData.archived,
        }
      : {
          activeOnMain: true,
          archived: false,
          date: new Date().toISOString().split("T")[0],
        },
  });

  const selectedEvent = watch("event");

  const submitHandler = async (data: GalleryFormValues) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("event", data.event);
      formData.append("date", data.date);
      formData.append("activeOnMain", String(data.activeOnMain));
      formData.append("archived", String(data.archived));

      const fileVal = data.file as any;
      if (fileVal instanceof FileList && fileVal.length > 0) {
        formData.append("file", fileVal[0]);
      } else if (!initialData) {
        setError("file", { type: "manual", message: "Image is required" });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/gallery`;
      let method: "post" | "patch" = "post";

      if (initialData) {
        url = `${url}/${initialData.id}`;
        method = "patch";
      }

      await axios({
        url,
        method,
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        initialData ? "Updated successfully" : "Created successfully",
      );
      onSuccess();
    } catch (error: any) {
      console.error("Form submit error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray flex justify-between items-center z-10">
          <div>
            <h3 className="text-xl font-bold text-darkgray">
              {initialData ? "Edit Gallery Item" : "Add New Gallery Image"}
            </h3>
            <p className="text-sm text-darkgray/60">
              Fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <ImagePicker
                label="Gallery Image (Max-limit - 3MB)"
                register={register}
                registerer="file"
                errors={errors.file}
                watcher={watch("file")}
                accept="image/*"
              />
            </div>

            <div className="md:col-span-2">
              <div className="font-medium pb-1.5">Description</div>
              <textarea
                {...register("description")}
                placeholder="Enter a brief description of the image..."
                className={`w-full p-3 border rounded-lg min-h-[100px] outline-none transition-colors focus:border-pink ${
                  errors.description ? "border-red-500" : "border-gray"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            <TextInput
              label="Date"
              placeholder="YYYY-MM-DD"
              register={register}
              registerer="date"
              errors={errors.date}
            />

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-medium">Event</label>
                <button
                  type="button"
                  onClick={() => setShowNewEventField(!showNewEventField)}
                  className="text-xs text-pink font-semibold flex items-center gap-1 hover:underline"
                >
                  {showNewEventField ? "Select Existing" : "+ Create New Event"}
                </button>
              </div>

              {showNewEventField ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter new event name"
                      className={`w-full p-3 h-[50px] border rounded-lg outline-none focus:border-pink ${
                        errors.event ? "border-red-500" : "border-gray"
                      }`}
                      autoFocus
                      onBlur={(e) => {
                        if (e.target.value) setValue("event", e.target.value);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <Select
                  value={selectedEvent}
                  onValueChange={(val) =>
                    setValue("event", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`w-full h-[50px] bg-white ${
                      errors.event ? "border-red-500" : "border-gray"
                    }`}
                  >
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {eventOptions.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.event && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.event.message as string}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-gray/5 rounded-xl border border-gray/50">
              <div>
                <p className="text-sm font-semibold">Display on Main Page</p>
                <p className="text-[10px] text-darkgray/50">
                  Visible in the homepage gallery section
                </p>
              </div>
              <ToggleSwitch
                checked={watch("activeOnMain")}
                onChange={(val) => setValue("activeOnMain", val)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray/5 rounded-xl border border-gray/50">
              <div>
                <p className="text-sm font-semibold">Display in Archive</p>
                <p className="text-[10px] text-darkgray/50">
                  Visible in the dedicated archive section
                </p>
              </div>
              <ToggleSwitch
                checked={watch("archived")}
                onChange={(val) => setValue("archived", val)}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button
              text="Cancel"
              type="button"
              theme="transparentGray"
              className="flex-1"
              size="large"
              onClick={onClose}
            />
            <Button
              text={initialData ? "Update Item" : "Add to Gallery"}
              type="submit"
              theme="pink"
              className="flex-1"
              size="large"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
