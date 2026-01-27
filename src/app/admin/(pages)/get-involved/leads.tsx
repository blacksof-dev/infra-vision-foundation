"use client";
import React, { useEffect, useState } from "react";
import { getData } from "../../lib/utils";
import { useSession } from "next-auth/react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Mail, Phone, User, Info, ExternalLink, FileText, Calendar, Briefcase, Trash2 } from "lucide-react";
import ConfirmationPopup from "../../components/confirmationPopup";

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

      const res = await getData(`/contact/leads?${params.toString()}`, session);
      setLeads(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (e: any) {
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

      {/* Filters Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-6 bg-white border border-gray/30 p-4 rounded-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter("unread")}
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 rounded-md border ${filter === "unread"
              ? "bg-pink text-white border-pink"
              : "bg-white text-darkgray border-gray/30 hover:bg-gray/10"
              }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 rounded-md border ${filter === "read"
              ? "bg-pink text-white border-pink"
              : "bg-white text-darkgray border-gray/30 hover:bg-gray/10"
              }`}
          >
            Read
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-darkgray/60 uppercase tracking-wider">Sort by:</span>
          <select
            className="border border-gray/30 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-pink/50 transition-all font-medium text-darkgray min-w-[150px]"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray/30 rounded-md overflow-hidden">
        <div className="bg-gray/30 h-12 grid grid-cols-[1.5fr_1.5fr_1fr_0.5fr] px-6 font-semibold text-darkgray text-sm">
          <div className="content-center text-xs uppercase tracking-wider">Name</div>
          <div className="content-center text-xs uppercase tracking-wider">Email</div>
          <div className="content-center text-center text-xs uppercase tracking-wider">Type</div>
          <div className="content-center text-right text-xs uppercase tracking-wider pr-4">Action</div>
        </div>
        <div className="divide-y divide-gray/20">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`px-6 h-14 grid grid-cols-[1.5fr_1.5fr_1fr_0.5fr] cursor-pointer transition-all duration-200 hover:bg-gray/10 items-center ${lead.isRead ? "bg-white" : "bg-gray/20"
                }`}
              onClick={() => {
                setSelectedLead(lead);
                if (!lead.isRead) markAsRead(lead.id);
              }}
            >
              <div className="flex items-center gap-3">
                {!lead.isRead && (
                  <span className="w-2 h-2 rounded-full bg-pink shrink-0" title="Unread"></span>
                )}
                <span className={`text-sm ${!lead.isRead ? "font-semibold" : "text-darkgray"}`}>
                  {lead.firstName} {lead.lastName}
                </span>
              </div>
              <div className="text-darkgray text-sm truncate pr-4">{lead.email}</div>
              <div className="text-center">
                <span className="px-3 py-1 rounded-full bg-gray/40 text-[10px] font-bold uppercase text-darkgray/70">
                  {lead.personType}
                </span>
              </div>
              <div className="flex justify-end pr-2">
                <button
                  className="p-2 text-darkgray/40 hover:text-pink transition-colors rounded-full hover:bg-pink/10"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setConfirmDeleteId(lead.id);
                  }}
                  title="Delete Lead"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="p-16 text-center text-darkgray/40 bg-white">
              <p className="text-sm italic">No leads found matching current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm px-2">
        <div>
          Page {meta.page} of {Math.max(meta.totalPages || 1, 1)} • Total {meta.total}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="mr-2 text-xs font-semibold uppercase tracking-wider text-darkgray/60">Page size:</label>
            <select
              className="border border-gray/30 rounded px-2 py-1.5 text-sm bg-white"
              value={pagination.limit}
              onChange={(e) => setPagination({ page: 1, limit: Number(e.target.value) })}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              text="Prev"
              theme="transparentGray"
              size="small"
              isDisabled={!meta.hasPrevious}
              onClick={() => setPagination((p) => ({ ...p, page: Math.max(p.page - 1, 1) }))}
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
        <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
          <div className="w-full max-w-2xl relative bg-white rounded-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray/30">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray/30 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray/30 flex items-center justify-center text-darkgray">
                  <User size={20} />
                </div>
                <div>
                  <h6 className="text-lg font-bold text-darkgray leading-tight">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h6>
                  <p className="text-[10px] font-semibold text-darkgray/50 flex items-center gap-1 uppercase tracking-wider">
                    <Calendar size={10} />
                    Submitted: {new Date(selectedLead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer rounded-md hover:bg-gray/30 p-1.5 transition-colors duration-200 border border-gray/30"
                type="button"
                aria-label="close modal"
                onClick={() => setSelectedLead(null)}
              >
                <X size={18} className="text-darkgray" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-darkgray/40 border-b border-gray/20 pb-2">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#F4F7FF] flex items-center justify-center border border-[#E0E7FF]">
                        <Mail size={18} className="text-[#4F46E5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-darkgray/40 uppercase tracking-tight mb-0.5">Email Address</p>
                        <p className="text-sm font-bold text-darkgray truncate">{selectedLead.email}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#F0FDF4] flex items-center justify-center border border-[#DCFCE7]">
                        <Phone size={18} className="text-[#16A34A]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-darkgray/40 uppercase tracking-tight mb-0.5">Contact Number</p>
                        <p className="text-sm font-bold text-darkgray">{selectedLead.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Details */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-darkgray/40 border-b border-gray/20 pb-2">Lead Details</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#FAF5FF] flex items-center justify-center border border-[#F3E8FF]">
                        <Briefcase size={18} className="text-[#9333EA]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-darkgray/40 uppercase tracking-tight mb-0.5">Person Type</p>
                        <p className="text-sm font-bold text-darkgray">{selectedLead.personType}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#FFF7ED] flex items-center justify-center border border-[#FFEDD5]">
                        <Info size={18} className="text-[#EA580C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-darkgray/40 uppercase tracking-tight mb-0.5">Interested In</p>
                        <p className="text-sm font-bold text-darkgray">{selectedLead.interestedIn}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="mt-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-darkgray/40 border-b border-gray/20 pb-2 mb-4">Message</h3>
                <div className="bg-gray/10 rounded-md p-5 border border-gray/20">
                  <p className="text-sm text-darkgray/80 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Attachments & Links */}
              {(selectedLead.links || selectedLead.fileUrl) && (
                <div className="mt-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-darkgray/40 border-b border-gray/20 pb-2 mb-4">Attachments & Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedLead.links && (
                      <a
                        href={selectedLead.links}
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-darkgray border border-gray/30 rounded-md text-xs font-bold hover:bg-gray/10 transition-all uppercase tracking-wider"
                      >
                        <ExternalLink size={14} className="text-pink" />
                        Explore Link
                      </a>
                    )}
                    {selectedLead.fileUrl && (
                      <a
                        href={process.env.NEXT_PUBLIC_HOST_URL + selectedLead.fileUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-2.5 bg-pink text-white rounded-md text-xs font-bold hover:bg-pink/90 transition-all uppercase tracking-wider shadow-sm"
                      >
                        <FileText size={14} />
                        View Document
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray/10 border-t border-gray/30 flex justify-end">
              <button
                className="px-6 py-2 bg-white border border-gray/30 cursor-pointer text-darkgray rounded-md text-sm font-semibold hover:bg-gray/20 transition-all"
                onClick={() => setSelectedLead(null)}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDeleteId && (
        <ConfirmationPopup
          title="Delete this lead?"
          message="This action cannot be undone. All information for this lead will be permanently deleted from the system."
          onClose={() => setConfirmDeleteId(null)}
          onDelete={() => confirmDeleteId && deleteLead(confirmDeleteId)}
        />
      )}
    </section>
  );
}
