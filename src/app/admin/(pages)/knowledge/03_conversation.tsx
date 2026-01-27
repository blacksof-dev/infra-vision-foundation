"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import MessageInput from "../../components/input/textareaInput";
import ImagePicker from "../../components/input/imagePicker";
import { X, Calendar, Video } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import ConfirmationPopup from "../../components/confirmationPopup";
import { getData } from "../../lib/utils";

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

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface ListResponse {
  data: ConversationItem[];
  meta: Pagination;
}

export default function KnowledgeConversations() {
  const { data: session } = useSession();
  const [items, setItems] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ConversationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const loadList = useCallback(
    async (targetPage = page) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(limit),
        });

        const res = (await getData(
          `/knowledge/conversation?${query.toString()}`,
          session
        )) as ListResponse;

        setItems(Array.isArray(res?.data) ? res.data : []);
        setPagination(res?.meta ?? null);
        setPage(targetPage);
      } catch (e) {
        toast.error("Failed to load conversations");
      } finally {
        setIsLoading(false);
      }
    },
    [session, limit, page]
  );

  useEffect(() => {
    loadList(1);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/conversation/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setDeletingId(null);
        loadList(page);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Knowledge Conversations"
          ctaText="Add New Conversation"
          cta
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {isLoading && items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500 font-poppin">
              Loading conversations...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg translate-y-2">
            <p className="text-gray-500 font-medium font-poppin">
              No conversations found.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${it.image}`}
                      alt={it.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs w-fit font-medium text-pink px-2 py-0.5 mb-2 bg-pink/10 rounded-full">
                      {it.date}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-tight mt-2  ">
                      {it.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-600   tracking-wider mb-2 ">
                      {it.title}
                    </p>



                    <div className=" border-t border-gray-50  my-4">
                      <p className="text-md  text-gray-900 line-clamp-3 py-1 flex-1">
                        {it.desc}
                      </p>
                      <a
                        href={it.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-gray-700 uppercase tracking-widest transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Watch Conversation
                      </a>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
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
                        onClick={() => {
                          setEditingItem(it);
                          setIsFormOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="flex items-center justify-center gap-4 pt-10 mt-6 border-t border-gray-100">
                <Button
                  text="Previous"
                  theme="transparentGray"
                  size="small"
                  isDisabled={page <= 1}
                  onClick={() => loadList(page - 1)}
                />
                <div className="flex gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => loadList(p)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${p === page
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
                  onClick={() => loadList(page + 1)}
                />
              </div>
            )}
          </>
        )}
      </section>

      {isFormOpen && (
        <ConversationForm
          initialData={editingItem}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            loadList(page);
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

const conversationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title/Designation is required"),
  desc: z.string().min(1, "Description is required"),
  videoLink: z.string().url("Valid video link is required"),
  date: z.string().min(1, "Date is required"),
  imageFile: z.any(),
});

type ConversationFormValues = z.infer<typeof conversationSchema>;

function ConversationForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: ConversationItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ConversationFormValues>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      name: initialData?.name || "",
      title: initialData?.title || "",
      desc: initialData?.desc || "",
      videoLink: initialData?.videoLink || "",
      date: initialData?.date || "",
      imageFile: initialData?.image || undefined,
    } as any,
  });

  const onSubmit: SubmitHandler<ConversationFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("videoLink", data.videoLink);
      formData.append("date", data.date);
      formData.append("active", "true");

      const imgVal = data.imageFile;
      if (imgVal instanceof FileList && imgVal.length > 0) {
        formData.append("imageFile", imgVal[0]);
      } else if (typeof imgVal === "string" && imgVal.trim()) {
        formData.append("imageUrl", imgVal);
      } else if (!initialData) {
        setError("imageFile", { type: "manual", message: "Image is required" });
        setIsSubmitting(false);
        return;
      }

      let url = `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/conversation`;
      let method: "post" | "patch" = "post";
      if (initialData?.id) {
        url = `${url}/${initialData.id}`;
        method = "patch";
      }

      await axios.request({
        url,
        method,
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        initialData ? "Updated successfully" : "Created successfully"
      );
      onSuccess();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Save failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-poppin">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Conversation" : "Create New Conversation"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Name*"
                errors={errors.name}
                placeholder="Enter speaker name"
                register={register}
                registerer="name"
              />
              <TextInput
                label="Date*"
                errors={errors.date}
                placeholder="e.g. June 25, 2025"
                register={register}
                registerer="date"
              />
            </div>

            <TextInput
              label="Designation*"
              errors={errors.title}
              placeholder="e.g. Managing Director at ABC Corp"
              register={register}
              registerer="title"
            />

            <MessageInput
              label="Topic Description*"
              errors={errors.desc}
              placeholder="Write a brief overview of the conversation topic..."
              register={register}
              registerer="desc"
            />

            <TextInput
              label="Video URL*"
              errors={errors.videoLink}
              placeholder="https://www.youtube.com/watch?v=..."
              register={register}
              registerer="videoLink"
            />

            <ImagePicker
              label="Cover Image*"
              errors={errors.imageFile}
              register={register}
              registerer="imageFile"
              watcher={watch("imageFile")}
              accept=".png, .jpg, .jpeg, .webp"
            />
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
              text={initialData ? "Update Conversation" : "Create Conversation"}
              theme="pink"
              size="large"
              className="flex-1"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
