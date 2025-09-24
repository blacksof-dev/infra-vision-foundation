"use client";
import React, { useEffect, useState } from "react";
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
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import Link from "next/link";

interface GetInvolvedDefaultValueType {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

interface FormStateType {
  isFormOpen: boolean;
  intialValue: GetInvolvedDefaultValueType;
}

export default function GetInvolvedBanner() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    intialValue: {
      heading: "Get Involved",
      description:
        "Join our community, ask questions, or participate in building a resilient India.",
      ctaText: "Apply now",
      ctaLink: "https://www.example.com",
      backgroundImageDesktop: "",
      backgroundImageMobile: "",
    },
  });

  async function fetch() {
    const data = await getData(
      "/content/get-involved-banner-section",
      session
    );
    setFormState((val) => {
      return { ...val, intialValue: data };
    });
    console.log(data);
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div>
        <SectionHeading
          heading="Section - 01 (Banner)"
          ctaText="Update"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true };
            })
          }
        />
      </div>
      <div>
        <GetInvolvedCard data={formState.intialValue} />
      </div>
      {formState.isFormOpen && (
        <GetInvolvedForm
          initalData={formState.intialValue}
          fetchData={fetch}
          onClose={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: false };
            })
          }
        />
      )}
    </>
  );
}

const getInvolvedSchema = z.object({
  heading: generalSchema("Heading is required"),
  description: generalSchema("Description is required"),
  ctaText: generalSchema("CTA text is required"),
  ctaLink: generalSchema("CTA link is required"),
  backgroundImageDesktop: fileSchema,
  backgroundImageMobile: fileSchema,
});

type GetInvolvedFormValues = z.infer<typeof getInvolvedSchema>;

function GetInvolvedForm({
  initalData,
  fetchData,
  onClose,
}: {
  initalData: GetInvolvedDefaultValueType;
  fetchData: () => void;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<GetInvolvedFormValues>({
    resolver: zodResolver(getInvolvedSchema),
    defaultValues: initalData,
  });

  const submitHandler: SubmitHandler<GetInvolvedFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Handle Desktop Image
      let desktopImageUrl: string | null = null;
      const desktopValue = data.backgroundImageDesktop as unknown;
      if (typeof desktopValue === "string" && desktopValue.trim().length > 0) {
        desktopImageUrl = desktopValue;
      } else if (desktopValue instanceof FileList && desktopValue.length > 0) {
        const desktopImageFile = desktopValue[0] as File;
        const desktopImageResult = await uploadImage(
          desktopImageFile,
          session,
          `banner-desktop-${Date.now()}`
        );
        if (!desktopImageResult.success) {
          toast.error(
            `Desktop image upload failed: ${desktopImageResult.errorMessage}`
          );
          return;
        }
        desktopImageUrl = desktopImageResult.data.url;
      } else {
        setError("backgroundImageDesktop", {
          type: "manual",
          message: "Background image for desktop is required",
        });
        return;
      }

      // Handle Mobile Image
      let mobileImageUrl: string | null = null;
      const mobileValue = data.backgroundImageMobile as unknown;
      if (typeof mobileValue === "string" && mobileValue.trim().length > 0) {
        mobileImageUrl = mobileValue;
      } else if (mobileValue instanceof FileList && mobileValue.length > 0) {
        const mobileImageFile = mobileValue[0] as File;
        const mobileImageResult = await uploadImage(
          mobileImageFile,
          session,
          `banner-mobile-${Date.now()}`
        );
        if (!mobileImageResult.success) {
          toast.error(
            `Mobile image upload failed: ${mobileImageResult.errorMessage}`
          );
          return;
        }
        mobileImageUrl = mobileImageResult.data.url;
      } else {
        setError("backgroundImageMobile", {
          type: "manual",
          message: "Background image for mobile is required",
        });
        return;
      }

      // Update content
      const result = await updateContent(
        "/content/get-involved-banner-section",
        session,
        {
          heading: data.heading,
          description: data.description,
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
          backgroundImageDesktop: desktopImageUrl as string,
          backgroundImageMobile: mobileImageUrl as string,
        }
      );

      if (result.success) { 
        onClose();
        fetchData();
        toast.success("Content updated successfully");
      } else {
        toast.error(result.errorMessage);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[27rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[80vh] overflow-auto overflow-x-hidden">
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
          <div className="flex flex-col gap-y-8 h-full p-8 pt-1">
            <div className="flex flex-col gap-y-4">
              <TextInput
                label="Heading"
                errors={errors.heading}
                placeholder="Enter heading"
                register={register}
                registerer="heading"
                tooltip="Heading is required"
              />
              <TextInput
                label="Description"
                errors={errors.description}
                placeholder="Enter description"
                register={register}
                registerer="description"
                tooltip="Description is required"
              />
              <TextInput
                label="CTA Text"
                errors={errors.ctaText}
                placeholder="Enter CTA text"
                register={register}
                registerer="ctaText"
                tooltip="CTA text is required"
              />
              <TextInput
                label="CTA Link"
                errors={errors.ctaLink}
                placeholder="Enter CTA link"
                register={register}
                registerer="ctaLink"
                tooltip="CTA link is required"
              />
              <ImagePicker
                label="Background Image (Desktop)"
                errors={errors.backgroundImageDesktop}
                register={register}
                registerer="backgroundImageDesktop"
                watcher={watch("backgroundImageDesktop")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Extensions: .png/.jpg/.jpeg/.webp <br/> Image size - 1920x1130"
              />
              <ImagePicker
                label="Background Image (Mobile)"
                errors={errors.backgroundImageMobile}
                register={register}
                registerer="backgroundImageMobile"
                watcher={watch("backgroundImageMobile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Extensions: .png/.jpg/.jpeg/.webp <br/> Image size - 390x690"
              />
            </div>
            <div className="mt-auto">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text="Update"
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

function GetInvolvedCard({ data }: { data: GetInvolvedDefaultValueType }) {
  const {
    backgroundImageDesktop,
    backgroundImageMobile,
    heading,
    description,
    ctaText,
    ctaLink,
  } = data;

  return (
    <article className="h-full border border-gray p-4 rounded-md mt-6 w-fit">
      <div className="flex gap-10">
        <div className="rounded-md overflow-hidden relative w-lg border border-gray/20">
          <img
            src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageDesktop}`}
            alt="background cover for desktop"
          />
        </div>

        <div className="w-40 rounded-md overflow-hidden border border-gray/20">
          <img
            src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageMobile}`}
            alt="mobile cover"
            className="object-cover bottom-0 w-full h-full"
          />
        </div>
      </div>

      <div className="mt-6">
        <h6 className="text-base">
          <b>Heading:</b> {heading}
        </h6>
        <h6 className="mt-1 text-base">
          <b>Description:</b> {description}
        </h6>
        <h6 className="mt-1 text-base">
          <b>CTA Text:</b> {ctaText}
        </h6>
        <h6 className="mt-1 text-base">
          <b>CTA Link:</b> <Link className="underline text-blue-500" href={ctaLink} target="_blank">Link</Link>
        </h6>
      </div>
    </article>
  );
}
