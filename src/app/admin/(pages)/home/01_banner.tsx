"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
// import MessageInput from
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import MessageInput from "../../components/input/textareaInput";

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

  useEffect(() => {
    async function fetch() {
      const data = await getData("/content/home-banner-section", session);
      setFormState((val) => {
        return { ...val, intialValue: data };
      });
      console.log(data);
    }
    fetch();
  }, []);
  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Section -01 (Homepage Banner)"
          // description="Update the main banner content and background images for desktop and mobile."
          ctaText="Update Banner"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true };
            })
          }
        />

        <div className="mt-10 ">
          <BannerCard data={formState.intialValue} />
        </div>

        {/* Instructions Note */}
        <div className="mt-10 p-6 bg-pink/5 rounded-2xl border border-pink/10 flex items-start gap-4 max-w-4xl">
          <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-pink" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-1">
              Admin Pro-Tip
            </h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              To make specific words in the heading appear in{" "}
              <span className="text-pink font-semibold">pink</span>, wrap them
              in this tag: <br />
              <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block font-mono">
                &lt;span class="text-[#c82249] font-medium"&gt;independent think
                tank&lt;/span&gt;
              </code>
            </p>
          </div>
        </div>
      </section>

      {formState.isFormOpen && (
        <BannerForm
          initalData={formState.intialValue}
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
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  backgroundImageDesktop: z.any(),
  backgroundImageMobile: z.any(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

function BannerForm({
  initalData,
  onClose,
}: {
  initalData: BannerDefaultValueType;
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
          `banner-desktop-${Date.now()}`,
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
          `banner-mobile-${Date.now()}`,
        );
        if (!result.success) {
          toast.error(`Mobile upload failed: ${result.errorMessage}`);
          return;
        }
        mobileImageUrl = result.data.url;
      }

      const result = await updateContent(
        "/content/home-banner-section",
        session,
        {
          heading: data.heading,
          description: data.description,
          backgroundImageDesktop: desktopImageUrl,
          backgroundImageMobile: mobileImageUrl,
        },
      );

      if (result.success) {
        toast.success("Banner updated successfully");
        onClose();
        window.location.reload(); // Refresh to show latest
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
            Update Hero Banner
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-8 space-y-6"
        >
          <MessageInput
            label="Main Heading*"
            errors={errors.heading}
            placeholder="e.g. Transforming Urban Infrastructure"
            register={register}
            registerer="heading"
            // tooltip="You can use <span class='text-[#c82249]'>...</span> for pink text"
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
              label="Desktop Background* (1920x1024)"
              errors={errors.backgroundImageDesktop}
              register={register}
              registerer="backgroundImageDesktop"
              watcher={watch("backgroundImageDesktop")}
              accept=".png, .jpg, .jpeg, .webp"
            />

            <ImagePicker
              label="Mobile Background* (390x690)"
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
