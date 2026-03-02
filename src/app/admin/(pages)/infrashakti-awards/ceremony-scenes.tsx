"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import MessageInput from "../../components/input/textareaInput";
import { X, Play } from "lucide-react";
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
import Link from "next/link";

// --- Schema ---
const ceremonySceneSchema = z.object({
  title: generalSchema("Title is required"),
  name: generalSchema("Name is required"),
  description: generalSchema("Description is required"),
  youtubeVideoUrl: generalSchema("YouTube URL is required"),
  active: z.boolean(),
  thumbnailFile: fileSchema,
});

type CeremonySceneFormValues = z.infer<typeof ceremonySceneSchema>;

interface CeremonySceneItem {
  id: string;
  title: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  youtubeVideoUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ListResponse {
  data: CeremonySceneItem[];
  meta?: Pagination;
}

export default function CeremonyScenes() {
  const { data: session } = useSession();
  const [items, setItems] = useState<CeremonySceneItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filters
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [active, setActive] = useState<string>("all");

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CeremonySceneItem | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchScenes = useCallback(
    async (targetPage = page) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
        });
        if (active !== "all") query.append("active", active);

        const res = (await getData(
          `/infrashakti/ceremony-scenes?${query.toString()}`,
          session,
        )) as ListResponse;

        setItems(res?.data || []);
        setPagination(res?.meta || null);
        setPage(targetPage);
      } catch (error) {
        console.error("Error fetching ceremony scenes:", error);
        toast.error("Failed to load ceremony scenes");
      } finally {
        setIsLoading(false);
      }
    },
    [session, limit, active, page],
  );

  useEffect(() => {
    fetchScenes(1);
  }, [active]);

  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/ceremony-scenes/${id}/toggle-status`,
        null,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Status updated");
      fetchScenes(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/ceremony-scenes/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      toast.success("Scene deleted successfully");
      setDeletingId(null);
      fetchScenes(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete scene");
    }
  };

  return (
    <>
      <section className="blade-top-margin">
        <SectionHeading
          heading="Ceremony Scenes"
          ctaText="Add New Scene"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Select value={active} onValueChange={setActive}>
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
            <p className="mt-2 text-gray-500">Loading scenes...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No ceremony scenes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6 mt-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.thumbnailUrl}`}
                    alt={item.title}
                  />
                  <div className="absolute  inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
                      <Link href={item.youtubeVideoUrl} target="_blank">
                        <Play className="w-5 h-5 cursor-pointer text-pink fill-pink" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-2">
                    <div className="text-base font-bold text-pink ">
                      {item.title}
                    </div>
                    <h4 className="text-sm font-medium text-pink/80 mb-1">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={item.active}
                        onChange={() => handleToggle(item.id)}
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

        {/* Pagination - only if meta provides it */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-10 mt-6 border-t border-gray-100">
            <Button
              text="Previous"
              theme="transparentGray"
              size="small"
              isDisabled={page <= 1}
              onClick={() => fetchScenes(page - 1)}
            />
            <div className="flex gap-2 items-center">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchScenes(p)}
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
              onClick={() => fetchScenes(page + 1)}
            />
          </div>
        )}
      </section>

      {/* Modals */}
      {isFormOpen && (
        <CeremonySceneForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            fetchScenes(page);
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

function CeremonySceneForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: CeremonySceneItem | null;
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
  } = useForm<CeremonySceneFormValues>({
    resolver: zodResolver(ceremonySceneSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          name: initialData.name,
          description: initialData.description,
          youtubeVideoUrl: initialData.youtubeVideoUrl,
          active: initialData.active,
          thumbnailFile: initialData.thumbnailUrl,
        }
      : {
          active: true,
        },
  });

  const onSubmit: SubmitHandler<CeremonySceneFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("youtubeVideoUrl", data.youtubeVideoUrl);
      formData.append("active", data.active as any);

      // Handle Thumbnail
      const thumbVal = data.thumbnailFile as any;
      if (thumbVal instanceof FileList && thumbVal.length > 0) {
        formData.append("thumbnailFile", thumbVal[0]);
      } else if (!initialData) {
        setError("thumbnailFile", {
          type: "manual",
          message: "Thumbnail is required",
        });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/infrashakti/ceremony-scenes`;
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

      toast.success(initialData ? "Scene updated" : "Scene created");
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
      <div className="w-[36rem] relative bg-white rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Scene" : "Create New Scene"}
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
              label="Title*"
              errors={errors.title}
              placeholder="e.g. Juror talk"
              register={register}
              registerer="title"
            />
            <TextInput
              label="Name*"
              errors={errors.name}
              placeholder="e.g. Mr Pranav Adani"
              register={register}
              registerer="name"
            />

            <MessageInput
              label="Description*"
              errors={errors.description}
              placeholder="Enter occupation/description"
              register={register}
              registerer="description"
            />

            <TextInput
              label="YouTube Video URL*"
              errors={errors.youtubeVideoUrl}
              placeholder="https://youtube.com/watch?v=..."
              register={register}
              registerer="youtubeVideoUrl"
            />

            <ImagePicker
              label="Thumbnail Image* (Max-limit - 3MB)"
              errors={errors.thumbnailFile}
              register={register}
              registerer="thumbnailFile"
              watcher={watch("thumbnailFile")}
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
              text={initialData ? "Update Scene" : "Create Scene"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
