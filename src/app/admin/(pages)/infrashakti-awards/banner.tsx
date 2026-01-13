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

interface BannerDataType {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

interface FormStateType {
  isFormOpen: boolean;
  initialValue: BannerDataType;
}

const infrashaktiBannerSchema = z.object({
  title: generalSchema("Title is required"),
  description: generalSchema("Description is required"),
  ctaText: generalSchema("CTA Text is required"),
  ctaLink: generalSchema("CTA Link is required"),
  backgroundImageDesktop: fileSchema,
  backgroundImageMobile: fileSchema,
});

type BannerFormValues = z.infer<typeof infrashaktiBannerSchema>;

const ENDPOINT = "/content/infrashakti-banner";

export default function Banner() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    initialValue: {
      title: "",
      description: "",
      ctaText: "",
      ctaLink: "",
      backgroundImageDesktop: "",
      backgroundImageMobile: "",
    },
  });

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getData(ENDPOINT, session);
        if (data) {
          setFormState((val) => ({ ...val, initialValue: data }));
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetch();
  }, [session]);

  return (
    <>
      <div>
        <SectionHeading
          heading="Section - 01 (Infrashakti Banner) "
          ctaText="Update"
          cta={true}
          handleClick={() =>
            setFormState((val) => ({ ...val, isFormOpen: true }))
          }
        />
      </div>
      <div>
        <BannerCard data={formState.initialValue} />
      </div>
      {formState.isFormOpen && (
        <BannerForm
          initalData={formState.initialValue}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
          onSuccess={async () => {
            const data = await getData(ENDPOINT, session);
            setFormState({ isFormOpen: false, initialValue: data });
          }}
        />
      )}
    </>
  );
}

function BannerForm({
  initalData,
  onClose,
  onSuccess,
}: {
  initalData: BannerDataType;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(infrashaktiBannerSchema),
    defaultValues: initalData,
  });

  const submitHandler: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Desktop Image Handling
      let desktopImageUrl = initalData.backgroundImageDesktop;
      const desktopValue = data.backgroundImageDesktop as any;
      if (typeof desktopValue === "string" && desktopValue.trim().length > 0) {
        desktopImageUrl = desktopValue;
      } else if (desktopValue instanceof FileList && desktopValue.length > 0) {
        const result = await uploadImage(
          desktopValue[0],
          session,
          `infrashakti-desktop-${Date.now()}`
        );
        if (!result.success) {
          toast.error(`Desktop image upload failed: ${result.errorMessage}`);
          return;
        }
        desktopImageUrl = result.data.url;
      }

      // Mobile Image Handling
      let mobileImageUrl = initalData.backgroundImageMobile;
      const mobileValue = data.backgroundImageMobile as any;
      if (typeof mobileValue === "string" && mobileValue.trim().length > 0) {
        mobileImageUrl = mobileValue;
      } else if (mobileValue instanceof FileList && mobileValue.length > 0) {
        const result = await uploadImage(
          mobileValue[0],
          session,
          `infrashakti-mobile-${Date.now()}`
        );
        if (!result.success) {
          toast.error(`Mobile image upload failed: ${result.errorMessage}`);
          return;
        }
        mobileImageUrl = result.data.url;
      }

      const result = await updateContent(ENDPOINT, session, {
        title: data.title,
        description: data.description,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
        backgroundImageDesktop: desktopImageUrl,
        backgroundImageMobile: mobileImageUrl,
      });

      if (result.success) {
        toast.success("Content updated successfully");
        onSuccess();
      } else {
        toast.error(result.errorMessage);
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[27rem] relative blade-top-padding-s bg-white rounded-md shadow-2xl h-auto max-h-[80vh] overflow-auto overflow-x-hidden">
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
                label="Title"
                errors={errors.title}
                placeholder="Enter title"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Description"
                errors={errors.description}
                placeholder="Enter description"
                register={register}
                registerer="description"
              />
              <TextInput
                label="CTA Text"
                errors={errors.ctaText}
                placeholder="Enter CTA text"
                register={register}
                registerer="ctaText"
              />
              <TextInput
                label="CTA Link"
                errors={errors.ctaLink}
                placeholder="Enter CTA link"
                register={register}
                registerer="ctaLink"
              />
              <ImagePicker
                label="Background Image (Desktop)"
                errors={errors.backgroundImageDesktop}
                register={register}
                registerer="backgroundImageDesktop"
                watcher={watch("backgroundImageDesktop")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
              <ImagePicker
                label="Background Image (Mobile)"
                errors={errors.backgroundImageMobile}
                register={register}
                registerer="backgroundImageMobile"
                watcher={watch("backgroundImageMobile")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
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

function BannerCard({ data }: { data: BannerDataType }) {
  const {
    backgroundImageDesktop,
    backgroundImageMobile,
    title,
    description,
    ctaText,
    ctaLink,
  } = data;

  return (
    <article className="h-full border border-gray p-4 rounded-md mt-6 w-fit">
      <div className="flex gap-10">
        <div className="rounded-md overflow-hidden relative w-lg border border-gray/20">
          {backgroundImageDesktop && (
            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageDesktop}`}
              alt="Desktop background"
            />
          )}
        </div>

        <div className="w-40 rounded-md overflow-hidden border border-gray/20">
          {backgroundImageMobile && (
            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageMobile}`}
              alt="Mobile background"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <h6 className="text-base">
          <b>Title:</b> {title || "N/A"}
        </h6>
        <h6 className="mt-1 text-base">
          <b>Description:</b> {description || "N/A"}
        </h6>
        <h6 className="mt-1 text-base">
          <b>CTA Text:</b> {ctaText || "N/A"}
        </h6>
        <h6 className="mt-1 text-base">
          <b>CTA Link:</b> {ctaLink || "N/A"}
        </h6>
      </div>
    </article>
  );
}
