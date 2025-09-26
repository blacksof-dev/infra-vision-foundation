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
import { getData, updateContent, uploadImage } from "../../lib/utils";
import { toast } from "react-toastify";

interface WhoWeAreDefaultValueType {
  label: string;
  heading: string;
  description: string;
}

interface FormStateType {
  isFormOpen: boolean;
  intialValue: WhoWeAreDefaultValueType;
}

export default function WhoWeAre() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    intialValue: {
      label: "",
      heading: "",
      description: "",
    },
  });

  useEffect(() => {
    async function fetch() {
      const data = await getData("/content/who-we-are", session);
      setFormState((val) => {
        return { ...val, intialValue: data };
      });
     
    }
    fetch();
  }, []);
  return (
    <>
      <div className="blade-top-margin">
        <SectionHeading
          heading="Section - 02 (Who-we-are) "
          //   description="Banner"
          ctaText="Update"
          cta={true}
          handleClick={() =>
            setFormState((val) => {
              return { ...val, isFormOpen: true };
            })
          }
        />
      </div>
      <div className="">
        <WhoWeAreCard data={formState.intialValue} />
      </div>
      {formState.isFormOpen && (
        <WhoWeAreForm
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

const whoWeAreSchema = z.object({
  label: generalSchema("Tag is required"),
  heading: generalSchema("Heading is required"),
  description: generalSchema("Description is required"),
});

type WhoWeAreValue = z.infer<typeof whoWeAreSchema>;

function WhoWeAreForm({
  initalData,
  onClose,
}: {
  initalData: WhoWeAreDefaultValueType;
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
  } = useForm<WhoWeAreValue>({
    resolver: zodResolver(whoWeAreSchema),
    defaultValues: initalData,
  });

  const submitHandler: SubmitHandler<WhoWeAreValue> = async (data) => {
    try {
      setIsLoading(true);

      // Now update content with the correct image URLs
      const result = await updateContent("/content/who-we-are", session, {
        label: data.label,
        heading: data.heading,
        description: data.description,
      });

      if (result.success) {
        toast.success("Content updated successfully");
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
                label="Tag"
                errors={errors.heading}
                placeholder="Enter heading"
                register={register}
                registerer="label"
                tooltip="Tag is required"
              />
              <TextInput
                label="Heading"
                errors={errors.heading}
                placeholder="Enter heading"
                register={register}
                registerer="heading"
                tooltip="Heading is required"
              />
              <TextInput
                label="Description"
                errors={errors.description}
                placeholder="Enter description"
                register={register}
                registerer="description"
                tooltip="description is required"
              />
            </div>
            <div className="mt-auto ">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text="Update"
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

function WhoWeAreCard({ data }: { data: WhoWeAreDefaultValueType }) {
  const { label, heading, description } = data;
  return (
    <article className="h-full border border-gray p-4 rounded-md mt-6 w-full max-w-2xl">
      <div className="">
        <div className="">
          <h6 className="text-base">
            <b>Tag:</b> {label}
          </h6>
          <h6 className="text-base">
            <b>Heading:</b> {heading}
          </h6>
          <h6 className="mt-1 text-base">
            <b>description:</b> {description}
          </h6>
        </div>
      </div>
    </article>
  );
}
