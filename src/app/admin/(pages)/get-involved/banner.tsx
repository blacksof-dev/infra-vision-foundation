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
import { X, ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";

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
    try {
      const data = await getData(
        "/content/get-involved-banner-section",
        session,
      );
      if (data) {
        setFormState((val) => ({ ...val, intialValue: data }));
      }
    } catch (e) {
      console.error("Failed to fetch banner data", e);
    }
  }

  useEffect(() => {
    fetch();
  }, [session]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Get Involved Banner Section"
          description="Update the header content and background images for the Get Involved page."
          ctaText="Update Banner"
          cta={true}
          handleClick={() =>
            setFormState((val) => ({ ...val, isFormOpen: true }))
          }
        />

        <div className="mt-10">
          <BannerCard data={formState.intialValue} />
        </div>
      </section>

      {formState.isFormOpen && (
        <GetInvolvedForm
          initalData={formState.intialValue}
          fetchData={fetch}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
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
          `banner-desktop-${Date.now()}`,
        );
        if (!desktopImageResult.success) {
          toast.error(
            `Desktop image upload failed: ${desktopImageResult.errorMessage}`,
          );
          setIsLoading(false);
          return;
        }
        desktopImageUrl = desktopImageResult.data.url;
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
          `banner-mobile-${Date.now()}`,
        );
        if (!mobileImageResult.success) {
          toast.error(
            `Mobile image upload failed: ${mobileImageResult.errorMessage}`,
          );
          setIsLoading(false);
          return;
        }
        mobileImageUrl = mobileImageResult.data.url;
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
        },
      );

      if (result.success) {
        onClose();
        fetchData();
        toast.success("Banner updated successfully");
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
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update Banner Content
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-5">
            <TextInput
              label="Banner Heading"
              errors={errors.heading}
              placeholder="e.g. Get Involved"
              register={register}
              registerer="heading"
            />
            <TextInput
              label="Description Text"
              errors={errors.description}
              placeholder="e.g. Join our community and ask questions..."
              register={register}
              registerer="description"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="CTA Button Text"
                errors={errors.ctaText}
                placeholder="e.g. Apply Now"
                register={register}
                registerer="ctaText"
              />
              <TextInput
                label="CTA Button Link"
                errors={errors.ctaLink}
                placeholder="https://..."
                register={register}
                registerer="ctaLink"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePicker
                label="Desktop Background"
                errors={errors.backgroundImageDesktop}
                register={register}
                registerer="backgroundImageDesktop"
                watcher={watch("backgroundImageDesktop")}
                accept=".png,.jpg,.jpeg,.webp"
                tooltip="Recommended: 1920x1080px"
              />
              <ImagePicker
                label="Mobile Background"
                errors={errors.backgroundImageMobile}
                register={register}
                registerer="backgroundImageMobile"
                watcher={watch("backgroundImageMobile")}
                accept=".png,.jpg,.jpeg,.webp"
                tooltip="Recommended: 800x1200px"
              />
            </div>
          </div>

          {/* Modal Footer */}
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
              text="Update Banner"
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

function BannerCard({ data }: { data: GetInvolvedDefaultValueType }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
        {/* Images Preview Section */}
        <div className="lg:col-span-3 p-6 bg-gray-50 border-r border-gray-100">
          <div className="flex flex-col gap-6 h-full">
            {/* Desktop Preview */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Desktop View
                </span>
              </div>
              <div className="aspect-video relative rounded-xl border border-gray-200 overflow-hidden shadow-inner bg-white">
                {data.backgroundImageDesktop ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${data.backgroundImageDesktop}`}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No desktop image uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Preview */}
            <div className="w-48 self-start">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Mobile View
                </span>
              </div>
              <div className="aspect-[9/16] relative rounded-xl border border-gray-200 overflow-hidden shadow-inner bg-white">
                {data.backgroundImageMobile ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${data.backgroundImageMobile}`}
                    alt="Mobile Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No mobile image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2 p-8 flex flex-col">
          <div className="mb-auto">
            <span className="inline-block px-3 py-1 bg-pink/10 text-pink text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
              Banner Content
            </span>
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
              {data.heading}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {data.description}
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  CTA Button Text
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {data.ctaText}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    CTA Button Link
                  </div>
                  <a
                    href={data.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink hover:text-pink/80 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="text-sm font-medium text-gray-700 truncate pr-4">
                  {data.ctaLink}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
