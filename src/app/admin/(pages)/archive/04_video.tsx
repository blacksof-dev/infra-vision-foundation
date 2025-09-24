"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { Button } from "../../components/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z, ZodString } from "zod";
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
import Link from "next/link";

// ============ TYPES ============
type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

interface VideoItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  date: string;
  active: boolean;
  categoryIds: string[];
  categories?: Category[];
}

interface ListResponse {
  videos: VideoItem[];
  totalCount: number;
}

// ============ MAIN LIST COMPONENT ============
export default function VideoSection() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [formState, setFormState] = useState<{
    isFormOpen: boolean;
    editItem: VideoItem | null;
  }>({ isFormOpen: false, editItem: null });

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function loadVideos() {
    try {
      const res = (await getData(
        `/archives/videos`,
        session
      )) as ListResponse;

      let all = res?.videos ?? [];
      if (categoryId) {
        all = all.filter((v) =>
          v.categoryIds.includes(categoryId)
        );
      }
      setVideos(all);
    } catch {
      toast.error("Failed to load videos");
    }
  }

  useEffect(() => {
    loadVideos();
  }, [categoryId]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = (await getData(
          "/archives/videos/categories",
          session
        )) as Category[];
        setCategories(data.filter((c) => c.active));
      } catch {}
    }
    fetchCategories();
  }, [session]);

  async function deleteVideo(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/archives/videos/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setVideos((prev) => prev.filter((v) => v.id !== id));
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
        heading="Video Section"
        ctaText="Add new video"
        cta
        handleClick={() =>
          setFormState({ isFormOpen: true, editItem: null })
        }
      />

      {/* Filters */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <div>
          <div className="font-medium pb-1.5">Category</div>
          <Select
            value={categoryId}
            onValueChange={(val) => setCategoryId(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {videos.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No videos found.
          </div>
        )}
        {videos.map((v) => (
          <article
            key={v.id}
            className="rounded-lg border border-lightgray/40 bg-white p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_HOST_URL}${v.image}`}
                alt={v.title}
                className="w-full object-cover rounded-md border border-lightgray/40"
              />
              <div className="flex justify-between mt-4">

               {v.subtitle && (
                   <p className="text-sm flex items-center gap-2"><span className="w-2 h-2 shrink-0 bg-pink rounded-full block"></span>{v.subtitle}</p>
                )}
                 <div className="text-sm text-darkgray/70  ">
                {new Date(v.date).toLocaleDateString()}
              </div>
                </div>
              <h6 className="text-base font-medium mt-4">{v.title}</h6> 

              {/* <p className="mt-2">{v.description}</p>   */}
              <Link
                href={v.link}
                target="_blank"
                className="text-pink text-sm underline mt-1 block"
              >
                Watch Video
              </Link>
             
            </div>

            <div className="flex justify-between gap-3 mt-8">
              <Button
                text="Delete"
                theme="transparentPink"
                size="base"
                onClick={() => {
                  setDeletingId(v.id);
                  setConfirmOpen(true);
                }}
              />
              <Button
                text="Edit"
                theme="pink"
                size="base"
                onClick={() =>
                  setFormState({ isFormOpen: true, editItem: v })
                }
              />
            </div>
          </article>
        ))}
      </div>

      {formState.isFormOpen && (
        <VideoForm
          initalData={formState.editItem}
          onClose={async () => {
            setFormState({ isFormOpen: false, editItem: null });
            await loadVideos();
          }}
          categories={categories}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
          <div className="w-[24rem] bg-white rounded-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-base font-medium">Confirm deletion</h6>
              <button
                type="button"
                aria-label="close modal"
                className="rounded-full ring-1 scale-75 hover:scale-90 transition-all"
                onClick={() => setConfirmOpen(false)}
              >
                <X />
              </button>
            </div>
            <p className="text-sm text-darkgray/80">
              This action cannot be undone. Are you sure you want to delete this video?
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
                onClick={() => deletingId && deleteVideo(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============ FORM COMPONENT ============
const videoSchema = z.object({
  title: generalSchema("Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  link: generalSchema("Video link is required"),
  date: generalSchema("Date is required"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
  file: fileSchema, // REQUIRED in POST
});

type VideoFormValues = z.infer<typeof videoSchema>;

function VideoForm({
  initalData,
  onClose,
  categories,
}: {
  initalData: VideoItem | null;
  onClose: () => void;
  categories: Category[];
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues: Partial<VideoFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        title: "",
        subtitle: "",
        description: "",
        link: "",
        date: "",
        categoryIds: [],
        file: undefined,
      };
    }
    return {
      title: initalData.title,
      subtitle: initalData.subtitle,
      description: initalData.description,
      link: initalData.link,
      date: initalData.date.split("T")[0],
      categoryIds: initalData.categoryIds,
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
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: defaultValues as VideoFormValues,
  });

  const submitHandler: SubmitHandler<VideoFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
    // if (data.subtitle) formData.append("subtitle", data.subtitle);
    // Add category name (first selected category)
    if (data.categoryIds) {
      const selectedCategory = categories.find(c => c.id === data.categoryIds[0]); 
      console.log(selectedCategory)
      if (selectedCategory?.name) {
        formData.append("subtitle", selectedCategory.name);
      }
    }
      formData.append("description", '');
      formData.append("link", data.link);
      formData.append("date", data.date);
      formData.append("categoryIds", JSON.stringify(data.categoryIds));
      formData.append("active", "true");

      const fileVal = data.file as unknown;
      if (typeof fileVal === "string" && fileVal.trim()) {
        formData.append("imageUrl", fileVal);
      } else if (fileVal instanceof FileList && fileVal.length > 0) {
        formData.append("image", fileVal[0] as File);
      } else if (!initalData) {
        setError("file", { type: "manual", message: "Image is required" });
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/archives/videos`;
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
      <div className="w-[32rem] bg-white rounded-md shadow-2xl max-h-[85vh] overflow-auto">
        <form className="h-full " onSubmit={handleSubmit(submitHandler)}>
          <div className="flex justify-end sticky top-2 px-2 z-[999]">
            <button
              type="button"
              aria-label="close modal"
              className="rounded-full ring-1 scale-75 hover:scale-90 transition-all"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-y-6  p-6">
            <TextInput
              label="Title"
              errors={errors.title}
              placeholder="Enter video title"
              register={register}
              registerer="title"
              tooltip="Title is required"
            />
            {/* <TextInput
              label="Subtitle"
              errors={errors.subtitle}
              placeholder="Optional"
              register={register}
              registerer="subtitle"
            /> */}
            {/* <TextInput
              label="Description"
              errors={errors.description}
              placeholder="Enter description"
              register={register}
              registerer="description"
            /> */}
            <TextInput
              label="Video Link"
              errors={errors.link}
              placeholder="https://youtube.com/..."
              register={register}
              registerer="link"
              tooltip="Please ensure the link provided is an embedded link"
            />
            <TextInput
              label="Date"
              placeholder="YY-MM-DD"
              errors={errors.date}
              register={register}
              registerer="date"
              tooltip="Date is required"
            />

            <div>
              <div className="font-medium pb-1.5">Categories</div>
              <Select
                value={watch("categoryIds")?.[0] ?? ""}
                onValueChange={(val) =>
                  setValue("categoryIds", [val], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryIds && (
                <p className="text-red-500 text-[15px] pt-1">
                  {errors.categoryIds.message as any}
                </p>
              )}
            </div>

            <ImagePicker
              label="Thumbnail"
              errors={errors.file}
              register={register}
              registerer="file"
              watcher={watch("file")}
              accept=".png,.jpg,.jpeg,.webp"
              tooltip="Accept .png,.jpg,.jpeg,.webp<br/>Max size 2MB"
            />
          </div>

          <div className=" p-6">
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
