"use client";
import React, { useCallback, useEffect, useState } from "react";
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

interface BannerDefaultValueType {
  heading: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

interface FormStateType {
  isFormOpen: boolean;
  initialValue: BannerDefaultValueType;
}

export default function Banner() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    initialValue: {
      heading: "",
      description: "",
      backgroundImageDesktop: "",
      backgroundImageMobile: "",
    },
  });

  const fetchBannerData = useCallback(async () => {
    const data = await getData("/content/archive-banner-section", session);
    setFormState((val) => {
      return { ...val, initialValue: data };
    });
    console.log(data);
  }, [session]);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Section - 01 (Banner)"
          description="Update the archive page banner content and background images."
          ctaText="Update banner"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true };
            })
          }
        />

        <div className="mt-10">
          <BannerCard data={formState.initialValue} />
        </div>
      </section>

      {formState.isFormOpen && (
        <BannerForm
          initialData={formState.initialValue}
          onUpdateSuccess={fetchBannerData}
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

const bannerSchema = z.object({
  heading: generalSchema("Heading is required"),
  description: generalSchema("Description is required"),
  backgroundImageDesktop: fileSchema,
  backgroundImageMobile: fileSchema,
});

type BannerFormValues = z.infer<typeof bannerSchema>;

function BannerForm({
  initialData,
  onClose,
  onUpdateSuccess,
}: {
  initialData: BannerDefaultValueType;
  onClose: () => void;
  onUpdateSuccess: () => Promise<void> | void;
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
    resolver: zodResolver(bannerSchema),
    defaultValues: initialData,
  });

  const submitHandler: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Determine Desktop Image URL: reuse existing string or upload new file
      let desktopImageUrl: string | null = null;
      const desktopValue = data.backgroundImageDesktop as unknown;
      if (typeof desktopValue === "string" && desktopValue.trim().length > 0) {
        desktopImageUrl = desktopValue;
      } else if (desktopValue instanceof FileList && desktopValue.length > 0) {
        const desktopImageFile = desktopValue[0] as File;
        const desktopImageResult = await uploadImage(
          desktopImageFile,
          session,
          `banner-desktop-${Date.now()}`,
        );
        if (!desktopImageResult.success) {
          toast.error(
            `Desktop image upload failed: ${desktopImageResult.errorMessage}`,
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

      // Determine Mobile Image URL: reuse existing string or upload new file
      let mobileImageUrl: string | null = null;
      const mobileValue = data.backgroundImageMobile as unknown;
      if (typeof mobileValue === "string" && mobileValue.trim().length > 0) {
        mobileImageUrl = mobileValue;
      } else if (mobileValue instanceof FileList && mobileValue.length > 0) {
        const mobileImageFile = mobileValue[0] as File;
        const mobileImageResult = await uploadImage(
          mobileImageFile,
          session,
          `banner-mobile-${Date.now()}`,
        );
        if (!mobileImageResult.success) {
          toast.error(
            `Mobile image upload failed: ${mobileImageResult.errorMessage}`,
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

      // Now update content with the correct image URLs
      const result = await updateContent(
        "/content/archive-banner-section",
        session,
        {
          heading: data.heading,
          description: data.description,
          backgroundImageDesktop: desktopImageUrl as string,
          backgroundImageMobile: mobileImageUrl as string,
        },
      );

      if (result.success) {
        toast.success("Content updated successfully");
        await Promise.resolve(onUpdateSuccess());
        onClose();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update Archive Banner
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-8 space-y-6"
        >
          <TextInput
            label="Main Heading"
            errors={errors.heading}
            placeholder="e.g. Transforming Urban Infrastructure"
            register={register}
            registerer="heading"
          />

          <TextInput
            label="Sub-description"
            errors={errors.description}
            placeholder="Enter a brief description..."
            register={register}
            registerer="description"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <ImagePicker
              label="Desktop Background (1920x1024)"
              errors={errors.backgroundImageDesktop}
              register={register}
              registerer="backgroundImageDesktop"
              watcher={watch("backgroundImageDesktop")}
              accept=".png, .jpg, .jpeg, .webp"
            />

            <ImagePicker
              label="Mobile Background (390x690)"
              errors={errors.backgroundImageMobile}
              register={register}
              registerer="backgroundImageMobile"
              watcher={watch("backgroundImageMobile")}
              accept=".png, .jpg, .jpeg, .webp"
            />
          </div>

          <div className="flex gap-4 pt-6">
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
              text="Update Content"
              theme="pink"
              size="large"
              className="flex-1"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function BannerCard({ data }: { data: BannerDefaultValueType }) {
  const {
    backgroundImageDesktop,
    backgroundImageMobile,
    heading,
    description,
  } = data;

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-6xl">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Visual Previews */}
          <div className="lg:w-2/3 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
                Desktop Layout Preview
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 aspect-[16/9]">
              {backgroundImageDesktop ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageDesktop}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  alt="Desktop Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Desktop Image
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
                Mobile Layout
              </span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 aspect-[9/16] lg:aspect-auto min-h-[300px]">
              {backgroundImageMobile ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${backgroundImageMobile}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  alt="Mobile Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Mobile Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Textual Content */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Heading
              </p>
              <h3
                className="text-2xl font-normal text-gray-900 leading-tight font-poppin"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Description
              </p>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
