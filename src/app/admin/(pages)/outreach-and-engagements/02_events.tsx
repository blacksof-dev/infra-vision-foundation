"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import ImagePicker from "../../components/input/imagePicker";
import PdfPicker from "../../components/input/pdfPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { Button } from "../../components/button";
import MarkdownEditor from "../../components/markdownEditor";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";

import axios from "axios";
import { toast } from "react-toastify";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------ Types & Schema ------------------
type Engagement = {
  id: string;
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  details: {
    images: { image: string; description?: string }[];
    date?: string;
    content?: string;
    cta?: { ctaText?: string; link?: string } | null;
  };
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const engagementSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    dayTime: z.string().min(1, "Day/Time is required"),
    meetingType: z.string().min(1, "Meeting type is required"),
    desc: z.string().min(1, "Short summary is required"),
    active: z.boolean(),
    details: z.object({
      images: z.array(
        z.object({
          image: z.any(), // FileList | string
          description: z.string().optional(),
        })
      ),
      content: z.string().optional(),
      cta: z
        .object({
          ctaText: z.string().optional(),
          link: z.string().optional(),
        })
        .optional(),
    }),
    pdfFile: z.any().optional(), // FileList | undefined
  })
  .refine(
    (data) => {
      const hasPdf = data.pdfFile instanceof FileList && data.pdfFile.length > 0;
      const hasLink = data.details?.cta?.link && data.details.cta.link.trim() !== "";
      return !(hasPdf && hasLink); // must not have both
    },
    {
      message: "Provide either a PDF file OR an external link, not both",
      path: ["pdfFile"],
    }
  );

type FormValues = z.infer<typeof engagementSchema>;

