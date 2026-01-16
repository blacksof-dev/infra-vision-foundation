"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import MessageInput from "../../components/input/textareaInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../components/input/imagePicker";
import { Button } from "../../components/button";
import { X, ExternalLink, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { ToggleSwitch } from "../../components/toggleSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import ConfirmationPopup from "../../components/confirmationPopup";
import { fileSchema } from "../../lib/zod";

type TeamMember = {
  id: string;
  image: string;
  title: string;
  desig: string;
  popupImg?: string;
  link?: string;
  socialMedia?: string;
  popupdesc?: string;
  order: number;
  active: boolean;
};

type TeamResponse = {
  team: TeamMember[];
  lastUpdated?: string;
};

export default function Teams() {
  const { data: session } = useSession();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadTeam = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = (await getData(`/teams/team`, session)) as TeamResponse;
      setItems(data.team ?? []);
    } catch (e) {
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  // const handleToggle = async (id: string) => {
  //   try {
  //     await axios.put(
  //       `${process.env.NEXT_PUBLIC_HOST_URL}/teams/team/${id}`,
  //       { active: !items.find((i) => i.id === id)?.active },
  //       {
  //         headers: { Authorization: `Bearer ${session?.accessToken}` },
  //       }
  //     );
  //     toast.success("Status updated");
  //     loadTeam();
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Failed to toggle status");
  //   }
  // };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/teams/team/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      toast.success("Member deleted successfully");
      setDeletingId(null);
      loadTeam();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete member");
    }
  };

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Team"
          // description="Manage the profile, social links, and display order of your team members."
          ctaText="Add Team Member"
          cta={true}
          handleClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />

        {isLoading ? (
          <div className="mt-10 text-center py-20 bg-white/50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading team...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No team members found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            {items.map((item) => (
              <TeamMemberCard
                key={item.id}
                item={item}
                onEdit={() => {
                  setEditingItem(item);
                  setIsFormOpen(true);
                }}
                onDelete={() => setDeletingId(item.id)}
                // onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        )}

        {/* Instructions Note */}
        <div className="mt-10 p-6 bg-pink/5 rounded-2xl border border-pink/10 flex items-start gap-4 max-w-4xl">
          <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-pink" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-1">
              Admin Pro-Tip -{" "}
              <span className="font-medium text-gray-400">
                Only applicable for popup description
              </span>
            </h5>
            <ul className="list-disc list-outside pl-4">
              <li className="text-sm text-gray-600 leading-relaxed">
                To make text appear <span className="font-bold">bold</span>,
                wrap it in double asterisks: <br />
                <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block">
                  **your bold text here**
                </code>
              </li>
              <li className="text-sm text-gray-600 leading-relaxed mt-2">
                Use{" "}
                <code className="bg-white px-2 py-1 rounded border border-pink/20 text-xs mt-2 inline-block">
                  &lt;br class="block" /&gt;
                </code>{" "}
                for line break
              </li>
            </ul>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <TeamForm
          initialData={editingItem}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            loadTeam();
            setIsFormOpen(false);
            setEditingItem(null);
          }}
        />
      )}

      {deletingId && (
        <ConfirmationPopup
          onClose={() => setDeletingId(null)}
          onDelete={() => handleDelete(deletingId)}
        />
      )}
    </>
  );
}

function TeamMemberCard({
  item,
  onEdit,
  onDelete,
}: // onToggle,
{
  item: TeamMember;
  onEdit: () => void;
  onDelete: () => void;
  // onToggle: () => void;
}) {
  return (
    <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.image}`}
          alt={item.title}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className="bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-bold">
            Order: {item.order}
          </span>
        </div>

        {item.popupImg && (
          <div className="absolute bottom-2 right-2 w-16 h-16 bg-white backdrop-blur-sm rounded-lg p-0.5 shadow-md border border-gray-100 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.popupImg}`}
              alt="Popup"
              className="w-full h-full object-cover rounded-[6px]"
            />
            <div className="absolute inset-0  pointer-events-none"></div>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h4 className="text-lg font-bold text-gray-900 leading-tight">
            {item.title}
          </h4>
          <p className="text-pink text-xs font-semibold uppercase tracking-wide mt-1">
            {item.desig}
          </p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-1">
          {item.popupdesc}
        </p>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {item.socialMedia || "Profile"}
          </a>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end">
          {/* <div className="flex items-center gap-2">
            <ToggleSwitch checked={item.active} onChange={onToggle} />
            <span className="text-[10px] uppercase font-bold text-gray-400">
              {item.active ? "Active" : "Inactive"}
            </span>
          </div> */}
          <div className="flex gap-2">
            <Button
              theme="transparentGray"
              size="small"
              text="Delete"
              onClick={onDelete}
            />
            <Button theme="pink" size="small" text="Edit" onClick={onEdit} />
          </div>
        </div>
      </div>
    </article>
  );
}

