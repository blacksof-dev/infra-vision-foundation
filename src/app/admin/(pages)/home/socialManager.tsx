"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/button";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Link, Globe, Plus } from "lucide-react";
import ConfirmationPopup from "../../components/confirmationPopup";

type SocialProfile = {
  id: string;
  slug: "twitter" | "linkedin" | "youtube" | "instagram" | "facebook" | string;
  value: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

const SLUG_OPTIONS = [
  "twitter",
  "linkedin",
  "youtube",
  "instagram",
  "facebook",
];

export default function SocialProfilesManager() {
  const { data: session } = useSession();
  const [slug, setSlug] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [items, setItems] = useState<SocialProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function loadProfiles() {
    try {
      setIsLoading(true);
      const data = (await getData(
        "/social-profiles",
        session
      )) as SocialProfile[];
      setItems(data || []);
    } catch (e) {
      toast.error("Failed to load social profiles");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedProfiles = useMemo(() => {
    return [...items].sort((a, b) => a.slug.localeCompare(b.slug));
  }, [items]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!slug || !value) {
      toast.warning("Platform and URL are required");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/social-profiles`,
        { slug, value, active: true },
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status === 201 || res.status === 200) {
        toast.success("Social profile saved");
      }
      setSlug("");
      setValue("");
      await loadProfiles();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(slugToDelete: string) {
    if (!slugToDelete) return;
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/social-profiles/${slugToDelete}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status === 200) {
        toast.success("Profile deleted");
        setDeletingSlug(null);
      }
      await loadProfiles();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm max-w-4xl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Social Profile Accounts
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Connect and manage your official social media presence.
          </p>
        </div>
      </div>

      <div className="p-8">
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-pink/5 p-6 rounded-xl border border-pink/10 mb-10"
        >
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Select Platform
            </label>
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none transition-all"
            >
              <option value="">Choose a platform...</option>
              {SLUG_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-12 lg:md:col-span-6">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Profile URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Link className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none transition-all"
                placeholder="https://social-platform.com/your-brand"
              />
            </div>
          </div>

          <div className="md:col-span-12 lg:md:col-span-2">
            <Button
              type="submit"
              theme="pink"
              size="base"
              className="w-full h-11 font-bold"
              text={isSubmitting ? "Saving..." : "Connect"}
              isDisabled={isSubmitting}
            />
          </div>
        </form>

        <div className="space-y-3">
          <div className="grid grid-cols-12 h-10 px-4 items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            <div className="col-span-3">Platform</div>
            <div className="col-span-6">Account URL</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30 rounded-xl border border-dashed border-gray-200">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink border-t-transparent mb-4"></div>
              <p className="text-sm">Loading connections...</p>
            </div>
          ) : sortedProfiles.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30 rounded-xl border border-dashed border-gray-200">
              <Globe className="w-10 h-10 mb-4 opacity-20" />
              <p className="text-sm">No social profiles connected yet.</p>
            </div>
          ) : (
            sortedProfiles.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-12 items-center px-4 h-16 bg-white border border-gray-100 rounded-xl group hover:border-pink/30 hover:shadow-sm transition-all"
              >
                <div className="col-span-3">
                  <span className="capitalize text-sm font-bold text-gray-900 px-3 py-1 bg-gray-100 rounded-lg group-hover:bg-pink/5 group-hover:text-pink transition-colors">
                    {p.slug}
                  </span>
                </div>
                <div className="col-span-6 truncate">
                  <a
                    className="text-xs text-pink hover:underline flex items-center gap-2"
                    href={p.value}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {p.value}
                  </a>
                </div>
                <div className="col-span-3 flex justify-end">
                  <Button
                    theme="transparentGray"
                    size="small"
                    className="group-hover:bg-red-50 group-hover:text-red-600 transition-colors"
                    onClick={() => setDeletingSlug(p.slug)}
                    text="Disconnect"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {deletingSlug && (
        <ConfirmationPopup
          onClose={() => setDeletingSlug(null)}
          onDelete={() => handleDelete(deletingSlug)}
        />
      )}
    </div>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