// ------------------ ToggleSwitch ------------------
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-pink" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ------------------ Main Admin Calendar Component ------------------
export default function AdminCalendarManager() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState<number[]>([currentYear]);
  const [year, setYear] = useState<number>(currentYear);
  const [events, setEvents] = useState<Engagement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Engagement | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // fetch years
  useEffect(() => {
    async function fetchYears() {
      try {
        const res = await getData(`/outreach-and-engagements/years`, session);
        if (res?.years) setYears(res.years);
      } catch (e) {
        console.error(e);
      }
    }
    fetchYears();
  }, [session]);

  // fetch events by year
  useEffect(() => {
    loadEvents(year);
  }, [year, session]);

  async function loadEvents(yr: number) {
    try {
      setIsLoading(true);
      const res = await getData(`/outreach-and-engagements?year=${yr}`, session);
      setEvents(res?.data ?? []);
    } catch (e) {
      toast.error("Failed to load events");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/outreach-and-engagements/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      toast.success("Deleted successfully");
      setEvents((s) => s.filter((e) => e.id !== id));
      setConfirmDeleteId(null);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  async function toggleActive(id: string, value: boolean) {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/outreach-and-engagements/${id}`,
        { active: value },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      toast.success("Status updated");
      await loadEvents(year);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Toggle failed");
    }
  }

  return (
    <section className="blade-top-margin-lg">
      <SectionHeading
        heading="Section - 02 (Calendar)"
        cta
        ctaText="Add new event"
        handleClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* Year selector */}
      <div className="mt-6">
        <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200">
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-gray/10 border-t border-gray">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <div key={month} className="border-b border-r border-gray p-4">
            <div className="text-lg text-pink font-medium mb-3">
              {new Date(year, month - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </div>

            <div className="flex flex-col gap-3 min-h-[8rem] 2xl:min-h-[12rem]">
              {events
                .filter((ev) => new Date(ev.date).getMonth() + 1 === month)
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white border border-gray/30 rounded p-3 2xl:p-4 shadow-2xs hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium 2xl:text-lg">
                          {new Date(ev.date).getDate()}
                        </span>
                        <span className="  inline-block mx-2 w-[1px] h-5 bg-darkgray"></span>
                        <span className="text-darkgray 2xl:text-base text-sm">{ev.dayTime}</span>
                      </div>
                      <div className="flex items-center mt-1 2xl:mt-4 gap-2 text-darkgray">
                        <span className="w-2 h-2 shrink-0 bg-pink rounded-full"></span>
                        <span className="text-sm 2xl:text-lg">{ev.meetingType}</span>
                      </div>
                      <div className="text-[13px] 2xl:text-sm font-normal mt-2 2xl:mt-4 ">{ev.desc}</div>
                    </div>

                    <div className="flex mt-8 justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-darkgray/70">Active</span>
                        <ToggleSwitch
                          checked={Boolean(ev.active)}
                          onChange={(val) => toggleActive(ev.id, val)}
                        />
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Button
                          text="Delete"
                          theme="transparentPink"
                          size="small"
                          onClick={() => setConfirmDeleteId(ev.id)}
                        />
                        <Button
                          text="Edit"
                          theme="pink"
                          size="small"
                          onClick={() => {
                            setEditing(ev);
                            setFormOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded p-6 w-[28rem]">
            <div className="flex justify-between items-center mb-4">
              <h6 className="font-medium">Confirm delete</h6>
              <button onClick={() => setConfirmDeleteId(null)}>
                <X />
              </button>
            </div>
            <p className="text-sm text-darkgray/80">
              This will permanently delete the event. Are you sure?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                theme="transparentGray"
                size="small"
                text="Cancel"
                onClick={() => setConfirmDeleteId(null)}
              />
              <Button
                theme="pink"
                size="small"
                text="Delete"
                onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      {formOpen && (
        <EventForm
          initalData={editing}
          onClose={async () => {
            setFormOpen(false);
            setEditing(null);
            await loadEvents(year);
          }}
          session={session}
        />
      )}
    </section>
  );
}

// ------------------ Event Form ------------------
function EventForm({
  initalData,
  onClose,
  session,
}: {
  initalData: Engagement | null;
  onClose: () => void;
  session: any;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues = useMemo<FormValues>(() => {
    if (!initalData) {
      return {
        date: "",
        dayTime: "",
        meetingType: "",
        desc: "",
        active: true,
        pdfFile: undefined,
        details: { images: [], content: "", cta: { ctaText: "", link: "" } },
      };
    }
    return {
      date: initalData.date?.slice(0, 10) ?? "",
      dayTime: initalData.dayTime ?? "",
      meetingType: initalData.meetingType ?? "",
      desc: initalData.desc ?? "",
      active: Boolean(initalData.active),
      pdfFile: undefined,
      details: {
        images:
          initalData.details?.images?.map((im) => ({
            image: im.image,
            description: im.description ?? "",
          })) ?? [],
        content: initalData.details?.content ?? "",
        cta: initalData.details?.cta ?? { ctaText: "", link: "" },
      },
    };
  }, [initalData]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(engagementSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details.images",
  });

  const detailsContent = watch("details.content") || "";

  useEffect(() => {
    reset(defaultValues);
  }, [initalData]);

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsSaving(true);

      // process images
      const processedImages: { image: string; description?: string }[] = [];
      for (const img of data.details.images) {
        let url: string | null = null;
        const imageValue = img.image as unknown;
        if (typeof imageValue === "string" && imageValue.trim().length > 0) {
          url = imageValue;
        } else if (imageValue instanceof FileList && imageValue.length > 0) {
          const file = imageValue[0] as File;
          const result = await uploadFile(file, "image", session?.accessToken);
          if (!result) {
            toast.error("Image upload failed");
            setIsSaving(false);
            return;
          }
          url = result;
        }
        if (url) processedImages.push({ image: url, description: img.description || "" });
      }

      // Handle PDF vs Link
      let finalLink = data.details?.cta?.link?.trim() || "";
      if (!finalLink && data.pdfFile instanceof FileList && data.pdfFile.length > 0) {
        const result = await uploadFile(data.pdfFile[0], "pdf", session?.accessToken);
        if (!result) {
          toast.error("PDF upload failed");
          setIsSaving(false);
          return;
        }
        finalLink = result;
      }

      const payload = {
        date: data.date,
        dayTime: data.dayTime,
        meetingType: data.meetingType,
        desc: data.desc,
        active: data.active, 
        ctaText:"null",
        details: {
          date: data.date,
          images: processedImages,
          content: data.details.content ?? "",
          cta: {
            ctaText: data.details?.cta?.ctaText ?? "",
            link: finalLink || "",
          },
        },
      };

      const urlBase = `${process.env.NEXT_PUBLIC_HOST_URL}/outreach-and-engagements`;
      const headers = { Authorization: `Bearer ${session?.accessToken}` };

      if (initalData?.id) {
        await axios.patch(`${urlBase}/${initalData.id}`, payload, { headers });
        toast.success("Updated successfully");
      } else {
        await axios.post(urlBase, payload, { headers });
        toast.success("Created successfully");
      }

      onClose();
    } catch (e: any) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[48rem] max-h-[90vh] overflow-auto bg-white rounded p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{initalData ? "Edit Event" : "Add Event"}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ring-1 rounded-full p-0.5 hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <div className="font-medium text-sm">Active</div>
            <ToggleSwitch checked={Boolean(watch("active"))} onChange={(val) => setValue("active", val)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date"
              placeholder="YYYY-MM-DD"
              tooltip="Date is required"
              register={register}
              registerer="date"
              errors={errors.date}
            />
            <TextInput
              label="Day/Time"
              placeholder="e.g. Monday, 3:00 PM"
              tooltip="Day and time required"
              register={register}
              registerer="dayTime"
              errors={errors.dayTime}
            />
          </div>

          <TextInput
            label="Meeting Type"
            placeholder="External engagement"
            register={register}
            registerer="meetingType"
            tooltip="Meeting type is required"
            errors={errors.meetingType}
          />

          <TextInput
            label="Short Summary"
            placeholder="Short Summary"
            tooltip="Short Summary is required"
            register={register}
            registerer="desc"
            errors={errors.desc}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              placeholder="See more"
              errors={errors?.details?.cta?.ctaText}
              label="CTA Text (optional)"
              register={register}
              registerer="details.cta.ctaText"
            />
            <TextInput
              placeholder="https://example.com"
              errors={errors?.details?.cta?.link}
              label="CTA Link (optional)"
              register={register}
              registerer="details.cta.link"
            />
          </div>

          <PdfPicker
            label="PDF Upload (optional)"
            errors={errors.pdfFile}
            register={register}
            registerer="pdfFile"
            watcher={watch("pdfFile")}
            accept=".pdf"
            tooltip="Upload a PDF if no external link is provided"
          />

          {/* Images */}
          <div className="border border-gray/40 rounded-md p-2">
            <div className="flex justify-between gap-1 items-center">
              <div className="text-lg font-medium">Images</div>
              <Button
                size="small"
                theme="transparentPink"
                type="button"
                text="Add more images"
                onClick={() => append({ image: undefined, description: "" })}
              />
            </div>

            <div className="flex flex-col gap-3 mt-2 ">
              {fields.map((field, i) => (
                <div key={field.id} className="flex justify-items-normal items-end gap-2  border border-gray p-2 rounded-md first:mt-2">
                  <ImagePicker
                    label={`Image - ${i + 1}`}
                    errors={errors.details?.images?.[i]?.image}
                    register={register}
                    registerer={`details.images.${i}.image`}
                    watcher={watch(`details.images.${i}.image`)}
                    accept="image/*"
                  />
                  <TextInput
                   
                    label={`Description - ${i + 1}`}
                    placeholder="Image description"
                    register={register}
                    registerer={`details.images.${i}.description`}
                    errors={errors.details?.images?.[i]?.description}
                  />
                  <Button
                    theme="transparentPink"
                    size="small"
                    text="Remove"
                    type="button" 
                    className="py-3"
                    onClick={() => remove(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Markdown */}
          <div>
            <div className="font-medium text-sm mb-1">Details (Markdown)</div>
            <MarkdownEditor
              value={detailsContent}
              // onChange={(v) => setValue("details.content", v ?? "")}
              setValue={(val: string) => setValue("details.content", val)}
            />
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <Button
              text="Cancel"
              theme="transparentGray"
              size="small"
              type="button"
              onClick={onClose}
            />
            <Button
              text={isSaving ? "Saving..." : initalData ? "Update" : "Save"}
              theme="pink"
              size="small"
              type="submit"
              isDisabled={isSaving}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
