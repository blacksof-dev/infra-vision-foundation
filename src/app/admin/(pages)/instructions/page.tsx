"use client";
import { BookText, FileText, Hourglass, Image, LockOpen } from "lucide-react";
import React from "react";

export default function AdminInstructionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-8 bg-white min-h-full">
      <header className="mb-12 border-b border-gray/20 pb-8 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-black tracking-tight mb-3">
          Dashboard Guidelines
        </h1>
        <p className="text-darkgray text-lg max-w-2xl">
            Follow these guidelines to ensure data integrity and
          optimal performance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 1. Login & Session Issues */}
        <section className="p-6 border border-gray/10 rounded-xl hover:bg-whitesmoke transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-pink/10 rounded-full text-pink">
              <LockOpen />
            </div>
            <h2 className="text-xl font-semibold text-black">
              Login & Sessions
            </h2>
          </div>
          <ul className="space-y-3 text-darkgray list-disc ml-5">
            <li>
              Session inactive issues? <strong>Log out and log in</strong> again
              before retrying.
            </li>
            <li>
              Always ensure a stable connection before submitting large files.
            </li>
          </ul>
        </section>

        {/* 2. Image Upload Guidelines */}
        <section className="p-6 border border-gray/10 rounded-xl hover:bg-whitesmoke transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-pink/10 rounded-full text-pink">
              <Image />
            </div>
            <h2 className="text-xl font-semibold text-black">
              Image Standards
            </h2>
          </div>
          <ul className="space-y-3 text-darkgray list-disc ml-5">
            <li>
              Maximum file size: <strong>3 MB</strong>
            </li>
            <li>
              Recommended format: <strong>WebP</strong> (optimized for web
              performance and smaller file size).
            </li>
            <li>Ensure images are compressed for faster load times.</li>
          </ul>
        </section>

        {/* 3. PDF Upload Guidelines */}
        <section className="p-6 border border-gray/10 rounded-xl hover:bg-whitesmoke transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-pink/10 rounded-full text-pink">
              <FileText />
            </div>
            <h2 className="text-xl font-semibold text-black">PDF Documents</h2>
          </div>
          <ul className="space-y-3 text-darkgray list-disc ml-5">
            <li>
              Maximum file size: <strong>10 MB</strong>
            </li>
            <li>Verify file content before upload to prevent duplicates.</li>
          </ul>
        </section>

        {/* 4. Form Submission Rules */}
        <section className="p-6 border border-gray/10 rounded-xl hover:bg-whitesmoke transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-pink/10 rounded-full text-pink">
              <BookText />
            </div>
            <h2 className="text-xl font-semibold text-black">
              Submission Rules
            </h2>
          </div>
          <ul className="space-y-3 text-darkgray list-disc ml-5">
            <li>Double-check all mandatory fields before clicking submit.</li>
            <li>
              Review all context-specific instructions in each form section.
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-10 space-y-10">
        {/* 5. Data Upload Issues */}
        <section className="p-8 border border-gray/10 rounded-xl bg-gray/5">
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="text-pink">⚠️</span> Troubleshooting Uploads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-darkgray">
            <div className="flex gap-3">
              <span className="font-bold text-pink">1</span>
              <span>Refresh the page immediately if an error occurs.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-pink">2</span>
              <span>Log out and log in if issues persist across pages.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-pink">3</span>
              <span>
                Check for existing records to avoid duplicate entries.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-pink">4</span>
              <span>
                Files over <strong>20 MB</strong> will trigger a "save failed"
                error.
              </span>
            </div>
          </div>
        </section>

        {/* ⚠️ Blog Update Visibility Notice */}
        <section className="p-8 border border-pink/10 rounded-xl bg-pink/5">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
            <Hourglass /> Propagation Delay
          </h2>
          <p className="text-darkgray mb-4">
            Updates to blog posts or static content may take{" "}
            <strong>1–2 minutes</strong> to reflect on the live site.
          </p>
          <div className="bg-white/50 p-4 rounded-lg text-sm text-darkgray italic border border-pink/5">
            Reason: The platform uses static regeneration. The latest version is
            generated after the first visit following an update. Subsequent
            visitors will see the updated content instantly.
          </div>
        </section>
      </div>
    </div>
  );
}
