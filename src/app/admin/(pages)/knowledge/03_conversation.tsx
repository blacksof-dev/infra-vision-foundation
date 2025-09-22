"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import ImagePicker from "../../components/input/imagePicker";
import { X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type ConversationItem = {
  id: string;
  image: string;
  videoLink: string;
  name: string;
  title: string;
  desc: string;
  date: string; // free text per API
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function KnowledgeConversations() {
  const { data: session } = useSession();
  const [items, setItems] = useState<ConversationItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<ConversationItem | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function loadList() {
    try {
      setIsLoadingList(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/conversation`,
        { params: { page: 1, limit: 100 }, headers: { Accept: "*/*" } }
      );
      const data = res?.data?.data as ConversationItem[];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load conversations");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  async function deleteItem(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/conversation/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setItems((prev) => prev.filter((x) => x.id !== id));
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
    <section className="blade-top-padding">
      <SectionHeading
        heading="Section - 03 (Conversations)"
        ctaText="Add new"
        cta
        handleClick={() => {
          setEditItem(null);
          setFormOpen(true);
        }}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.length === 0 && (
          <div className="col-span-full text-center text-darkgray/70 py-8 border border-lightgray/30 rounded-md bg-white">
            No conversations found.
          </div>
        )}
        {items.map((it) => (
          <article
            key={it.id}
            className="rounded-lg border border-lightgray/40 bg-white p-2 shadow-sm hover:shadow-md transition-shadow gap-4"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
              alt={it.name}
              className="w-full object-cover rounded-md border border-lightgray/40"
            />
            <div className="flex-1 mt-3">
              <h6 className="text-base font-medium leading-snug">{it.name}</h6>
              <p className="text-sm text-darkgray/80 line-clamp-2 ">
                {it.title}
              </p>
              <p className="text-sm text-darkgray/80 line-clamp-2 mt-1">
                {it.desc}
              </p>
              <div className="text-xs text-darkgray/70 mt-2 flex items-center gap-2 flex-wrap">
                <span className="whitespace-nowrap">{it.date}</span>
                <span className="mx-1">•</span>
                <a
                  href={it.videoLink}
                  target="_blank"
                  className="underline text-xs break-all"
                >
                  Video
                </a>
              </div>
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <Button
                text="Delete"
                theme="transparentGray"
                size="large"
                onClick={() => {
                  setDeletingId(it.id);
                  setConfirmOpen(true);
                }}
              />
              <Button
                text="Edit"
                theme="pink"
                size="large"
                onClick={() => {
                  setEditItem(it);
                  setFormOpen(true);
                }}
              />
            </div>
          </article>
        ))}
      </div>

      {formOpen && (
        <ConversationForm
          initalData={editItem}
          onClose={async () => {
            setFormOpen(false);
            setEditItem(null);
            await loadList();
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
              conversation?
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
                onClick={() => deletingId && deleteItem(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const conversationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  videoLink: z.string().url("Valid YouTube link is required"),
  date: z.string().min(1, "Date is required"),
  imageFile: z.any(),
});

type ConversationFormValues = z.infer<typeof conversationSchema>;

function ConversationForm({
  initalData,
  onClose,
}: {
  initalData: ConversationItem | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues: Partial<ConversationFormValues> = useMemo(() => {
    if (!initalData) {
      return {
        name: "",
        title: "",
        desc: "",
        videoLink: "",
        date: "",
        imageFile: "",
      };
    }
    return {
      name: initalData.name,
      title: initalData.title,
      desc: initalData.desc,
      videoLink: initalData.videoLink,
      date: initalData.date,
      imageFile: initalData.image,
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ConversationFormValues>({
    resolver: zodResolver(conversationSchema),
    defaultValues: defaultValues as ConversationFormValues,
  });

  const submitHandler: SubmitHandler<ConversationFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("videoLink", data.videoLink);
      formData.append("date", data.date);
      formData.append("active", "true");

      const imgVal = data.imageFile as unknown;
      if (typeof imgVal === "string" && imgVal.trim()) {
        // existing URL/path
        formData.append("imageUrl", imgVal);
      } else if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("imageFile", imgVal[0] as File);
      } else {
        setError("imageFile", { type: "manual", message: "Image is required" });
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/conversation`;
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
            <TextInput
              label="Name"
              errors={errors.name}
              placeholder="Enter name"
              register={register}
              registerer="name"
              tooltip="Name is required"
            />
            <TextInput
              label="Title"
              errors={errors.title}
              placeholder="Enter title/designation"
              register={register}
              registerer="title"
              tooltip="Title is required"
            />
            <TextInput
              label="Description"
              errors={errors.desc}
              placeholder="Enter description/topic"
              register={register}
              registerer="desc"
              tooltip="Description is required"
            />
            <TextInput
              label="YouTube Link"
              errors={errors.videoLink}
              placeholder="https://www.youtube.com/watch?v=..."
              register={register}
              registerer="videoLink"
              tooltip="Valid YouTube link"
            />
            <TextInput
              label="Date"
              errors={errors.date}
              placeholder="June, 2025"
              register={register}
              registerer="date"
              tooltip="Display date"
            />
            <ImagePicker
              label="Image"
              errors={errors.imageFile}
              register={register}
              registerer="imageFile"
              watcher={watch("imageFile")}
              accept=".svg, .png, .jpg, .jpeg, .webp"
              tooltip="Max 2MB. Recommended 1200x628"
            />

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
