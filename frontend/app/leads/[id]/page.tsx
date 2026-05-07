"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
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
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="ml-64 p-8">
          <div className="card p-8 text-center text-slate-500">
            Loading lead details...
          </div>
        </section>
      </main>
    );
  }

  if (!lead) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="ml-64 p-8">
          <div className="card p-8 text-center text-red-500">
            Lead not found.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="ml-64 p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isEditMode ? "Edit Lead" : lead.leadName}
            </h1>
            <p className="mt-1 text-slate-500">
              {lead.companyName} • {lead.email}
            </p>
          </div>

          {!isEditMode && (
            <button
              onClick={() => router.push(`/leads/${leadId}?edit=true`)}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit Lead
            </button>
          )}
        </div>

        {isEditMode ? (
          <LeadForm
            initialData={lead}
            onSubmit={updateLead}
            loading={saving}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="card p-6">
                <h2 className="mb-5 text-xl font-bold text-slate-900">
                  Lead Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  <Info label="Lead Name" value={lead.leadName} />
                  <Info label="Company" value={lead.companyName} />
                  <Info label="Email" value={lead.email} />
                  <Info label="Phone" value={lead.phoneNumber} />
                  <Info label="Lead Source" value={lead.leadSource} />
                  <Info
                    label="Assigned Salesperson"
                    value={lead.assignedSalesperson}
                  />
                  <Info
                    label="Estimated Value"
                    value={`Rs. ${lead.estimatedDealValue.toLocaleString()}`}
                  />
                  <Info
                    label="Last Updated"
                    value={new Date(lead.updatedAt).toLocaleString()}
                  />
                </div>
              </div>

              <div className="card p-6">
                <h2 className="mb-5 text-xl font-bold text-slate-900">
                  Add Note
                </h2>

                <form onSubmit={addNote} className="space-y-4">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                    placeholder="Write call update, email follow-up, meeting details..."
                  />

                  <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                    Add Note
                  </button>
                </form>
              </div>

              <div className="card p-6">
                <h2 className="mb-5 text-xl font-bold text-slate-900">
                  Notes
                </h2>

                {notes.length === 0 ? (
                  <p className="text-sm text-slate-500">No notes added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div
                        key={note._id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-sm text-slate-800">
                          {note.content}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-xs text-slate-500">
                            By {note.createdBy} •{" "}
                            {new Date(note.createdAt).toLocaleString()}
                          </p>

                          <button
                            onClick={() => deleteNote(note._id)}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  Pipeline Status
                </h2>

                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(e.target.value as LeadStatus)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <p className="mt-3 text-sm text-slate-500">
                  Current status:{" "}
                  <span className="font-semibold text-slate-800">
                    {lead.status}
                  </span>
                </p>
              </div>

              <div className="card p-6">
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  Dates
                </h2>

                <Info
                  label="Created Date"
                  value={new Date(lead.createdAt).toLocaleString()}
                />

                <div className="mt-4">
                  <Info
                    label="Updated Date"
                    value={new Date(lead.updatedAt).toLocaleString()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}