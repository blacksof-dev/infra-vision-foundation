"use client";
import React, { useEffect, useState } from "react";
import { getData } from "../../lib/utils";
import { useSession } from "next-auth/react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

type NewsletterDataType = {
  id: string;
  email: string;
  isActive: string;
  subscribedAt: string;
  unsubscribedAt: string;
  source: string;
};

type Pagination = {
  page: number;
  limit: number;
};

type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export default function Page() {
  const { data: session } = useSession();
  const [newsletterData, setNewsletterData] = useState<NewsletterDataType[]>(
    []
  );
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
  });
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  async function fetch() {
    const res = await getData(
      `/newsletter-subscription?page=${pagination.page}&limit=${pagination.limit}`,
      session
    );
    setNewsletterData(res.data || []);
    if (res.meta) setMeta(res.meta);
  }
  async function deleteEmail(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/newsletter-subscription/${id}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        fetch();
        setConfirmOpen(false);
        setDeletingId("");
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  async function handleExportCsv() {
    try {
      const url = `${process.env.NEXT_PUBLIC_HOST_URL}/newsletter-subscription/export/csv`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }, 
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
      const href = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = href;
      a.download = `newsletter-subscriptions-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(href);
      toast.success("CSV exported successfully");
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to export CSV");
    }
  }

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return (
    <section >
      <div className="">
      <SectionHeading
        heading="Newsletters"
        cta={true}
        ctaText="Export CSV"
        handleClick={() => handleExportCsv()}
      />
      <div>
        <div className="bg-gray h-12 grid grid-cols-3 px-2">
          <div className="font-medium content-center">Email</div>
          <div className="font-medium content-center">isActive</div>
          <div className="font-medium content-center">Action</div>
        </div>
        {newsletterData.map((obj, index) => {
          return (
            <div
              className="px-2 h-14 grid grid-cols-3 border-b border-b-gray "
              key={index}
            >
              <div className="content-center">{obj.email}</div>
              <div className="content-center">
                {obj.isActive ? "Active" : "-"}
              </div>
              <div className="space-x-3 content-center">
                <Button
                  text="Delete"
                  theme="transparentPink"
                  size="small"
                  className="py-1 px-3"
                  onClick={() => {
                    setDeletingId(obj.id);
                    setConfirmOpen(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination + Page Size Selector */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm px-2">
        <div>
          Page {meta.page} of {Math.max(meta.totalPages || 1, 1)} • Total{" "}
          {meta.total}
        </div>

        <div className="flex items-center gap-4">
          {/* Page Size Dropdown */}
          <div>
            <label className="mr-2">Page size:</label>
            <select
              className="border border-gray rounded px-2 py-2 text-sm"
              value={pagination.limit}
              onChange={(e) =>
                setPagination({ page: 1, limit: Number(e.target.value) })
              }
            >
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <Button
              text="Prev"
              theme="transparentGray"
              size="small"
              isDisabled={!meta.hasPrev}
              onClick={() =>
                setPagination((p) => ({ ...p, page: Math.max(p.page - 1, 1) }))
              }
            />
            <Button
              text="Next"
              theme="transparentPink"
              size="small"
              isDisabled={!meta.hasNext}
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
            />
          </div>
        </div>
      </div>

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
              This action cannot be undone. Are you sure you want to delete.
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
                onClick={() => deletingId && deleteEmail(deletingId)}
              />
            </div>
          </div>
        </div>
      )}
      </div>
      
    </section>
  );
}
