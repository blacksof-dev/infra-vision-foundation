"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/button";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [active, setActive] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<SocialProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setError("Slug and URL are required");
      setTimeout(() => setError(""), 2500);
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/social-profiles`,
        { slug, value, active },
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status === 201 || res.status === 200) {
        toast.success("Saved");
      }
      setSlug("");
      setValue("");
      setActive(true);
      await loadProfiles();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Create failed");
      setTimeout(() => setError(""), 2500);
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
      if (res.status === 200) toast.success("Deleted");
      await loadProfiles();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Delete failed");
      setTimeout(() => setError(""), 2500);
    }
  }

  return (
    <section className="space-y-8 mt-10">
      <div>
        <h3 className="text-xl font-medium">Social Profiles</h3>
        <p className="text-sm text-darkgray/70">
          Manage social profile links and status.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
      >
        <div>
          <div className="font-medium pb-1.5 flex justify-between">
            <label>Platform</label>
          </div>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border-[#ecedec] border-1 rounded-lg h-[50px] px-3 w-full outline-none"
          >
            <option value="">Select platform</option>
            {SLUG_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="font-medium pb-1.5 flex justify-between">
            <label>URL</label>
          </div>
          <div
            className={`border-[#ecedec] border-1 rounded-lg h-[50px] flex items-center pl-3 transition-colors font-regular`}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`ml-2.5 rounded-lg border-none w-11/12 h-full outline-none font-regular`}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex gap-4 items-center h-[50px]">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>
          <Button
            type="submit"
            theme="pink"
            text={isSubmitting ? "Saving..." : "Add / Update"}
            isDisabled={isSubmitting}
          />
        </div>
        {error && <p className="text-red-500 text-sm md:col-span-3">{error}</p>}
      </form>

      <div>
        <div className="grid grid-cols-[0.4fr_1fr_0.5fr_0.1fr] h-12 bg-gray/20 items-center px-4 border-b border-b-gray/30 text-sm font-medium">
          <div>Platform</div>
          <div>URL</div>
          <div>Status</div>
          <div className="w-40">Action</div>
        </div>
        {isLoading ? (
          <div className="px-4 py-6 text-sm text-darkgray">Loading...</div>
        ) : (
          sortedProfiles.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[0.4fr_1fr_0.5fr_0.1fr] items-center px-4 h-14 border-b border-b-gray/20 text-sm"
            >
              <div className="capitalize">{p.slug}</div>
              <div className="truncate max-w-sm">
                <a
                  className="text-pink underline "
                  href={p.value}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.value}
                </a>
              </div>
              <div>{p.active ? "Active" : "Inactive"}</div>
              <div className="w-40 flex gap-3">
                <Button
                  theme="transparentGray"
                  text="Delete"
                  size="small"
                  onClick={() => handleDelete(p.slug)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