const teamSchema = z.object({
  title: z.string().min(1, "Name is required"),
  desig: z.string().min(1, "Designation is required"),
  popupdesc: z.string().min(1, "Popup description is required"),
  link: z.string().optional().or(z.literal("")),
  socialMedia: z.string().optional().or(z.literal("")),
  order: z.coerce.number(),
  active: z.boolean(),
  image: z.union([
    z.string().min(1, "image is required"),
    z.any().refine((file) => file?.length > 0, "image is required"),
  ]),
  popupImg: z.union([z.string(), z.any()]).optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

function TeamForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: TeamMember | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          desig: initialData.desig,
          popupdesc: initialData.popupdesc,
          link: initialData.link || "",
          socialMedia: initialData.socialMedia || "",
          order: initialData.order,
          active: initialData.active,
          image: initialData.image,
          popupImg: initialData.popupImg,
        }
      : {
          title: "",
          desig: "",
          popupdesc: "",
          active: true,
          order: 0,
          image: undefined,
          popupImg: undefined,
        },
  });

  const onSubmit: SubmitHandler<TeamFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("desig", data.desig);
      formData.append("popupdesc", data.popupdesc);
      formData.append("order", String(data.order));
      formData.append("active", String(data.active));

      if (data.link) formData.append("link", data.link);
      if (data.socialMedia) formData.append("socialMedia", data.socialMedia);

      // Handle main image
      const imageVal = data.image as any;
      if (imageVal instanceof FileList && imageVal.length > 0) {
        formData.append("image", imageVal[0]);
      } else if (!initialData) {
        setError("image", { type: "manual", message: "Image is required" });
        setIsSubmitting(false);
        return;
      }

      // Handle popup image
      const popupImgVal = data.popupImg as any;
      if (popupImgVal instanceof FileList && popupImgVal.length > 0) {
        formData.append("popupImg", popupImgVal[0]);
      }

      const method = initialData ? "put" : "post";
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_HOST_URL}/teams/team/${initialData.id}`
        : `${process.env.NEXT_PUBLIC_HOST_URL}/teams/team`;

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      toast.success(initialData ? "Member updated" : "Member created");
      onSuccess();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[40rem] relative bg-white rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Team Member" : "Create New Team Member"}
          </h3>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          className="overflow-y-auto flex-1 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Full Name"
                errors={errors.title}
                placeholder="e.g. John Doe"
                register={register}
                registerer="title"
              />
              <TextInput
                label="Designation"
                errors={errors.desig}
                placeholder="e.g. CEO & Founder"
                register={register}
                registerer="desig"
              />
            </div>

            <MessageInput
              label="Popup Bio Description"
              errors={errors.popupdesc}
              placeholder="Tell something about this member..."
              register={register}
              registerer="popupdesc"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Social/Profile Link"
                errors={errors.link}
                placeholder="https://linkedin.com/in/..."
                register={register}
                registerer="link"
              />
              <div>
                <label className="font-semibold text-sm mb-2 block text-gray-700">
                  Platform Name
                </label>
                <Select
                  value={watch("socialMedia") || ""}
                  onValueChange={(val: string) => setValue("socialMedia", val)}
                >
                  <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-pink focus:border-pink bg-white">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-100 shadow-xl rounded-xl z-[150]">
                    <SelectItem
                      value="linkedin"
                      className="focus:bg-pink/5 focus:text-pink"
                    >
                      LinkedIn
                    </SelectItem>
                    <SelectItem
                      value="x"
                      className="focus:bg-pink/5 focus:text-pink"
                    >
                      X (Twitter)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.socialMedia && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.socialMedia.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Display Order"
                errors={errors.order}
                placeholder="0"
                register={register}
                registerer="order"
              />
              <div className="flex items-center gap-3 py-2">
                <label className="font-medium text-sm text-gray-700">
                  Active Status
                </label>
                <ToggleSwitch
                  checked={watch("active")}
                  onChange={(val: boolean) => setValue("active", val)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImagePicker
                label="Profile Photo"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".png, .jpg, .jpeg, .webp"
              />
              <ImagePicker
                label="Popup Secondary Photo"
                errors={errors.popupImg}
                register={register}
                registerer="popupImg"
                watcher={watch("popupImg")}
                accept=".png, .jpg, .jpeg, .webp"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              theme="transparentGray"
              size="large"
              className="flex-1"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              type="submit"
              theme="pink"
              size="large"
              className="flex-1"
              text={initialData ? "Update Member" : "Create Member"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
