"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import ImagePicker from "../../components/input/imagePicker";
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
import { uploadImage } from "../../lib/utils"; // your upload util
// If uploadImage path differs, adjust the import

// ------------------ Types & Schema ------------------
type Engagement = {
  id: string;
  date: string;
  dayTime?: string;
  meetingType: string;
  desc: string;
  ctaText?: string;
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

const engagementSchema = z.object({
  date: z.string().min(1, "Date is required"),
  meetingType: z.string().min(1, "Meeting type is required"),
  desc: z.string().min(1, "Short summary is required"),
  active: z.boolean(), // Make required, remove .default(true)
  details: z.object({
    images: z.array(
      z.object({
        image: z.any(), // file or string
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
});

type FormValues = z.infer<typeof engagementSchema>;

// ------------------ ToggleSwitch (inline) ------------------
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // fetch events by year
  useEffect(() => {
    loadEvents(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, session]);

  async function loadEvents(yr: number) {
    try {
      setIsLoading(true);
      // only year filter as requested
      const res = await getData(
        `/outreach-and-engagements?year=${yr}`,
        session
      );
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
    // quick toggle: PATCH with active (depends on API, fallback to full fetch)
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
    <section className="blade-top-margin-lg p-6">
      <SectionHeading
        heading="Calendar"
        cta
        ctaText="Add new event"
        handleClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* Year selector */}
      {/* <div className="flex gap-4 items-center mt-6">
        <div className="text-sm font-medium">Year</div>
        <select
          value={String(year)}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-1"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div> */}
      <div className="mt-6">
      <Select
        value={String(year)}
        onValueChange={(val) => setYear(Number(val))}
      >
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

      {/* Calendar grid (12 months) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4   bg-gray/10 border-t   border-gray">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <div key={month} className="border-b border-r border-gray p-4">
            <div className="text-lg text-pink font-medium mb-3">
              {new Date(year, month - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </div>

            <div className="flex flex-col gap-3 min-h-[12rem]">
              {events
                .filter((ev) => new Date(ev.date).getMonth() + 1 === month)
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white border border-gray/30 rounded p-4 shadow-2xs hover:shadow-lg transition-all duration-300"
                  >
                    <div className="">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-lg">
                            {new Date(ev.date).getDate()}
                          </span>
                          <span className="font-xl inline-block mx-2 w-[1px] h-5 bg-darkgray"></span>
                          <span className="text-darkgray">
                            {ev.dayTime ? `  ${ev.dayTime}` : null}
                          </span>
                        </div>
                        <div className="flex items-center mt-4 gap-2 text-darkgray">
                          <span className="w-2 h-2 shrink-0 bg-pink rounded-full"></span>
                          <span>{ev.meetingType}</span>
                        </div>
                        <div className="text-sm font-normal mt-4">
                          {ev.desc}
                        </div>
                      </div>

                      <div className="flex mt-8 justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-darkgray/70">
                            Active
                          </span>
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
                  </div>
                ))}

              {/* empty month message */}
              {/* {events.filter((ev) => new Date(ev.date).getMonth() + 1 === month)
                .length === 0 && (
                <div className="text-darkgray/60 text-sm">No events</div>
              )} */}
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
                text="  Cancel"
                onClick={() => setConfirmDeleteId(null)}
              ></Button>
              <Button
                theme="pink"
                size="small"
                text="Delete"
                onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
              ></Button>
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

// ------------------ Event Form Modal ------------------
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
        meetingType: "",
        desc: "",
        active: true,
        details: { images: [], content: "", cta: { ctaText: "", link: "" } },
      };
    }
    return {
      date: initalData.date?.slice(0, 10) ?? "",
      meetingType: initalData.meetingType ?? "",
      desc: initalData.desc ?? "",
      active: Boolean(initalData.active),
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

  // field array for images
  const { fields, append, remove } = useFieldArray({
    control,
    name: "details.images",
  });

  // keep markdown sync
  const detailsContent = watch("details.content") || "";

  useEffect(() => {
    // reset when initial data changes
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initalData]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsSaving(true);

      // process images: accept string URL or FileList
      const processedImages: { image: string; description?: string }[] = [];
      for (const img of data.details.images) {
        let url: string | null = null;
        const imageValue = img.image as unknown;
        if (typeof imageValue === "string" && imageValue.trim().length > 0) {
          // already a URL string (existing image)
          url = imageValue;
        } else if (imageValue instanceof FileList && imageValue.length > 0) {
          const file = imageValue[0] as File;
          // upload using provided uploadImage util
          const result = await uploadImage(
            file,
            session,
            `calendar-${Date.now()}`
          );
          if (!result || !result.success) {
            toast.error(
              `Image upload failed: ${result?.errorMessage ?? "unknown"}`
            );
            setIsSaving(false);
            return;
          }
          url = result.data.url;
        } else {
          // If empty, skip
          continue;
        }
        if (url)
          processedImages.push({
            image: url,
            description: img.description || "",
          });
      }

      // build payload. cta: send empty object {} if not provided as requested
      const ctaVal = data.details?.cta ?? { ctaText: "", link: "" };
      const ctaPayload =
        ctaVal?.ctaText?.trim() || ctaVal?.link?.trim()
          ? { ctaText: ctaVal.ctaText, link: ctaVal.link }
          : {};

      const payload = {
        date: data.date,
        meetingType: data.meetingType,
        dayTime: "null",
        desc: data.desc,
        active: data.active,
        ctaText: "null",
        details: {
          date: data.date,
          images: processedImages,
          content: data.details.content ?? "",
          cta: Object.keys(ctaPayload).length ? ctaPayload : {}, // send {} when empty
        },
      };

      // POST or PATCH
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
          <h3 className="text-lg font-semibold">
            {initalData ? "Edit Event" : "Add Event"}
          </h3>
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
            <ToggleSwitch
              checked={Boolean(watch("active"))}
              onChange={(val) => setValue("active", val)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date"
              placeholder="YY-MM-DD"
              tooltip="Date in required <br/> Formate - YY-MM-DD"
              register={register}
              registerer="date"
              errors={errors.date}
            />
            <TextInput
              label="Meeting Type"
              placeholder="External engagement"
              register={register}
              registerer="meetingType"
              tooltip="Meeting type is required"
              errors={errors.meetingType}
            />
          </div>

          <TextInput
            label="Short Summary"
            placeholder="Short description"
            tooltip="Short Summary is required"
            register={register}
            registerer="desc"
            errors={errors.desc}
          />

          {/* CTA inputs (optional) */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              placeholder="See more"
              errors={""}
              label="CTA Text (optional)"
              register={register}
              registerer="details.cta.ctaText"
            />
            <TextInput
              placeholder="link"
              errors={""}
              label="CTA Link (optional)"
              register={register}
              registerer="details.cta.link"
            />
          </div>

          {/* Images - dynamic list */}
          <div className="border border-gray/40 rounded-md p-2">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">Images</div>
              <Button
                theme="transparentPink"
                text="+ Add image"
                type="button"
                size="small"
                onClick={() => append({ image: "", description: "" })}
              ></Button>
            </div>

            <div className="flex flex-col gap-3">
              {fields.length === 0 && (
                <div className="text-sm text-darkgray/70 text-center">
                  Please add an image
                </div>
              )}

              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="grid grid-cols-12 gap-2 items-center border border-gray p-2 mt-2 rounded-md"
                >
                  {/* file input */}
                  <div className="col-span-10 row-start-1 ">
                    <div className=" pb-2 font-medium">Image</div>
                    {/* <label
                      htmlFor={`image-label-${idx}`}
                      className="p-2 h-11  border flex items-center border-gray/40 rounded-md cursor-pointer"
                    >
                      <input
                        id={`image-label-${idx}`}
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        {...(register(`details.images.${idx}.image`) as any)}
                        className="w-full h-full cursor-pointer"
                      />
                    </label> */}
                    <ImagePicker
                      label="Cover Image"
                      errors={''}
                      register={register}
                      registerer={`details.images.${idx}.image`}
                      watcher={watch(`details.images.${idx}.image`)}
                      accept=".png,.jpg,.jpeg,.webp"
                      tooltip="Image is required"
                    />
                    {/* <div className="text-xs text-darkgray/60 mt-1">
                      Or provide URL in next field (if editing existing)
                    </div> */}
                  </div>

                  {/* url input fallback */}
                  {/* <div className="col-span-5">
                    <TextInput
                      placeholder="url"
                      errors={""}
                      label="Image URL (optional)"
                      register={register}
                      registerer={`details.images.${idx}.image`}
                      // using same register; if user types URL it will be a string
                    />
                  </div> */}

                  {/* description */}
                  <div className="col-span-10 ">
                    <TextInput
                      placeholder="description"
                      errors={""}
                      label="Image description (optional)"
                      register={register}
                      registerer={`details.images.${idx}.description`}
                    />
                  </div>

                  <div className="col-span-12 row-start-1  flex justify-end">
                    <Button
                      text="Remove"
                      type="button"
                      theme="transparentGray"
                      onClick={() => remove(idx)}
                    ></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Markdown Editor for big content */}
          <div className="">
            <div className="font-medium mb-2">Details Content</div>
            <MarkdownEditor
              value={detailsContent}
              setValue={(val: string) => setValue("details.content", val)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              text=" Cancel"
              type="button"
              theme="transparentGray"
              onClick={onClose}
            ></Button>
            <Button
              text={initalData ? "Update" : "Create"}
              type="submit"
              theme="pink"
              isLoading={isSaving}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
