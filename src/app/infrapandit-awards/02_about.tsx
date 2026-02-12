"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// types/award.ts

export interface EditorBlock {
  id: string;
  type: string;
  data: any;
}

export interface EditorContentType {
  time: number;
  blocks: EditorBlock[];
  version: string;
}

export interface MainSection {
  id: string;
  active: boolean;
  title: string;
  content: EditorContentType;
  posterImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface EligibilitySection {
  id: string;
  ctaText: string;
  active: boolean;
  content: EditorContentType;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationSection {
  id: string;
  ctaText: string;
  url: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AwardResponse {
  main: MainSection;
  eligibility: EligibilitySection;
  application: ApplicationSection;
}

interface PopupProps {
  onClose: () => void;
  content: EditorContentType;
}

const EligibilityPopup = ({ onClose, content }: PopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-4xl max-h-[90vh] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Eligibility & Process</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <EditorContent data={content} />
        </div>
      </div>
    </div>
  );
};

const EditorJsRenderer = dynamic(() => import("editorjs-react-renderer"), {
  ssr: false,
});

const EditorContent = ({ data }: { data: EditorContentType }) => {
  return (
    <div className="prose max-w-none">
      <EditorJsRenderer data={data} />
    </div>
  );
};

export default function InfraPanditAwardsPage() {
  const [data, setData] = useState<AwardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://64.227.188.3:4000/infrapandit-awards"); // 🔥 replace with real API
        const json: AwardResponse = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!data) return <div className="p-10">No data found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* MAIN SECTION */}
      {data.main.active && (
        <section className="mb-16">
          <h1 className="text-3xl font-bold mb-6">{data.main.title}</h1>

          <EditorContent data={data.main.content} />
        </section>
      )}

      {/* CTA BUTTON */}
      {data.eligibility.active && (
        <button
          onClick={() => setShowPopup(true)}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          {data.eligibility.ctaText}
        </button>
      )}

      {/* APPLICATION BUTTON */}
      {data.application.active && (
        <a
          href={data.application.url}
          target="_blank"
          className="ml-4 bg-black text-white px-6 py-3 rounded-lg"
        >
          {data.application.ctaText}
        </a>
      )}

      {/* POPUP */}
      {showPopup && (
        <EligibilityPopup
          onClose={() => setShowPopup(false)}
          content={data.eligibility.content}
        />
      )}
    </div>
  );
}
