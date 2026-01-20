"use client";
import React, { useEffect, useState } from "react";
import { getData } from "../../lib/utils";
import { useSession } from "next-auth/react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

type ContactLead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  personType: string;
  interestedIn: string;
  message: string;
  fileUrl?: string;
  links?: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
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
  hasPrevious: boolean;
};

export default function Leads() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState<ContactLead[]>([]);
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
    hasPrevious: false,
  });

  // filters
  const [filter, setFilter] = useState<"all" | "read" | "unread">("unread");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // popup state
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  async function fetchLeads() {
    try {
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        sortBy: "createdAt",
        sortOrder,
      });

      if (filter === "read") params.append("isRead", String(true));
      if (filter === "unread") params.append("isRead", String(false));

      console.log(params.toString());
      const res = await getData(`/contact/leads?${params.toString()}`, session);
      console.log(res);
      setLeads(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (e: any) {
      console.log(e);
      console.error(e);
      toast.error("Failed to fetch leads");
    }
  }

  async function deleteLead(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/contact/leads/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } },
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        fetchLeads();
        setConfirmDeleteId(null);
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Delete failed");
    }
  }

  async function markAsRead(id: string) {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/contact/leads/${id}/mark-read`,
        {},
        { headers: { Authorization: `Bearer ${session?.accessToken}` } },
      );
      fetchLeads();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filter, sortOrder]);

  return (
    <section className="blade-top-margin">
      <SectionHeading heading="Contact Leads" />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4  mt-4">
        {/* <Button
          text="All"
          size="small"
          theme={filter === "all" ? "pink" : "transparentGray"}
          onClick={() => setFilter("all")}
        /> */}
        <Button
          text="Unread"
          size="small"
          theme={filter === "unread" ? "pink" : "transparentGray"}
          onClick={() => setFilter("unread")}
        />
        <Button
          text="Read"
          size="small"
          theme={filter === "read" ? "pink" : "transparentGray"}
          onClick={() => setFilter("read")}
        />

        <select
          className="border border-gray rounded px-2 py-1 text-sm ml-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Leads Table */}
      <div>
        <div className="bg-gray h-12 grid grid-cols-[1fr_1.2fr_1fr_0.3fr] px-2 font-medium">
          <div className="content-center">Name</div>
          <div className="content-center">Email</div>
          <div className="content-center">Type</div>
          <div className="content-center">Action</div>
        </div>
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`px-2 h-14 grid grid-cols-[1fr_1.2fr_1fr_0.3fr] border-b border-b-gray cursor-pointer ${
              lead.isRead ? "bg-white" : "bg-gray/20"
            }`}
            onClick={() => {
              setSelectedLead(lead);
              if (!lead.isRead) markAsRead(lead.id);
            }}
          >
            <div className="content-center">
              {lead.firstName} {lead.lastName}
            </div>
            <div className="content-center">{lead.email}</div>
            <div className="content-center">{lead.personType}</div>
            <div className="content-center space-x-2">
              <div
                role="button"
                className="w-fit h-fit"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setConfirmDeleteId(lead.id);
                }}
              >
                <Button text="Delete" theme="transparentPink" size="small" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm px-2">
        <div>
          Page {meta.page} of {Math.max(meta.totalPages || 1, 1)} • Total{" "}
          {meta.total}
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="mr-2">Page size:</label>
            <select
              className="border border-gray rounded px-2 py-2 text-sm"
              value={pagination.limit}
              onChange={(e) =>
                setPagination({ page: 1, limit: Number(e.target.value) })
              }
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              text="Prev"
              theme="transparentGray"
              size="small"
              isDisabled={!meta.hasPrevious}
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

      {/* Popup: Lead Details */}
      {selectedLead && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[32rem] relative bg-white rounded-md shadow-2xl max-h-[80vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-lg font-semibold">
                {selectedLead.firstName} {selectedLead.lastName}
              </h6>
              <button
                className="cursor-pointer rounded-full ring-1 p-1 scale-90 hover:scale-100 transition-all duration-300"
                type="button"
                aria-label="close modal"
                onClick={() => setSelectedLead(null)}
              >
                <X />
              </button>
            </div>
            <p className="text-sm mb-2">
              <strong>Email:</strong> {selectedLead.email}
            </p>
            <p className="text-sm mb-2">
              <strong>Contact:</strong> {selectedLead.contactNumber}
            </p>
            <p className="text-sm mb-2">
              <strong>Person Type:</strong> {selectedLead.personType}
            </p>
            <p className="text-sm mb-2">
              <strong>Interested In:</strong> {selectedLead.interestedIn}
            </p>
            {selectedLead.links && (
              <p className="text-sm mb-2">
                <strong>Links:</strong>{" "}
                <a
                  href={selectedLead.links}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {selectedLead.links}
                </a>
              </p>
            )}
            {selectedLead.fileUrl && (
              <p className="text-sm mb-2">
                <strong>File:</strong>{" "}
                <a
                  href={process.env.NEXT_PUBLIC_HOST_URL + selectedLead.fileUrl}
                  target="_blank"
                  className="text-blue-500"
                >
                  Download
                </a>
              </p>
            )}
            <p className="text-sm mt-4 whitespace-pre-wrap">
              {selectedLead.message}
            </p>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[24rem] bg-white rounded-md shadow-2xl p-6">
            <h6 className="text-base font-medium mb-4">Confirm deletion</h6>
            <p className="text-sm text-darkgray/80">
              This action cannot be undone. Are you sure you want to delete?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                text="Cancel"
                theme="transparentGray"
                size="small"
                onClick={() => setConfirmDeleteId(null)}
              />
              <Button
                text="Delete"
                theme="pink"
                size="small"
                onClick={() => confirmDeleteId && deleteLead(confirmDeleteId)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
