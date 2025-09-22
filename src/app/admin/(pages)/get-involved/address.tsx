"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { generalSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

interface OrgDetailsType {
  address: string;
  emails: string; // single email for UI
  phones: string; // single phone for UI
  locationMapUrl: string;
}

interface FormStateType {
  isFormOpen: boolean;
  initialValue: OrgDetailsType;
}

export default function OrganisationDetails() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    initialValue: {
      address: "",
      emails: "",
      phones: "",
      locationMapUrl: "",
    },
  });

  async function fetch() {
    const data = await getData("/organisation/details", session);

    setFormState((val) => {
      return {
        ...val,
        initialValue: {
          address: data.address || "",
          emails: data.emails?.[0] || "", // take first email
          phones: data.phones?.[0] || "", // take first phone
          locationMapUrl: data.locationMapUrl || "",
        },
      };
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="blade-top-margin">
      <SectionHeading
        heading="Section - 02 (Organisation Details)"
        ctaText="Update"
        cta={true}
        handleClick={() =>
          setFormState((val) => ({ ...val, isFormOpen: true }))
        }
      />

      <OrgCard data={formState.initialValue} />

      {formState.isFormOpen && (
        <OrgForm
          initialData={formState.initialValue}
          fetchData={fetch}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
        />
      )}
    </section>
  );
}

const orgSchema = z.object({
  address: generalSchema("Address is required"),
  emails: generalSchema("Email is required"),
  phones: generalSchema("Phone is required"),
  locationMapUrl: generalSchema("Map URL is required"),
});

type OrgFormValues = z.infer<typeof orgSchema>;

function OrgForm({
  initialData,
  fetchData,
  onClose,
}: {
  initialData: OrgDetailsType;
  fetchData: () => void;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
    defaultValues: initialData,
  });

  const submitHandler: SubmitHandler<OrgFormValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/organisation/details`,
        {
          address: data.address,
          emails: [data.emails],
          phones: [data.phones],
          locationMapUrl: data.locationMapUrl,
          companyTagline: "",
          vision: "",
          mission: "",
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // if token needed
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        onClose();
        fetchData();
        toast.success("Organisation details updated successfully");
      } else {
        toast.error("Failed to update organisation details");
      }
    } catch (error: any) {
      console.error("Error updating organisation details:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[27rem] relative bg-white rounded-md shadow-2xl h-auto max-h-[80vh] overflow-auto">
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

          <div className="flex flex-col gap-y-8 h-full p-8 pt-1">
            <div className="flex flex-col gap-y-4">
              
              <TextInput
                label="Email"
                errors={errors.emails}
                placeholder="Enter email"
                register={register}
                registerer="emails"
                tooltip="Email is required"
              />
              <TextInput
                label="Phone"
                errors={errors.phones}
                placeholder="Enter phone"
                register={register}
                registerer="phones"
                tooltip="Phone is required"
              />

              <TextInput
                label="Address"
                errors={errors.address}
                placeholder="Enter address"
                register={register}
                registerer="address"
                tooltip="Address is required"
              />
              
              <TextInput
                label="Location Map URL"
                errors={errors.locationMapUrl}
                placeholder="Enter map link"
                register={register}
                registerer="locationMapUrl"
                tooltip="Map link is required"
              />
            </div>

            <div className="mt-auto">
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

function OrgCard({ data }: { data: OrgDetailsType }) {
  return (
    <article className="h-full border border-gray p-4 rounded-md mt-6 w-fit">
      <div className="space-y-3">
        <h6 className=" text-base">
          <b>Email: </b> {data.emails}
        </h6>
        <h6 className=" text-base">
          <b>Phone:</b> {data.phones}
        </h6>
        <h6 className="text-base">
          <b>Address: </b> {data.address}
        </h6>
        <h6 className=" text-base">
          <b>Map Link: </b>{" "}
          <Link
            href={data.locationMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            View Map
          </Link>
        </h6>
      </div>
    </article>
  );
}
