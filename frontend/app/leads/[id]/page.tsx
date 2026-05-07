"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Edit3,
  Mail,
  MessageSquareText,
  Phone,
  Save,
  StickyNote,
  Trash2,
  UserRound,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import api from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { Lead, LeadStatus, Note } from "@/lib/types";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function LeadDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const leadId = params.id as string;
  const isEditMode = searchParams.get("edit") === "true";

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLead = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/leads/${leadId}`);

      setLead(res.data.lead);
      setNotes(res.data.notes);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (data: any) => {
    try {
      setSaving(true);

      await api.put(`/leads/${leadId}`, data);

      toast.success("Lead updated successfully");
      router.push(`/leads/${leadId}`);
      fetchLead();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (status: LeadStatus) => {
    try {
      await api.patch(`/leads/${leadId}/status`, { status });
      toast.success("Status updated");
      fetchLead();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteContent.trim()) {
      toast.error("Please enter note content");
      return;
    }

    try {
      await api.post(`/notes/${leadId}`, {
        content: noteContent,
      });

      toast.success("Note added successfully");
      setNoteContent("");
      fetchLead();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add note");
    }
  };

  const deleteNote = async (noteId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${noteId}`);
      toast.success("Note deleted");
      fetchLead();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    fetchLead();
  }, [leadId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fbff]">
        <Navbar />

        <section className="ml-64 p-8">
          <LeadDetailsSkeleton />
        </section>
      </main>
    );
  }

  if (!lead) {
    return (
      <main className="min-h-screen bg-[#f8fbff]">
        <Navbar />

        <section className="ml-64 p-8">
          <div className="rounded-[2rem] border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <CircleAlert size={32} />
            </div>

            <h1 className="text-2xl font-black text-slate-950">
              Lead not found
            </h1>

            <p className="mt-2 text-slate-500">
              The lead you are trying to view does not exist or may have been
              deleted.
            </p>

            <Link
              href="/leads"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Leads
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <Navbar />

      <section className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-white via-blue-50 to-cyan-50 p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <Link
                href="/leads"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              >
                <ArrowLeft size={16} />
                Back to Leads
              </Link>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                {isEditMode ? <Edit3 size={16} /> : <BriefcaseBusiness size={16} />}
                {isEditMode ? "Edit Lead Record" : "Lead Details"}
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950">
                {isEditMode ? "Edit Lead" : lead.leadName}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                {lead.companyName} • {lead.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={lead.status} />

              {!isEditMode && (
                <button
                  onClick={() => router.push(`/leads/${leadId}?edit=true`)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Edit3 size={18} />
                  Edit Lead
                </button>
              )}
            </div>
          </div>
        </div>

        {isEditMode ? (
          <div className="grid gap-8 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <div className="mb-5">
                <h2 className="text-2xl font-black text-slate-950">
                  Update Lead Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Modify the lead details and save the updated CRM record.
                </p>
              </div>

              <LeadForm initialData={lead} onSubmit={updateLead} loading={saving} />
            </div>

            <aside className="space-y-6 xl:col-span-2">
              <SideCard
                icon={<Save size={26} />}
                title="Editing Mode"
                text="You are now updating this lead record. After saving, the CRM dashboard and lead list will reflect the latest values."
              />

              <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
                <h3 className="text-xl font-black text-slate-950">
                  Edit Tips
                </h3>

                <div className="mt-5 space-y-4">
                  <TipItem text="Update the deal value if the opportunity value changed." />
                  <TipItem text="Change the lead source only if the original source was incorrect." />
                  <TipItem text="Keep the salesperson name consistent for filtering." />
                  <TipItem text="Use the status dropdown to reflect current pipeline progress." />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-5">
            {/* Left Main Content */}
            <div className="space-y-8 xl:col-span-3">
              {/* Lead Information */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      Lead Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Main details about this potential customer.
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                    {lead.leadSource}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <InfoCard
                    icon={<UserRound size={22} />}
                    label="Lead Name"
                    value={lead.leadName}
                  />

                  <InfoCard
                    icon={<BriefcaseBusiness size={22} />}
                    label="Company"
                    value={lead.companyName}
                  />

                  <InfoCard
                    icon={<Mail size={22} />}
                    label="Email"
                    value={lead.email}
                  />

                  <InfoCard
                    icon={<Phone size={22} />}
                    label="Phone"
                    value={lead.phoneNumber}
                  />

                  <InfoCard
                    icon={<UserRound size={22} />}
                    label="Assigned Salesperson"
                    value={lead.assignedSalesperson}
                  />

                  <InfoCard
                    icon={<BadgeDollarSign size={22} />}
                    label="Estimated Deal Value"
                    value={`Rs. ${lead.estimatedDealValue.toLocaleString()}`}
                  />
                </div>
              </div>

              {/* Add Note */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-2xl font-black text-slate-950">
                    Add Lead Note
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Record call updates, meeting details, email follow-ups, or
                    sales progress.
                  </p>
                </div>

                <form onSubmit={addNote} className="space-y-4">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: Called the lead today. They are interested and requested a proposal..."
                  />

                  <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
                    <MessageSquareText size={18} />
                    Add Note
                  </button>
                </form>
              </div>

              {/* Notes List */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      Notes
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {notes.length} note{notes.length === 1 ? "" : "s"} added
                      for this lead.
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <StickyNote size={24} />
                  </div>
                </div>

                {notes.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <StickyNote size={26} />
                    </div>

                    <h3 className="font-black text-slate-950">
                      No notes added yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Add the first note after a call, email, meeting, or
                      follow-up.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div
                        key={note._id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                      >
                        <p className="text-sm font-medium leading-7 text-slate-700">
                          {note.content}
                        </p>

                        <div className="mt-4 flex flex-col justify-between gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
                          <p className="text-xs font-semibold text-slate-500">
                            By {note.createdBy} •{" "}
                            {new Date(note.createdAt).toLocaleString()}
                          </p>

                          <button
                            onClick={() => deleteNote(note._id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6 xl:col-span-2">
              {/* Status Update */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <CheckCircle2 size={26} />
                </div>

                <h2 className="text-xl font-black text-slate-950">
                  Pipeline Status
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Update the lead status as the sales process moves forward.
                </p>

                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(e.target.value as LeadStatus)}
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <div className="mt-5">
                  <StatusBadge status={lead.status} />
                </div>
              </div>

              {/* Dates */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">
                  Timeline
                </h2>

                <div className="mt-5 space-y-4">
                  <TimelineItem
                    icon={<CalendarDays size={18} />}
                    label="Created Date"
                    value={new Date(lead.createdAt).toLocaleString()}
                  />

                  <TimelineItem
                    icon={<Clock3 size={18} />}
                    label="Last Updated"
                    value={new Date(lead.updatedAt).toLocaleString()}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">
                  Quick Summary
                </h2>

                <div className="mt-5 space-y-4">
                  <SummaryItem label="Company" value={lead.companyName} />
                  <SummaryItem label="Source" value={lead.leadSource} />
                  <SummaryItem label="Salesperson" value={lead.assignedSalesperson} />
                  <SummaryItem
                    label="Deal Value"
                    value={`Rs. ${lead.estimatedDealValue.toLocaleString()}`}
                  />
                  <SummaryItem label="Notes" value={notes.length.toString()} />
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">
                  Lead Follow-up Tips
                </h2>

                <div className="mt-5 space-y-4">
                  <TipItem text="Add a note after each customer interaction." />
                  <TipItem text="Update the status when the lead moves to the next stage." />
                  <TipItem text="Keep the deal value updated for accurate dashboard stats." />
                  <TipItem text="Use lost/won status only after the final decision." />
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const styles: Record<LeadStatus, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-100",
    Contacted: "bg-purple-50 text-purple-700 border-purple-100",
    Qualified: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Proposal Sent": "bg-amber-50 text-amber-700 border-amber-100",
    Won: "bg-green-50 text-green-700 border-green-100",
    Lost: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black ${styles[status]}`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-500">{label}</p>
      <h3 className="mt-1 break-words text-base font-black text-slate-950">
        {value}
      </h3>
    </div>
  );
}

function TimelineItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="text-right text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
      <span>{text}</span>
    </div>
  );
}

function SideCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function LeadDetailsSkeleton() {
  return (
    <div>
      <div className="mb-8 h-56 animate-pulse rounded-[2rem] border border-blue-100 bg-white shadow-sm" />

      <div className="grid gap-8 xl:grid-cols-5">
        <div className="space-y-8 xl:col-span-3">
          <div className="h-96 animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
          <div className="h-64 animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <div className="h-72 animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
          <div className="h-56 animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
}