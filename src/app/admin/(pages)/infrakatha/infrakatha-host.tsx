import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import Link from "next/link";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import z from "zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import ImagePicker from "../../components/input/imagePicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ConfirmationPopup from "../../components/confirmationPopup";

const FormSchema = z.object({
  name: z
    .string()
    .max(100, "Name should not exceed 100 characters")
    .min(1, "Name is required"),
  designation: z
    .string()
    .max(150, "Should not exceed 150 characters")
    .min(1, "Required"),
  socialUrl: z.string().max(500, "URL is too long").optional(),
  socialType: z.enum(["linkedin", "X"]),
  type: z.enum([
    "infrashakti-the-esteemed-jury",
    "infrashakti-guests-of-honour",
    "infrashakti-pre-eminent leaders",
    "Infrakath-hosts",
    "Infrapandit-award-jury",
  ]),
  active: z.boolean(),
  image: z.union([
    z.string().min(1, "Image is required"),
    z.any().refine((file) => file?.length > 0, "Image is required"),
  ]),
});

type FormData = z.infer<typeof FormSchema>;

interface Response extends FormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const KEY = "Infrakath-hosts";

export default function InfrakathaHost() {
  const [hostData, setHostData] = useState<Response[]>([]);
  const [editHostData, setEditHostData] = useState<Response | null>(null);
  const [deleteId, setDeletingId] = useState<string | null>(null);
  const [newHost, setNewHost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const fetchHost = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/members?type=${KEY}`
      );
      const data = (await res.json()) as Response[];
      setHostData(data);
    } catch (error) {
      console.error("Error fetching hosts:", error);
      toast.error("Failed to fetch hosts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setEditHostData(null);
    setNewHost(false);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST_URL}/members/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      toast.success("Host deleted successfully");
      fetchHost();
      setDeletingId(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete host");
    }
  };
  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/members/${id}/toggle-status`,
        null,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      fetchHost();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle host");
    }
  };
  useEffect(() => {
    fetchHost();
  }, []);

  return (
    <>
      {(editHostData || newHost) && (
        <HostForm
          onClose={handleClose}
          editingData={editHostData}
          onSuccess={fetchHost}
        />
      )}
      {deleteId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => handleDelete(deleteId)}
        />
      )}
      <section>
        <div className="blade-top-margin">
          <SectionHeading
            heading="Section - 02 (About Infrakatha - The Host)"
            ctaText="Add New Host"
            cta={true}
            handleClick={() => {
              setEditHostData(null);
              setNewHost(true);
            }}
          />
        </div>

        {isLoading ? (
          <div className="mt-6 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xlg:grid-cols-4 2xl:grid-cols-5 gap-10 mt-6">
            {hostData.map((host) => (
              <div
                key={host.id}
                className="border flex flex-col font-poppin border-gray-200 rounded-md pb-4 "
              >
                <div className="flex-1 mb-4">
                  <img
                    className="rounded-md overflow-hidden w-full h-65 object-cover"
                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${host.image}`}
                    alt={host.name}
                  />
                  <div className="mt-4 px-4">
                    <h4 className="text-base text-gray-950">{host.name}</h4>
                    <p className="text-sm text-gray-700">{host.designation}</p>
                    {host.socialUrl && (
                      <Link
                        href={host.socialUrl}
                        target="_blank"
                        className="underline text-pink mt-2 inline-block"
                      >
                        {host.socialType}
                      </Link>
                    )}
                    <div className="pt-2 mt-auto">
                      <p className="text-xs text-gray-600 bg-gray-100 p-1 rounded-sm">
                        Created At:{" "}
                        {new Date(host.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-auto pt-4 justify-end items-center mx-4 border-t border-t-gray-200">
                  <ToggleSwitch
                    checked={host.active}
                    onChange={() => {
                      handleToggle(host.id);
                    }}
                  />
                  <Button
                    theme="transparentGray"
                    size="small"
                    text="Delete"
                    onClick={() => setDeletingId(host.id)}
                  />
                  <Button
                    theme="pink"
                    size="small"
                    text="Edit"
                    onClick={() => setEditHostData(host)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

const HostForm = ({
  onClose,
  editingData: initialData,
  onSuccess,
}: {
  onClose: () => void;
  editingData: Response | null;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      active: true,
      socialType: "linkedin",
      type: KEY as any,
    },
  });

  const submitHandler = async (data: FormData) => {
    console.log(session?.accessToken);
    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof FileList) {
          formData.append(key, value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Ensure type is set
      formData.set("type", KEY);

      if (initialData?.id) {
        // Update existing host
        await axios.patch(
          `${process.env.NEXT_PUBLIC_HOST_URL}/members/${initialData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        toast.success("Host updated successfully");
      } else {
        // Create new host
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_URL}/members`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        toast.success("New Host created successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[32rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto overflow-x-hidden">
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
          <div className="flex flex-col gap-y-6 h-full p-8 pt-1">
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                label="Host Name"
                errors={errors.name}
                placeholder="Enter host name"
                register={register}
                registerer="name"
              />
              <TextInput
                label="Designation"
                errors={errors.designation}
                placeholder="Enter designation"
                register={register}
                registerer="designation"
              />

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-medium mb-2 block">
                    Social media platform
                  </label>
                  <Select
                    value={watch("socialType") || "linkedin"}
                    onValueChange={(val: "linkedin" | "X") =>
                      setValue("socialType", val, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="X">X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <TextInput
                    label="Social media link"
                    errors={errors.socialUrl}
                    placeholder="https://..."
                    register={register}
                    registerer="socialUrl"
                  />
                </div>
              </div>

              <ImagePicker
                label="Image"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="font-medium text-sm">Active</label>
              <ToggleSwitch
                checked={watch("active") ?? true}
                onChange={(val: boolean) =>
                  setValue("active", val, { shouldValidate: true })
                }
              />
            </div>

            <div className="mt-auto">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text={initialData ? "Update" : "Create"}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
