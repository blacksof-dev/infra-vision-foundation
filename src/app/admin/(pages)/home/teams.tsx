"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";

type Trustee = {
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

type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

type TrusteesResponse = {
  trustees: Trustee[];
  pagination: Pagination;
  lastUpdated?: string;
};

interface FormStateType {
  isFormOpen: boolean;
  editItem: Trustee | null;
  items: Trustee[];
}

export default function TeamsTrustees() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });

  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  async function loadTrustees(page = 1, limit = 100, search = " ") {
    try {
      setIsLoadingList(true);
      const data = (await getData(
        `/teams/trustees?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        session
      )) as TrusteesResponse;
      setFormState((s) => ({ ...s, items: data.trustees ?? [] }));
      setPagination(data.pagination);
    } catch (e) {
      toast.error("Failed to load trustees");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadTrustees(1, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteTrustee(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/teams/trustees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Deleted successfully");
        await loadTrustees(1, 100);
      } else {
        console.log(res);
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
          heading="Section - Teams (Trustees)"
          ctaText="Add New"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true, editItem: null };
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {formState.items.map((item) => (
          <article
            key={item.id}
            className="p-4 bg-white rounded-md border border-gray flex flex-col gap-3"
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-md overflow-hidden border border-gray/20">
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {item.popupImg ? (
                <div className="w-24 h-24 rounded-md overflow-hidden border border-gray/20">
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.popupImg}`}
                    alt={`${item.title} popup`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : null}
            </div>
            <div className="text-sm">
              <div className="font-semibold">{item.title}</div>
              <div className="opacity-80">{item.desig}</div>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-xs"
                >
                  {item.socialMedia || "Link"}
                </a>
              ) : null}
              <div className="text-xs mt-1">Order: {item.order}</div>
              <div className="text-xs">
                Active: {item.active ? "Yes" : "No"}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                theme="transparentPink"
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
        <TrusteeForm
          initalData={formState.editItem}
          onClose={async (refresh?: boolean) => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            if (refresh) await loadTrustees(1, 100);
          }}
        />
      )}
    </>
  );
}

const trusteeSchema = z.object({
  title: generalSchema("Name is required"),
  desig: generalSchema("Designation is required"),
  popupdesc: z.string().min(1, "Popup description is required"),
  link: z.string().optional(),
  socialMedia: z.string().optional(),
  order: z.coerce.number().min(0),
  active: z.coerce.boolean(),
  image: fileSchema,
  popupImg: fileSchema,
});

type TrusteeFormValues = z.infer<typeof trusteeSchema>;

function TrusteeForm({
  initalData,
  onClose,
}: {
  initalData: Trustee | null;
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
        socialMedia: "",
        order: 0,
        active: true,
        image: "",
        popupImg: "",
      } as unknown as TrusteeFormValues;
    }
    return {
      title: initalData.title,
      desig: initalData.desig,
      popupdesc: initalData.popupdesc || "",
      link: initalData.link || "",
      socialMedia: initalData.socialMedia || "",
      order: initalData.order,
      active: initalData.active,
      image: initalData.image,
      popupImg: initalData.popupImg || "",
    } as unknown as TrusteeFormValues;
  }, [initalData]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<TrusteeFormValues>({
    resolver: zodResolver(trusteeSchema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<TrusteeFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Image upload handling (primary image)
      let imageUrl: string | null = null;
      const imageValue = data.image as unknown;
      if (typeof imageValue === "string" && imageValue.trim().length > 0) {
        imageUrl = imageValue;
      } else if (imageValue instanceof FileList && imageValue.length > 0) {
        const file = imageValue[0] as File;
        const res = await uploadImage(file, session, `trustee-${Date.now()}`);
        if (!res.success) {
          toast.error(res.errorMessage);
          return;
        }
        imageUrl = res.data.url;
      } else {
        setError("image", { type: "manual", message: "Image is required" });
        return;
      }

      // Popup image upload handling
      let popupImgUrl: string | null = null;
      const popupValue = data.popupImg as unknown;
      if (typeof popupValue === "string" && popupValue.trim().length > 0) {
        popupImgUrl = popupValue;
      } else if (popupValue instanceof FileList && popupValue.length > 0) {
        const file = popupValue[0] as File;
        const res = await uploadImage(
          file,
          session,
          `trustee-popup-${Date.now()}`
        );
        if (!res.success) {
          toast.error(res.errorMessage);
          return;
        }
        popupImgUrl = res.data.url;
      } else {
        setError("popupImg", {
          type: "manual",
          message: "Popup image is required",
        });
        return;
      }

      const body = {
        image: imageUrl,
        title: data.title,
        desig: data.desig,
        popupImg: popupImgUrl,
        popupdesc: data.popupdesc,
        link: data.link,
        socialMedia: data.socialMedia,
        order: data.order,
        active: data.active,
      };

      if (initalData?.id) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_HOST_URL}/teams/trustees/${initalData.id}`,
          body,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        console.log(res);
        if (res.status === 200) toast.success("Updated");
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_URL}/teams/trustees`,
          body,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        if (res.status === 201) toast.success("Created");
      }

      await onClose(true);
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[32rem] relative  blade-top-padding-s bg-white   rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto overflow-x-hidden">
        <form className="h-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="  flex justify-end sticky top-2 px-1 z-[999]   ">
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
                tooltip="Name is required"
              />
              <TextInput
                label="Designation"
                errors={errors.desig}
                placeholder="Enter designation"
                register={register}
                registerer="desig"
                tooltip="Designation is required"
              />
              <TextInput
                label="Popup Description"
                errors={errors.popupdesc}
                placeholder="Short bio for popup"
                register={register}
                registerer="popupdesc"
                tooltip="Description is required"
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Link (optional)"
                  errors={errors.link}
                  placeholder="https://..."
                  register={register}
                  registerer="link"
                  tooltip="Social/profile link"
                />
                <TextInput
                  label="Social Media (optional)"
                  errors={errors.socialMedia}
                  placeholder="linkedin | X | youtube"
                  register={register}
                  registerer="socialMedia"
                  tooltip="Platform name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Order"
                  errors={errors.order}
                  placeholder="0"
                  register={register}
                  registerer="order"
                  tooltip="Lower appears first"
                />
                <TextInput
                  label="Active (true/false)"
                  errors={errors.active}
                  placeholder="true"
                  register={register}
                  registerer="active"
                  tooltip="true or false"
                />
              </div>

              <ImagePicker
                label="Profile Image"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Recommended square image"
              />
              <ImagePicker
                label="Popup Image"
                errors={errors.popupImg}
                register={register}
                registerer="popupImg"
                watcher={watch("popupImg")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Popup image"
              />
            </div>
            <div className="mt-auto ">
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
