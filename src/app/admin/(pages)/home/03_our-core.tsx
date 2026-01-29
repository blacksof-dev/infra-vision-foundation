"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import TextInput from "../../components/input/textInput";
import { z } from "zod";
 
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
import { Button } from "../../components/button";
import { X, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData, updateContent } from "../../lib/utils";
import { toast } from "react-toastify";
import MessageInput from "../../components/input/textareaInput";

interface OurCoreDefaultValueType {
  label: string;
  heading: string;
  description: string;
}

interface FormStateType {
  isFormOpen: boolean;
  intialValue: OurCoreDefaultValueType;
}

export default function OurCore() {
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
      try {
        const data = await getData("/content/our-core", session);
        setFormState((val) => ({ ...val, intialValue: data }));
      } catch (error) {
        console.error("Error fetching Our-core:", error);
      }
    }
    fetch();
  }, [session]);

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="Section - 03 (Our Core)"
          // description="Manage the core values and mission statement content."
          ctaText="Update Content"
          cta={true}
          handleClick={() =>
            setFormState((val) => ({ ...val, isFormOpen: true }))
          }
        />

        <div className="mt-10">
          <OurCoreCard data={formState.intialValue} />
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

      {formState.isFormOpen && (
        <OurCoreForm
          initalData={formState.intialValue}
          onClose={() => setFormState((val) => ({ ...val, isFormOpen: false }))}
          onSuccess={() => {
            setFormState((val) => ({ ...val, isFormOpen: false }));
          }}
        />
      )}
    </>
  );
}

const OurCoreSchema = z.object({
  label: z.string().min(1, "Tag is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});

type OurCoreValue = z.infer<typeof OurCoreSchema>;

function OurCoreForm({
  initalData,
  onClose,
  onSuccess,
}: {
  initalData: OurCoreDefaultValueType;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OurCoreValue>({
    resolver: zodResolver(OurCoreSchema),
    defaultValues: initalData,
  });

  const submitHandler: SubmitHandler<OurCoreValue> = async (data) => {
    try {
      setIsLoading(true);
      const result = await updateContent("/content/our-core", session, {
        label: data.label,
        heading: data.heading,
        description: data.description,
      });

      if (result.success) {
        toast.success("Our Core content updated");
        onSuccess();
        window.location.reload();
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
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 font-poppin">
            Update Our Core
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
          <TextInput
            label="Section Tag*"
            errors={errors.label}
            placeholder="e.g. OUR CORE"
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

          <MessageInput
            label="Description*"
            errors={errors.description}
            placeholder="Enter core content description..."
            register={register}
            registerer="description" 
            
          />

          <div className="flex gap-4 pt-4">
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
              text="Save Changes"
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

function OurCoreCard({ data }: { data: OurCoreDefaultValueType }) {
  const { label, heading, description } = data;
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl">
      <div className="p-8">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Label / Tag
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
              className="text-2xl  text-gray-900 leading-tight font-poppin"
              dangerouslySetInnerHTML={{ __html:  heading?.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ) || "No Heading" }}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Description Content
            </p>
            <p
              className="text-gray-600 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html:
                  description?.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ) || "No Description Provided",
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
