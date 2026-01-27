"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, Info, ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";

interface GetInvolvedDefaultValueType {
  label: string;
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

export default function GetInvolved() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    intialValue: {
      label: "",
      heading: "",
      description: "",
      ctaText: "",
      ctaLink: "",
      backgroundImageDesktop: "",
      backgroundImageMobile: "",
    },
  });

  const loadContent = useCallback(async () => {
    try {
      const data = await getData("/content/get-involved", session);
      if (data) {
        setFormState((val) => ({ ...val, intialValue: data }));
      }
    } catch (error) {
      console.error("Error fetching Get Involved content:", error);
    }
  }, [session]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Get Involved Section"
          // description="Update the call-to-action content and background images."
          ctaText="Update Section"
          cta={true}
          handleClick={() =>
            setFormState((val) => ({ ...val, isFormOpen: true }))
          }
        />

        <div className="mt-10">
          <GetInvolvedCard data={formState.intialValue} />
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
                    <ul className="list-disc list-outside pl-4">
                      <li className="text-sm text-gray-600 leading-relaxed">
                        To make text appear <span className="font-bold">bold</span>,
                        wrap it in double asterisks: <br />
                        <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block">
                          **your bold text here**
                        </code>
                      </li>
                      
                    </ul>
                  </div>
                </div>
      </section>

      {formState.isFormOpen && (
        <GetInvolvedForm
          initalData={formState.intialValue}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
          onSuccess={() => {
            loadContent();
            setFormState((val) => ({ ...val, isFormOpen: false }));
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

const getInvolvedSchema = z.object({
  label: z.string().min(1, "Label is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  ctaText: z.string().min(1, "CTA text is required"),
  ctaLink: z.string().min(1, "CTA link is required"),
  backgroundImageDesktop: z.any(),
  backgroundImageMobile: z.any(),
});

type GetInvolvedFormValues = z.infer<typeof getInvolvedSchema>;

function GetInvolvedForm({
  initalData,
  onClose,
  onSuccess,
}: {
  initalData: GetInvolvedDefaultValueType;
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
  } = useForm<GetInvolvedFormValues>({
    resolver: zodResolver(getInvolvedSchema),
    defaultValues: initalData as any,
  });

  const submitHandler: SubmitHandler<GetInvolvedFormValues> = async (data) => {
    try {
      setIsLoading(true);

      let desktopImageUrl = initalData.backgroundImageDesktop;
      const desktopValue = data.backgroundImageDesktop;
      if (desktopValue instanceof FileList && desktopValue.length > 0) {
        const result = await uploadImage(
          desktopValue[0],
          session,
          `get-involved-desktop-${Date.now()}`
        );
        if (result.success) desktopImageUrl = result.data.url;
      }

      let mobileImageUrl = initalData.backgroundImageMobile;
      const mobileValue = data.backgroundImageMobile;
      if (mobileValue instanceof FileList && mobileValue.length > 0) {
        const result = await uploadImage(
          mobileValue[0],
          session,
          `get-involved-mobile-${Date.now()}`
        );
        if (result.success) mobileImageUrl = result.data.url;
      }

      const result = await updateContent("/content/get-involved", session, {
        label: data.label,
        heading: data.heading,
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
            Update Get Involved Section
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
              label="Tag Label*"
              errors={errors.label}
              placeholder="e.g. GET INVOLVED"
              register={register}
              registerer="label"
            />
            <TextInput
              label="Main Heading*"
              errors={errors.heading}
              placeholder="Enter section heading"
              register={register}
              registerer="heading"
            />
          </div>

          <TextInput
            label="Description*"
            errors={errors.description}
            placeholder="Enter description..."
            register={register}
            registerer="description"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="CTA Text*"
              errors={errors.ctaText}
              placeholder="e.g. JOIN THE MOVEMENT"
              register={register}
              registerer="ctaText"
            />
            <TextInput
              label="CTA Link*"
              errors={errors.ctaLink}
              placeholder="e.g. /join-us"
              register={register}
              registerer="ctaLink"
            />
          </div>

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
              text="Update Section"
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

function GetInvolvedCard({ data }: { data: GetInvolvedDefaultValueType }) {
  const {
    backgroundImageDesktop,
    backgroundImageMobile,
    label,
    heading,
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
                Desktop Preview
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
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Desktop Image
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
                Mobile Preview
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
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Mobile Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Textual Content */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Tag Label
                </p>
                <span className="inline-block px-3 py-1 bg-pink/5 text-pink text-[10px] font-bold uppercase tracking-widest rounded">
                  {label || "No Label"}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Heading
                </p>
                <h3
                  className="text-2xl   text-gray-900 leading-tight font-poppin"
                  // dangerouslySetInnerHTML={{ __html: heading }}
                    dangerouslySetInnerHTML={{
                __html:
                  heading?.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ) || "No Description Provided",
              }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Description
                </p>
                <p className="text-gray-600 leading-relaxed text-sm max-w-xl"
                  dangerouslySetInnerHTML={{
                __html:
                  description?.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ) || "No Description Provided",
              }}
                />
                 

                 
              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    CTA Button
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {ctaText || "Not Set"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    CTA Link
                  </p>
                  <p className="text-sm font-semibold text-pink flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {ctaLink || "Not Set"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
