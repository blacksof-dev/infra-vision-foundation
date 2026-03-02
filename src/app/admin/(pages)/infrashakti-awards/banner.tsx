"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { Info, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import MessageInput from "../../components/input/textareaInput";

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

  const fetch = useCallback(async () => {
    try {
      const data = await getData(ENDPOINT, session);
      if (data) {
        setFormState((val) => ({ ...val, initialValue: data }));
      }
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  }, [session]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="InfraShakti Banner"
          description=""
          ctaText="Update Banner"
          cta={true}
          handleClick={() =>
            setFormState((val) => ({ ...val, isFormOpen: true }))
          }
        />
        <div className="mt-10">
          <BannerCard data={formState.initialValue} />
        </div>
      </section>

      {formState.isFormOpen && (
        <BannerForm
          initalData={formState.initialValue}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
          onSuccess={() => {
            fetch();
            setFormState((val) => ({ ...val, isFormOpen: false }));
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
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(infrashaktiBannerSchema),
    defaultValues: initalData as any,
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
          `infrashakti-banner-desktop-${Date.now()}`,
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
          `infrashakti-banner-mobile-${Date.now()}`,
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
        toast.success("Banner updated successfully");
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update InfraShakti Banner
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Main Title*"
              errors={errors.title}
              placeholder="e.g. InfraShakti Awards"
              register={register}
              registerer="title"
            />
            <TextInput
              label="CTA Text*"
              errors={errors.ctaText}
              placeholder="e.g. Nominate Now"
              register={register}
              registerer="ctaText"
            />
          </div>

          <TextInput
            label="CTA Link*"
            errors={errors.ctaLink}
            placeholder="https://..."
            register={register}
            registerer="ctaLink"
          />

          <MessageInput
            label="Sub-description*"
            errors={errors.description}
            placeholder="Enter a brief description..."
            register={register}
            registerer="description"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <ImagePicker
              label="Desktop Background (1920x1024)*"
              errors={errors.backgroundImageDesktop}
              register={register}
              registerer="backgroundImageDesktop"
              watcher={watch("backgroundImageDesktop")}
              accept=".png, .jpg, .jpeg, .webp"
            />

            <ImagePicker
              label="Mobile Background (393x564)*"
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
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-6xl">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Visual Previews */}
          <div className="lg:w-2/3 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
                Desktop Layout
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
            {/* Desktop Dimension Hint */}
            <div className="mt-4 bg-pink/5 rounded-xl border border-pink/10 flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-pink" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink uppercase tracking-widest leading-none mb-1">
                  Recommended Dimensions
                </p>
                <p className="text-xs font-semibold text-gray-700 leading-none">
                  1920 x 1024{" "}
                  <span className="text-gray-400 font-normal ml-1">
                    (Landscape)
                  </span>
                </p>
              </div>
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
            {/* Mobile Dimension Hint */}
            <div className="mt-4 bg-pink/5 rounded-xl border border-pink/10 flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-pink" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink uppercase tracking-widest leading-none mb-1">
                  Recommended Dimensions
                </p>
                <p className="text-xs font-semibold text-gray-700 leading-none">
                  390 x 690{" "}
                  <span className="text-gray-400 font-normal ml-1">
                    (Portrait)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Textual Content */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Title
              </p>
              <h3
                className="text-2xl font-normal text-gray-900 leading-tight font-poppin"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Description
              </p>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                CTA Button
              </p>
              <p className="text-gray-900 font-medium">{ctaText}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                CTA Link
              </p>
              <p className="text-pink hover:underline break-all truncate">
                {ctaLink}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
