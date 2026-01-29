"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, Info, Trash2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import MessageInput from "../../components/input/textareaInput";

// Constants
const SECTION_KEY = "about-us-banner";
const MAX_IMAGES = 5;

// Types
interface BannerData {
  title: string;
  description: string;
  images: string[];
}

interface ApiResponse {
  id?: string;
  sectionKey: string;
  data: BannerData;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface FormStateType {
  isFormOpen: boolean;
  isLoading: boolean;
  initialValue: BannerData | null;
  error: string | null;
}

// Main Banner Component
export default function AboutUsBanner() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    isLoading: true,
    initialValue: null,
    error: null,
  });

  useEffect(() => {
    async function fetchBannerData() {
      try {
        setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
        const data = await getData(`/content/${SECTION_KEY}`, session);

        // API returns data directly: { title, description, images }
        if (data) {
          setFormState((prev) => ({
            ...prev,
            initialValue: {
              title: data.title || "",
              description: data.description || "",
              images: data.images || [],
            },
            isLoading: false,
          }));
        } else {
          setFormState((prev) => ({
            ...prev,
            initialValue: {
              title: "",
              description: "",
              images: [],
            },
            isLoading: false,
          }));
        }
      } catch (error: any) {
        console.error("Error fetching banner data:", error);
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load banner data. Please try again.",
        }));
      }
    }

    if (session?.accessToken) {
      fetchBannerData();
    }
  }, [session]);

  const handleOpenForm = () => {
    setFormState((prev) => ({ ...prev, isFormOpen: true }));
  };

  const handleCloseForm = () => {
    setFormState((prev) => ({ ...prev, isFormOpen: false }));
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  if (formState.isLoading) {
    return (
      <section className="blade-top-margin pb-10">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading banner data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (formState.error) {
    return (
      <section className="blade-top-margin pb-10">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 font-medium">{formState.error}</p>
            <Button
              text="Try Again"
              theme="pink"
              size="small"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Banner "
          // description="Manage the about us page banner with title, description, and multiple images (up to 5)."
          ctaText="Update Banner"
          cta={true}
          handleClick={handleOpenForm}
        />

        <div className="mt-10">
          {formState.initialValue && (
            <BannerCard data={formState.initialValue} />
          )}
        </div>

        {/* Instructions Note */}
        <div className="mt-10 p-6 bg-pink/5 rounded-2xl border border-pink/10 flex items-start gap-4 max-w-4xl">
          <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-pink" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-1">
              Image Guidelines
            </h5>
            <ul className="text-sm text-gray-600 leading-relaxed space-y-1">
              <li>
                • You can add up to{" "}
                <span className="text-pink font-semibold">5 images</span> in the
                banner carousel
              </li>
              <li>
                • Recommended image size:{" "}
                <span className="font-medium">1920x1080px</span>
              </li>
              <li>• Supported formats: PNG, JPG, JPEG, WebP</li>
              <li>• Each image can be individually added or removed</li>
            </ul>
          </div>
        </div>
      </section>

      {formState.isFormOpen && formState.initialValue && (
        <BannerForm
          initialData={formState.initialValue}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}

// Zod Schema for Banner Form
const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z
    .array(
      z.object({
        url: z.any(), // Can be string (existing URL) or FileList (new upload)
      }),
    )
    .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} images allowed`),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

function BannerForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: BannerData;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Transform initial images array to form format
  const getInitialImages = () => {
    if (initialData.images && initialData.images.length > 0) {
      return initialData.images.map((url) => ({ url }));
    }
    return [];
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      images: getInitialImages(),
    },
  });

  // Field array for dynamic images
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const canAddMoreImages = fields.length < MAX_IMAGES;

  const submitHandler: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Process all images
      const processedImages: string[] = [];

      for (const img of data.images) {
        const imageValue = img.url;

        // If it's an existing URL string
        if (typeof imageValue === "string" && imageValue.trim().length > 0) {
          processedImages.push(imageValue);
        }
        // If it's a new file upload
        else if (imageValue instanceof FileList && imageValue.length > 0) {
          const result = await uploadImage(
            imageValue[0],
            session,
            `about-banner-${Date.now()}-${processedImages.length}`,
          );
          if (!result.success) {
            toast.error(`Image upload failed: ${result.errorMessage}`);
            setIsLoading(false);
            return;
          }
          processedImages.push(result.data.url);
        }
      }

      const bannerData: BannerData = {
        title: data.title,
        description: data.description,
        images: processedImages,
      };

      // Update content (PATCH)
      const result = await updateContent(
        `/content/${SECTION_KEY}`,
        session,
        bannerData,
      );

      if (result.success) {
        toast.success("Banner updated successfully");
        onClose();
        onSuccess();
      } else {
        toast.error(result.errorMessage || "Update failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-poppin">
              Update About Us Banner
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {fields.length}/{MAX_IMAGES} images added
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-8 space-y-6"
        >
          {/* Title */}
          <TextInput
            label="Banner Title*"
            errors={errors.title}
            placeholder="e.g. About InfraVision Foundation"
            register={register}
            registerer="title"
            // tooltip="Enter a compelling title for the banner"
          />
          
          <MessageInput
          label="Description*"
          errors={errors.description}
          placeholder="Enter the banner description..."
          register={register}
          registerer="description"
          />
          {/* Description */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter the banner description..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink/20 focus:border-pink transition-all resize-none ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div> */}

          {/* Images Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Banner Images
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Add up to {MAX_IMAGES} images for the banner carousel
                </p>
              </div>
              {canAddMoreImages && (
                <Button
                  type="button"
                  text="Add Image"
                  theme="transparentPink"
                  size="small"
                  onClick={() => append({ url: "" })}
                  className="flex items-center gap-2"
                />
              )}
            </div>

            {/* Images Grid */}
            {fields.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No images added yet</p>
                <Button
                  type="button"
                  text="Add Your First Image"
                  theme="pink"
                  size="small"
                  onClick={() => append({ url: "" })}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-pink/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-pink">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <ImagePicker
                        label={`Image ${index + 1}`}
                        errors={errors.images?.[index]?.url}
                        register={register}
                        registerer={`images.${index}.url`}
                        watcher={watch(`images.${index}.url`)}
                        accept=".png, .jpg, .jpeg, .webp"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6"
                      title="Remove image"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Image limit message */}
            {!canAddMoreImages && (
              <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 px-4 py-2 rounded-lg">
                <Info className="w-4 h-4" />
                <span>Maximum {MAX_IMAGES} images reached</span>
              </div>
            )}

            {/* Form-level images error */}
            {errors.images && typeof errors.images.message === "string" && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
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
              text={isLoading ? "Saving..." : "Update Banner"}
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

// Banner Card Component - Preview
function BannerCard({ data }: { data: BannerData }) {
  const { title, description, images } = data;

  // Filter out empty image URLs
  const validImages =
    images?.filter((url) => url && url.trim().length > 0) || [];

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-6xl">
      <div className="p-8">
        {/* Images Preview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold text-pink uppercase tracking-widest bg-pink/5 px-2 py-1 rounded">
              Banner Images ({validImages.length})
            </span>
          </div>

          {validImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {validImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 group/image"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${imageUrl}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                    alt={`Banner Image ${index + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          Failed to load
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-400">No images uploaded</p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Title
              </p>
              <h3 className="text-2xl font-normal text-gray-900 leading-tight font-poppin">
                {title || (
                  <span className="text-gray-400 italic">No title set</span>
                )}
              </h3>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Description
              </p>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {description || (
                  <span className="text-gray-400 italic">
                    No description set
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
