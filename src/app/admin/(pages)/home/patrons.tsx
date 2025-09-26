"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { Linkedin, Twitter, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from "next/dynamic";
import { ToggleSwitch } from "../../components/toggleSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import Link from "next/link";
// Dynamically import Markdown editor
const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type Patrons = {
  id: string;
  image: string;
  title: string;
  desig: string;
  popupImg?: string;
  link?: string;
  socialMedia?: string;
  popupdesc?: string;
  order: number;
  active: boolean;
};

type PatronsResponse = {
  trustees: Patrons[];
  lastUpdated?: string;
};

interface FormStateType {
  isFormOpen: boolean;
  editItem: Patrons | null;
  items: Patrons[];
}

export default function TeamsPatrons() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  async function loadTrustees() {
    try {
      setIsLoadingList(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/teams/patrons`
      );
     
      setFormState((s) => ({ ...s, items: res.data.patrons ?? [] }));
    } catch (e) {
      toast.error("Failed to load trustees");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadTrustees();
  }, []);

  async function deleteTrustee(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/teams/patrons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (res.status === 204) {
        toast.success("Deleted successfully");
        await loadTrustees();
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <>
      <div className="blade-top-padding">
        <SectionHeading
          heading="Section - Teams (Patrons)"
          ctaText="Add New Member"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true, editItem: null };
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mt-6">
        {formState.items.map((item) => (
          <article
            key={item.id}
            className="p-4 bg-white rounded-md border border-gray flex flex-col gap-3"
          >
            <div className="flex gap-4">
              {item.image && (
                <div className="w-full h-[15rem] rounded-md overflow-hidden border border-gray/20">
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              {item.popupImg && (
                <div className="w-full h-[15rem] rounded-md overflow-hidden border border-gray/20">
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.popupImg}`}
                    alt={`${item.title} popup`}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="text-base">
              <div className="font-semibold flex justify-between"><span className="block">{item.title}</span><span className="block"> {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink underline text-base"
                >
                  {item.socialMedia==="linkedin"&& <Linkedin/>}
                  {item.socialMedia==="twitter"&& <Twitter/>}
                </Link>
              ) : null}</span></div>
              <div className="opacity-80">{item.desig}</div>         
              <div className="mt-4">Order: {item.order}</div>
              <div className="">
                Active: {item.active ? "Yes" : "No"}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                theme="pink"
                size="base"
                text="Edit"
                onClick={() =>
                  setFormState((s) => ({
                    ...s,
                    isFormOpen: true,
                    editItem: item,
                  }))
                }
              />
              <Button
                theme="transparentPink"
                size="base"
                text="Delete"
                onClick={() => deleteTrustee(item.id)}
              />
            </div>
          </article>
        ))}
      </div>

      {formState.isFormOpen && (
        <PatronForm
          initalData={formState.editItem}
          onClose={async (refresh?: boolean) => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            if (refresh) await loadTrustees();
          }}
        />
      )}
    </>
  );
}

const patronSchema = z.object({
  title: z.string().min(1, "Name is required"),
  desig: z.string().min(1, "Designation is required"),
  popupdesc: z.string().min(1, "Popup description is required"),
  link: z.string().optional(),
  socialMedia: z.enum(["linkedin", "twitter"]).optional(),
  order: z.coerce.number().min(0),
  active: z.boolean(),
  image: z.any().optional(),
  popupImg: z.any().optional(),
});

type PatronFormValues = z.infer<typeof patronSchema>;

function PatronForm({
  initalData,
  onClose,
}: {
  initalData: Patrons | null;
  onClose: (refresh?: boolean) => void | Promise<void>;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues = useMemo(() => {
    if (!initalData) {
      return {
        title: "",
        desig: "",
        popupdesc: "",
        link: "",
        socialMedia: undefined,
        order: 0,
        active: true,
        image: undefined,
        popupImg: undefined,
      } as PatronFormValues;
    }
    return {
      title: initalData.title,
      desig: initalData.desig,
      popupdesc: initalData.popupdesc || "",
      link: initalData.link || "",
      socialMedia:
        (initalData.socialMedia as "linkedin" | "twitter") || undefined,
      order: initalData.order,
      active: initalData.active,
      image: initalData.image,
      popupImg: initalData.popupImg || "",
    } as PatronFormValues;
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatronFormValues>({
    resolver: zodResolver(patronSchema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<PatronFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("desig", data.desig);
      formData.append("popupdesc", data.popupdesc);
      formData.append("order", String(data.order));
      formData.append("active", String(data.active));

      if (data.link) formData.append("link", data.link);
      if (data.socialMedia) formData.append("socialMedia", data.socialMedia);

      if (data.image instanceof FileList && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      if (data.popupImg instanceof FileList && data.popupImg.length > 0) {
        formData.append("popupImg", data.popupImg[0]);
      }

      if (initalData?.id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_HOST_URL}/teams/patrons/${initalData.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        toast.success("Updated");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_URL}/teams/patrons`,
          formData,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        toast.success("Created");
      }

      await onClose(true);
    } catch (error: any) {
      console.error("Error in form submission:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[32rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto overflow-x-hidden">
        <form className="h-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex justify-end sticky top-2 px-1 z-[999]">
            <button
              type="button"
              aria-label="close modal"
              className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
              onClick={() => onClose(false)}
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-y-6 h-full p-8 pt-1">
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                label="Name"
                errors={errors.title}
                placeholder="Enter name"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Designation"
                errors={errors.desig}
                placeholder="Enter designation"
                register={register}
                registerer="desig"
              />

              {/* Markdown Editor */}
              <div>
                <div className="font-medium   mb-1">
                  <label className="font-medium mb-2 block">
                    {" "}
                    Popup Description
                  </label>
                </div>
                <MarkdownEditor
                  data-color-mode="light"
                  commandsFilter={(command) =>
                    command.name === "image" ? false : command
                  }
                  value={watch("popupdesc")}
                  onChange={(val) => setValue("popupdesc", val || "")}
                />
                {errors.popupdesc && (
                  <p className="text-red-500 mt-1">
                    {errors.popupdesc.message}
                  </p>
                )}
              </div>

              {/* Dropdown for LinkedIn / Twitter */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-medium mb-2 block">
                    Social media platform
                  </label>
                  <Select
                    value={watch("socialMedia") || ""}
                    onValueChange={(val: "linnkedin" | "twitter") =>
                      setValue("socialMedia", val as "linkedin" | "twitter")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <TextInput
                    label=" Social media link"
                    errors={errors.link}
                    placeholder="https://..."
                    register={register}
                    registerer="link"
                  />
                </div>
              </div>

              <TextInput
                label="Order"
                errors={errors.order}
                placeholder="0"
                register={register}
                registerer="order"
              />

           

              <ImagePicker
                label="Profile Image"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
              <ImagePicker
                label="Popup Image"
                errors={errors.popupImg}
                register={register}
                registerer="popupImg"
                watcher={watch("popupImg")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
            </div>
               {/* Toggle Switch for Active */}
              <div className="flex items-center gap-3">
                <label className="font-medium text-sm">Active</label>
                <ToggleSwitch
                  checked={watch("active")}
                  onChange={(val: boolean) => setValue("active", val)}
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
