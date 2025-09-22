import React, { useState } from "react";
import MDEditor, { ICommand, commands } from "@uiw/react-md-editor";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "../../components/button";
import ImagePicker from "../../components/input/imagePicker";
import { z } from "zod";
import { fileSchema, generalSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, X } from "lucide-react";
import { uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";
import Tooltip from "../../components/input/tooltip";

const ImageSchema = z.object({
  blogImage: fileSchema,
});
type ImageFormValues = z.infer<typeof ImageSchema>;

interface MarkdownEditorProps {
  value: string;
  setValue: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, setValue }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleClosePopup = () => {
    setIsModalOpen(false);
    setUrl("");
  };
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ImageFormValues>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      blogImage: "",
    },
  });

  // Handle Image Upload
  const handleImageUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("imageUrl", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/markdown/imageurl/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = `${
        process.env.REACT_APP_LOCAL_URL
      }/${response.data.message.imageUrl.replace(/\\/g, "/")}`;
      setUrl(`\n\n![Image](${imageUrl})\n\n`);
      setImagePreview(imageUrl);
      setSelectedFile(null);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const submitHandler: SubmitHandler<ImageFormValues> = async (data) => {
    // if (!data.blogImage || data.blogImage.length === 0) {
    //   setError("blogImage", { message: "Please select an image file." });
    //   return;
    // }
    try {
      setIsLoading(true);

      // Determine Desktop Image URL: reuse existing string or upload new file
      let imageUrl: string | null = null;
      const imageValue = data.blogImage as unknown;
      if (typeof imageValue === "string" && imageValue.trim().length > 0) {
        imageUrl = imageValue;
      } else if (imageValue instanceof FileList && imageValue.length > 0) {
        const imageFile = imageValue[0] as File;
        const mageResult = await uploadImage(
          imageFile,
          session,
          `banner-desktop-${Date.now()}`
        );
        if (!mageResult.success) {
          toast.error(
            `Desktop image upload failed: ${mageResult.errorMessage}`
          );
          return;
        }
        imageUrl = mageResult.data.url;

        const markdownUrl = `${process.env.NEXT_PUBLIC_HOST_URL}${imageUrl}`;

        setUrl(`\n\n![Image](${markdownUrl})\n\n`);
        setImagePreview(markdownUrl);
        setSelectedFile(null);
      } else {
        setError("blogImage", {
          type: "manual",
          message: "Image is required",
        });
        return;
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  // Define Custom Image Button
  const customImageCommand: ICommand = {
    name: "custom-image",
    keyCommand: "custom-image",
    buttonProps: { "aria-label": "Insert Image" },
    icon: <span style={{ fontSize: "16px", cursor: "pointer", background:"#dbdbdb", padding:"3px", borderRadius:"4px", }}>🖼️ Upload Image</span>,
    execute: () => setIsModalOpen(true),
  };

  // Custom Toolbar with Image Button
  const customToolbar: ICommand[] = [
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.quote,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    // commands.image, // Default Image Command
    customImageCommand, // Custom Image Upload Button
  ];

  return (
    <div data-color-mode="light" className="container  ">
      <h3 className="font-lato-regular">Markdown Editor</h3>

      {/* Markdown Editor with Custom Toolbar */}
      <MDEditor
        height={800}
        className="h-full"
        value={value}
        onChange={(val: string | undefined) => setValue(val || "")}
        commands={customToolbar}
      />

      {/* Image Upload Modal */}
      {/* Image Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-[99999]">
          <div className="bg-white p-6 rounded-md text-center shadow-2xl w-[400px]">
            <h4 className="mb-8">Upload Image</h4>

            <form onSubmit={handleSubmit(submitHandler)}>
              {/* File Input with Tooltip */}
              <div className="relative mb-4 text-left">
                <div className="flex justify-between mb-2">
                  <label className="block  font-medium ">Image</label>
                  <Tooltip text="Extensions: /.png/.jpg/.jpeg/.webp <br/> Image size - 1024x700." />
                </div>
                <label
                  htmlFor="fileInput"
                  className="flex px-2 items-center w-full h-11  text-gray-900 border border-gray rounded-md cursor-pointer "
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept=".png, .jpg, .jpeg, .webp"
                    {...register("blogImage")}
                    className="    "
                  />
                </label>

                {errors.blogImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.blogImage.message}
                  </p>
                )}
              </div>

              {/* Preview */}
              {imagePreview && (
                <img
                  src={`${imagePreview}`}
                  alt="Preview"
                  className="max-w-[100px] mx-auto mt-4 rounded-md "
                />
              )}

              {url && (
                <div className="border border-gray/30  rounded-md flex items-center p-2 mt-4">
                  <h6 className="text-sm truncate  break-all">{url}</h6>
                  <button type="button" className="ml-2 cursor-pointer hover:text-pink" onClick={() => {navigator.clipboard.writeText(url); toast.success("Copied to clipboard")}}>
                    <Copy />
                  </button>
                </div>
              )}

              <h6 className="text-xs mt-4 text-black/60 font-medium max-w-xs mx-auto">
                NOTE: Copy the URL and place it where you want to add the image.
              </h6>

              {/* Buttons */}
              <div className="flex justify-center gap-12 mt-8">
                <Button
                  theme="transparentGray"
                  text="Exit"
                  size="base"
                  type="button"
                  onClick={() => {
                    handleClosePopup();
                    setImagePreview("");
                  }}
                />
                <Button
                  theme="pink"
                  text="Upload"
                  size="base"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading || imagePreview !== ""}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
