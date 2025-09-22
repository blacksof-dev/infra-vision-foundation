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
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

import Image from "next/image";

interface AssociationItem {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

interface FormStateType {
  isFormOpen: boolean;
  intialValue: AssociationItem[];
}

export default function Association() {
  const { data: session } = useSession();
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<string>("");
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    intialValue: [],
  });

  async function fetch() {
    try {
      const data = await getData(
        "/homepage/associations",
        session
      ); 
      console.log(data)
      setFormState((val) => {
        return { ...val, intialValue: data?.data ?? [] };
      });
    } catch (e) {
      toast.error("Failed to load associations");
    }
  }
  useEffect(() => {
    fetch();
  }, []);

  async function deleteItem(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/associations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Deleted successfully!");
         setConfirmOpen(false);
        setDeletingId("");
        fetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Somthing went wrong! Try again.");
    }
  }
  return (
    <>
      <div className="blade-top-margin">
        <SectionHeading
          heading="Section -04 (Associations)"
          ctaText="Add New"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true };
            })
          }
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2 mt-6">
        {formState.intialValue.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white rounded-md border border-gray flex flex-col items-center gap-2"
          >
            <div className=" w-28 h-16">
              <img
                src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.imageUrl}`}
                alt={item.title}
                className="object-contain"
              />
            </div>
            <div className="text- text-center mt-6 " title={item.title}>
              {item.title}
            </div>
            <div className="pt-4">
              <Button
                theme="transparentPink"
                text="Delete"
                size="base"
                className="w-full"
               onClick={() => {
                  setDeletingId(item.id);
                  setConfirmOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {formState.isFormOpen && (
        <AssociationForm
          onSuccess={async () => {
            try {
              const data = await getData(
                "/homepage/associations?page=1&limit=100&search=%20",
                session
              );
              setFormState((val) => ({
                ...val,
                intialValue: data?.data ?? [],
                isFormOpen: false,
              }));
            } catch {
              setFormState((val) => ({ ...val, isFormOpen: false }));
            }
          }}
          onClose={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: false };
            })
          }
        />
      )}
           {confirmOpen && (
              <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
                <div className="w-[24rem] relative blade-top-padding-s bg-white rounded-md shadow-2xl h-auto max-h-[70vh] overflow-auto overflow-x-hidden p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="text-base font-medium">Confirm deletion</h6>
                    <button
                      type="button"
                      aria-label="close modal"
                      className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
                      onClick={() => setConfirmOpen(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <p className="text-sm text-darkgray/80">
                    This action cannot be undone. Are you sure you want to delete this
                    research paper?
                  </p>
                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      text="Cancel"
                      theme="transparentGray"
                      size="small"
                      onClick={() => setConfirmOpen(false)}
                    />
                    <Button
                      text="Delete"
                      theme="pink"
                      size="small"
                      onClick={() => deletingId && deleteItem(deletingId)}
                    />
                  </div>
                </div>
              </div>
            )}
    </>
  );
}

const associationSchema = z.object({
  title: generalSchema("Title is required"),
  image: fileSchema,
});

type AssociationFormValues = z.infer<typeof associationSchema>;

function AssociationForm({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void | Promise<void>;
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
  } = useForm<AssociationFormValues>({
    resolver: zodResolver(associationSchema),
    defaultValues: { title: "", image: "" } as unknown as AssociationFormValues,
  });

  const submitHandler: SubmitHandler<AssociationFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const imageValue = data.image as unknown;
      if (!(imageValue instanceof FileList) || imageValue.length === 0) {
        setError("image", {
          type: "manual",
          message: "Logo image is required",
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", imageValue[0] as File);
      formData.append("active", String(true));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/homepage/associations`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      toast.success("Created");
      await onSuccess();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[27rem] relative  blade-top-padding-s bg-white   rounded-md shadow-2xl h-auto max-h-[80vh] overflow-auto overflow-x-hidden">
        <form className="h-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="  flex justify-end sticky top-2 px-1 z-[999]   ">
            <button
              type="button"
              aria-label="close modal"
              className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-y-8 h-full p-8 pt-1">
            <div className="flex flex-col gap-y-4">
              <TextInput
                label="Title"
                errors={errors.title}
                placeholder="Enter title"
                register={register}
                registerer="title"
                tooltip="Title is required"
              />
              <ImagePicker
                label="Logo Image"
                errors={errors.image}
                register={register}
                registerer="image"
                watcher={watch("image")}
                accept=".svg, .png, .jpg, .jpeg, .webp"
                tooltip="Extensions: .svg/.png/.jpg/.jpeg/.webp"
              />
            </div>
            <div className="mt-auto ">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text="Create"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
