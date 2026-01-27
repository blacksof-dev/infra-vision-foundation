"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
import { emailSchema, generalSchema, telephoneSchema, urlSchema } from "../../lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/button";
import { X, Mail, Phone, MapPin, ExternalLink, Globe } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";

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
    try {
      const data = await getData("/organisation/details", session);
      if (data) {
        setFormState((val) => ({
          ...val,
          initialValue: {
            address: data.address || "",
            emails: data.email || "",
            phones: data.phone || "",
            locationMapUrl: data.locationMapUrl || "",
          },
        }));
      }
    } catch (e) {
      console.error("Failed to fetch organization details", e);
    }
  }

  useEffect(() => {
    fetch();
  }, [session]);

  return (
    <section className="blade-top-margin pb-10 border-t border-gray-100 pt-10">
      <SectionHeading
        heading="Organisation Details"
        description=""
        ctaText="Update Details"
        cta={true}
        handleClick={() =>
          setFormState((val) => ({ ...val, isFormOpen: true }))
        }
      />

      <div className="mt-10">
        <OrgCard data={formState.initialValue} />
      </div>

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
  emails: emailSchema,
  phones: telephoneSchema,
  locationMapUrl: urlSchema
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
          email: data.emails,
          phone: data.phones,
          locationMapUrl: data.locationMapUrl,
          companyTagline: "",
          vision: "",
          mission: "",
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        onClose();
        fetchData();
        toast.success("Organisation details updated successfully");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
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
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update Organisation Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Public Email Address*"
                errors={errors.emails}
                placeholder="e.g. contact@infravision.org"
                register={register}
                registerer="emails"
              />
              <TextInput
                label="Contact Phone Number*"
                errors={errors.phones}
                placeholder="e.g. +91 0000 000 000"
                register={register}
                registerer="phones"
              />
            </div>

            <TextInput
              label="Physical Office Address*"
              errors={errors.address}
              placeholder="Full building address..."
              register={register}
              registerer="address"
            />

            <TextInput
              label="Google Maps Location URL*"
              errors={errors.locationMapUrl}
              placeholder="https://maps.google.com/..."
              register={register}
              registerer="locationMapUrl"
              tooltip="Paste the full link from Google Maps"
            />
          </div>

          {/* Modal Footer */}
          <div className="mt-8 flex gap-3 sticky bottom-0 bg-white pb-2">
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
              text="Save Details"
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

function OrgCard({ data }: { data: OrgDetailsType }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-sm max-w-4xl group">
      <div className="flex-1 space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex-shrink-0 w-10 h-10 bg-pink/10 rounded-xl flex items-center justify-center text-pink">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
              Email Address
            </span>
            <span className="text-base font-semibold text-gray-900 leading-tight">
              {data.emails || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
              Phone Number
            </span>
            <span className="text-base font-semibold text-gray-900 leading-tight">
              {data.phones || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex-shrink-0 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
              Office Address
            </span>
            <span className="text-base font-semibold text-gray-900 leading-tight whitespace-pre-line max-w-md">
              {data.address || "No address provided"}
            </span>
          </div>
        </div>
      </div>

      <div className="md:w-px bg-gray-100 hidden md:block" />

      <div className="md:w-1/3 flex flex-col justify-center items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-pink/[0.02] transition-colors">
        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-pink">
          <Globe className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-2">Location Map</h4>
        <p className="text-xs text-gray-500 mb-6 px-4">
          External map link used for the website's contact section.
        </p>
        <a
          href={data.locationMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:border-pink hover:text-pink transition-all shadow-sm"
        >
          View on Map <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
