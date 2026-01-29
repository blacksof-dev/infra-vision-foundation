"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import TextInput from "../../components/input/textInput";
import { X, ExternalLink, ShieldCheck, Mail, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import ImagePicker from "../../components/input/imagePicker";
import { ToggleSwitch } from "../../components/toggleSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { generalSchema } from "../../lib/zod";
import { getData } from "../../lib/utils";
import edjsHTML from "editorjs-html";
import ReactMarkdown from "react-markdown";
import EditorJSWrapper from "../../components/editorjs";
import { OutputData } from "@editorjs/editorjs";

// --- Types ---

interface MainContent {
  id: string;
  active: boolean;
  title: string;
  content: any;
  posterImageUrl: string;
}

interface Eligibility {
  id: string;
  ctaText: string;
  active: boolean;
  content: any;
}

interface Application {
  id: string;
  ctaText: string;
  url: string;
  active: boolean;
}

interface AwardResponse {
  main: MainContent;
  eligibility: Eligibility;
  application: Application;
}

// --- Component ---

export default function InfraPanditAwards() {
  const { data: session } = useSession();
  const [data, setData] = useState<AwardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const edjsParser = edjsHTML();

  // Form Modals
  const [activeForm, setActiveForm] = useState<
    "main" | "eligibility" | "application" | null
  >(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = (await getData(
        "/infrapandit-awards",
        session,
      )) as AwardResponse;
      setData(res);
    } catch (error) {
      console.error("Error fetching InfraPandit data:", error);
      toast.error("Failed to load award data");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent"></div>
        <p className="mt-2 text-gray-500 font-medium">
          Loading InfraPandit Awards details...
        </p>
      </div>
    );
  }

  if (!data) return null;

  const isMainDeactivated = !data.main.active;

  return (
    <>
      <section className="blade-top-margin pb-10">
        <SectionHeading
          heading="InfraPandit Awards Management"
          description="Manage the main content, eligibility criteria, and application registration."
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-10">
          {/* Main Content Card */}
          <div className="xl:col-span-12 group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 aspect-[4/5] lg:aspect-auto relative bg-gray-50 overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${data.main.posterImageUrl}`}
                  alt="Poster"
                  className="w-full h-full object-contain object-top  "
                />
                {!data.main.active && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                      <X className="w-4 h-4" /> Deactivated
                    </span>
                  </div>
                )}
              </div>
              <div className="lg:w-2/3 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-pink/10 text-pink text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                      Main Section
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {data.main.title}
                    </h3>
                  </div>
                  <Button
                    theme="pink"
                    size="small"
                    text="Edit Main Content"
                    onClick={() => setActiveForm("main")}
                  />
                </div>
                <div className="prose prose-sm max-w-none text-gray-600 mb-8  overflow-y-auto">
                  <EditorContent content={data.main.content} />
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ToggleSwitch
                      checked={data.main.active}
                      onChange={() => {}}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        data.main.active ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {data.main.active
                        ? "Live on Website"
                        : "Hidden from Public"}
                    </span>
                  </div>
                  {isMainDeactivated && (
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 italic text-xs">
                      <Info className="w-4 h-4" /> Deactivating this hides all
                      associated sections
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Card */}
          <div
            className={`xl:col-span-7 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col transition-all duration-300 ${
              isMainDeactivated
                ? "opacity-60 grayscale-[0.5]"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                {/* <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div> */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Eligibility Criteria
                  </h4>
                  <p className="text-sm text-gray-500">
                    CTA: {data.eligibility.ctaText}
                  </p>
                </div>
              </div>
              <Button
                theme="transparentGray"
                size="small"
                text="Edit Details"
                onClick={() => setActiveForm("eligibility")}
                isDisabled={isMainDeactivated}
              />
            </div>
            <div className="flex-1 bg-gray-50/50 rounded-xl p-5 border border-gray-100 mb-6 overflow-hidden max-h-100 overflow-y-auto   text-gray-600 text-sm">
              <EditorContent content={data.eligibility.content} isSmall />
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <ToggleSwitch
                checked={data.eligibility.active && !isMainDeactivated}
                onChange={() => {}}
              />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {data.eligibility.active ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          {/* Application Card */}
          <div
            className={`xl:col-span-5 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col transition-all duration-300 ${
              isMainDeactivated
                ? "opacity-60 grayscale-[0.5]"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                {/* <div className="w-12 h-12 bg-pink-50 text-pink rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div> */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Registration Form
                  </h4>
                  <p className="text-sm text-gray-500">
                    Label: {data.application.ctaText}
                  </p>
                </div>
              </div>
              <Button
                theme="transparentGray"
                size="small"
                text="Edit Link"
                onClick={() => setActiveForm("application")}
                isDisabled={isMainDeactivated}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-pink/5 rounded-2xl border border-pink/10 mb-6 group/link">
              <div className="text-pink mb-2 font-bold flex items-center gap-2">
                {data.application.ctaText} <ExternalLink className="w-4 h-4" />
              </div>
              <a
                href={data.application.url}
                target="_blank"
                className="text-xs text-blue-500 underline truncate max-w-full italic px-4"
              >
                {data.application.url}
              </a>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <ToggleSwitch
                checked={data.application.active && !isMainDeactivated}
                onChange={() => {}}
              />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {data.application.active ? "Live" : "Hidden"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {activeForm === "main" && (
        <MainForm
          initialData={data.main}
          onClose={() => setActiveForm(null)}
          onSuccess={() => {
            setActiveForm(null);
            fetchData();
          }}
        />
      )}

      {activeForm === "eligibility" && (
        <EligibilityForm
          initialData={data.eligibility}
          onClose={() => setActiveForm(null)}
          onSuccess={() => {
            setActiveForm(null);
            fetchData();
          }}
        />
      )}

      {activeForm === "application" && (
        <ApplicationForm
          initialData={data.application}
          onClose={() => setActiveForm(null)}
          onSuccess={() => {
            setActiveForm(null);
            fetchData();
          }}
        />
      )}
    </>
  );
}

// --- Forms ---

const mainSchema = z.object({
  title: generalSchema("Title is required"),
  active: z.boolean(),
  posterImage: z.any().optional(),
});

function MainForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: MainContent;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorData, setEditorData] = useState<OutputData | undefined>(
    initialData.content
      ? typeof initialData.content === "string"
        ? (JSON.parse(initialData.content) as OutputData)
        : (initialData.content as OutputData)
      : undefined,
  );
  const [editorHolderId] = useState(
    () =>
      `editorjs-main-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mainSchema),
    defaultValues: {
      title: initialData.title,
      active: initialData.active,
      posterImage: initialData.posterImageUrl,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("active", String(data.active));

      if (editorData) {
        formData.append("content", JSON.stringify(editorData));
      }

      if (data.posterImage instanceof FileList && data.posterImage.length > 0) {
        formData.append("posterImage", data.posterImage[0]);
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrapandit-awards/main`,
        formData,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );

      toast.success("Main content updated");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalWrapper title="Edit Main Content" onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="Title"
            register={register}
            registerer="title"
            errors={errors.title}
            placeholder="Enter title"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">
              Main Content
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Add rich content using the editor.
            </p>
            <Button
              type="button"
              text="Open Content Editor"
              theme="transparentPink"
              size="small"
              onClick={() => setIsEditorOpen(true)}
            />
          </div>

          <ImagePicker
            label="Poster Image"
            register={register}
            registerer="posterImage"
            watcher={watch("posterImage")}
            errors={errors.posterImage}
            accept=".png, .jpg, .jpeg, .webp"
          />

          <div className="flex items-center gap-3 py-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex-1">
              <div className="font-bold text-sm text-gray-900">
                Active Status
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-medium">
                Deactivating this will hide the entire InfraPandit section from
                the public.
              </p>
            </div>
            <ToggleSwitch
              checked={watch("active")}
              onChange={(val) => setValue("active", val)}
            />
          </div>

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
              isLoading={isSubmitting}
            />
          </div>
        </form>
      </ModalWrapper>

      {isEditorOpen && (
        <EditorModal
          holder={editorHolderId}
          data={editorData}
          onSave={(data) => {
            setEditorData(data);
            setIsEditorOpen(false);
          }}
          onClose={() => setIsEditorOpen(false)}
          title="Edit Main Content"
        />
      )}
    </>
  );
}

const eligibilitySchema = z.object({
  ctaText: generalSchema("Button text is required"),
  active: z.boolean(),
});

function EligibilityForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: Eligibility;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorData, setEditorData] = useState<OutputData | undefined>(
    initialData.content
      ? typeof initialData.content === "string"
        ? (JSON.parse(initialData.content) as OutputData)
        : (initialData.content as OutputData)
      : undefined,
  );
  const [editorHolderId] = useState(
    () =>
      `editorjs-eligibility-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      ctaText: initialData.ctaText,
      active: initialData.active,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ctaText: data.ctaText,
        active: data.active,
        content: editorData || {},
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrapandit-awards/eligibility`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Eligibility updated");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalWrapper title="Edit Eligibility Criteria" onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="CTA Button Text"
            register={register}
            registerer="ctaText"
            errors={errors.ctaText}
            placeholder="e.g. Eligibility"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">
              Eligibility Content
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Add criteria details using the editor.
            </p>
            <Button
              type="button"
              text="Open Eligibility Editor"
              theme="transparentPink"
              size="small"
              onClick={() => setIsEditorOpen(true)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-700 flex-1">
              Is Eligibility Section Active?
            </label>
            <ToggleSwitch
              checked={watch("active")}
              onChange={(val) => setValue("active", val)}
            />
          </div>

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
              isLoading={isSubmitting}
            />
          </div>
        </form>
      </ModalWrapper>

      {isEditorOpen && (
        <EditorModal
          holder={editorHolderId}
          data={editorData}
          onSave={(data) => {
            setEditorData(data);
            setIsEditorOpen(false);
          }}
          onClose={() => setIsEditorOpen(false)}
          title="Edit Eligibility Criteria"
        />
      )}
    </>
  );
}

