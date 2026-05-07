"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import LeadTable from "@/components/LeadTable";
import api from "@/lib/api";
import { Lead, LeadSource, LeadStatus } from "@/lib/types";
import { isLoggedIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const leadSources: LeadSource[] = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Email",
  "Event",
  "Other",
];

export default function LeadsPage() {
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [assignedSalesperson, setAssignedSalesperson] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const params: Record<string, string> = {};

      if (search) params.search = search;
      if (status) params.status = status;
      if (leadSource) params.leadSource = leadSource;
      if (assignedSalesperson) params.assignedSalesperson = assignedSalesperson;

      const res = await api.get("/leads", { params });
      setLeads(res.data.leads);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete lead");
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    fetchLeads();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
            <p className="mt-1 text-slate-500">
              Manage sales leads, pipeline status, and deal value.
            </p>
          </div>

          <Link
            href="/leads/new"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Lead
          </Link>
        </div>

        <div className="card mb-6 grid gap-4 p-5 md:grid-cols-4">
          <input
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            placeholder="Search name, company, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {leadSources.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            placeholder="Salesperson"
            value={assignedSalesperson}
            onChange={(e) => setAssignedSalesperson(e.target.value)}
          />

          <button
            onClick={fetchLeads}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Apply Filters
          </button>

          <button
            onClick={() => {
              setSearch("");
              setStatus("");
              setLeadSource("");
              setAssignedSalesperson("");

              setTimeout(() => {
                fetchLeads();
              }, 100);
            }}
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Clear
          </button>
        </div>

        {loading ? (
          <div className="card p-8 text-center text-slate-500">
            Loading leads...
          </div>
        ) : (
          <LeadTable leads={leads} onDelete={deleteLead} />
        )}
      </section>
    </main>
  );
}