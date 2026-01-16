"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
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
  intialValue: BannerDefaultValueType;
}

export default function Banner() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    intialValue: {
      heading: "",
      description: "",
      backgroundImageDesktop: "",
      backgroundImageMobile: "",
    },
  });

  const fetch = useCallback(async () => {
    try {
      const data = await getData("/content/knowledge-banner-section", session);
      if (data) {
        setFormState((val) => ({ ...val, intialValue: data }));
      }
    } catch (e) {
      console.error("Failed to load knowledge banner data:", e);
    }
  }, [session]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Knowledge Hub Banner Section"
          description="Update the main banner content and background images for desktop and mobile."
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
        <BannerForm
          initalData={formState.intialValue}
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

const bannerSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  backgroundImageDesktop: z.any(),
  backgroundImageMobile: z.any(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

function BannerForm({
  initalData,
  onClose,
  onSuccess,
}: {
  initalData: BannerDefaultValueType;
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
    resolver: zodResolver(bannerSchema),
    defaultValues: initalData as any,
  });

  const submitHandler: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Determine Desktop Image URL
      let desktopImageUrl = initalData.backgroundImageDesktop;
      const desktopValue = data.backgroundImageDesktop;
      if (desktopValue instanceof FileList && desktopValue.length > 0) {
        const result = await uploadImage(
          desktopValue[0],
          session,
          `knowledge-banner-desktop-${Date.now()}`
        );
        if (!result.success) {
          toast.error(`Desktop upload failed: ${result.errorMessage}`);
          return;
        }
        desktopImageUrl = result.data.url;
      }

      // Determine Mobile Image URL
      let mobileImageUrl = initalData.backgroundImageMobile;
      const mobileValue = data.backgroundImageMobile;
      if (mobileValue instanceof FileList && mobileValue.length > 0) {
        const result = await uploadImage(
          mobileValue[0],
          session,
          `knowledge-banner-mobile-${Date.now()}`
        );
        if (!result.success) {
          toast.error(`Mobile upload failed: ${result.errorMessage}`);
          return;
        }
        mobileImageUrl = result.data.url;
      }

      const result = await updateContent(
        "/content/knowledge-banner-section",
        session,
        {
          heading: data.heading,
          description: data.description,
          backgroundImageDesktop: desktopImageUrl,
          backgroundImageMobile: mobileImageUrl,
        }
      );

      if (result.success) {
        toast.success("Banner updated successfully");
        onSuccess();
      } else {
        toast.error(result.errorMessage);
      }
    } catch (error) {
      console.error("Submission error:", error);
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
            Update Knowledge Hub Banner
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
            placeholder="e.g. Exploring Infrastructure Knowledge"
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
              label="Desktop Background (1920x1130)"
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