const applicationSchema = z.object({
  ctaText: generalSchema("Button text is required"),
  url: z.string().url("Valid URL is required"),
  active: z.boolean(),
});

function ApplicationForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData: Application;
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      ctaText: initialData.ctaText,
      url: initialData.url,
      active: initialData.active,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // NOTE: Application form uses JSON endpoint as per requirement
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/infrapandit-awards/application-form`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Application form details updated");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper title="Edit Registration Link" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="Registration Button Text"
          register={register}
          registerer="ctaText"
          errors={errors.ctaText}
          placeholder="e.g. Register now"
        />
        <TextInput
          label="Registration URL (Google Form, etc.)"
          register={register}
          registerer="url"
          errors={errors.url}
          placeholder="https://forms.gle/..."
        />

        <div className="flex items-center gap-3">
          <label className="text-sm font-bold text-gray-700 flex-1">
            Is Registration Active?
          </label>
          <ToggleSwitch
            checked={watch("active")}
            onChange={(val) => setValue("active", val)}
          />
        </div>

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
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </ModalWrapper>
  );
}

// --- Utils ---

function EditorModal({
  holder,
  data,
  onSave,
  onClose,
  title,
}: {
  holder: string;
  data?: OutputData;
  onSave: (data: OutputData) => void;
  onClose: () => void;
  title: string;
}) {
  const [editorData, setEditorData] = useState<OutputData | undefined>(data);

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h6 className="text-xl font-bold text-gray-900">{title}</h6>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <EditorJSWrapper
              holder={holder}
              data={editorData}
              onChange={(newData) => setEditorData(newData)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-white">
          <Button
            text="Discard Changes"
            theme="transparentGray"
            size="large"
            type="button"
            onClick={onClose}
          />
          <Button
            text="Save Content"
            theme="pink"
            size="large"
            type="button"
            onClick={() => {
              if (editorData) onSave(editorData);
              else onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function EditorContent({
  content,
  isSmall,
}: {
  content: any;
  isSmall?: boolean;
}) {
  if (!content) return <p className="text-gray-400">No content</p>;

  // Legacy support for string content
  if (typeof content === "string") {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }

  try {
    const edjsParser = edjsHTML();
    const parsed = edjsParser.parse(content);
    const html = Array.isArray(parsed)
      ? parsed.join("")
      : (parsed as unknown as string);

    return (
      <div className={`editorjs-content ${isSmall ? "text-sm" : ""}`}>
        {/* Simple inline styles for EditorJS elements */}
        <div className="space-y-4" dangerouslySetInnerHTML={{ __html: html }} />
        <style jsx global>{`
          .editorjs-content ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
                
          }
          .editorjs-content ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
              
          }
          .editorjs-content li {
            margin-bottom: 0.25rem;
            
           font-size: 16px;

          } 
          .editorjs-content p {
           font-size: 16px;
           
          } 
           .editorjs-content {
              color: #000;
           }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error("Error parsing EditorJS content:", error);
    return <p className="text-red-500">Error rendering content</p>;
  }
}

function ModalWrapper({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
}
