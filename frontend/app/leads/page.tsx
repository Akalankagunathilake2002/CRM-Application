"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  BriefcaseBusiness,
  CircleCheckBig,
  CircleX,
  Filter,
  FilePlus2,
  Plus,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
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
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
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

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setLeadSource("");
    setAssignedSalesperson("");

    setTimeout(() => {
      fetchLeads();
    }, 100);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeads();
    toast.success("Leads refreshed");
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    fetchLeads();
  }, [router]);

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const wonLeads = leads.filter((lead) => lead.status === "Won").length;
  const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

  const hasFilters = Boolean(
    search || status || leadSource || assignedSalesperson
  );

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <Navbar />

      <section className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-white via-blue-50 to-cyan-50 p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                <BriefcaseBusiness size={16} />
                CRM Lead Workspace
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950">
                Leads
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Manage your sales leads, track pipeline status, filter by
                source or salesperson, and open each lead to view notes and
                details.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 disabled:opacity-60"
              >
                <RefreshCcw
                  size={18}
                  className={refreshing ? "animate-spin" : ""}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>

              <Link
                href="/leads/new"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Lead
              </Link>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <LeadSummaryCard
            title="Visible Leads"
            value={totalLeads.toString()}
            subtitle="Based on current filters"
            icon={<Users size={24} />}
            bg="bg-blue-50"
            text="text-blue-600"
          />

          <LeadSummaryCard
            title="New Leads"
            value={newLeads.toString()}
            subtitle="Recently added opportunities"
            icon={<FilePlus2 size={24} />}
            bg="bg-cyan-50"
            text="text-cyan-600"
          />

          <LeadSummaryCard
            title="Won Deals"
            value={wonLeads.toString()}
            subtitle="Successfully closed leads"
            icon={<CircleCheckBig size={24} />}
            bg="bg-emerald-50"
            text="text-emerald-600"
          />

          <LeadSummaryCard
            title="Lost Leads"
            value={lostLeads.toString()}
            subtitle="Not converted opportunities"
            icon={<CircleX size={24} />}
            bg="bg-rose-50"
            text="text-rose-600"
          />
        </div>

        {/* Filter Panel */}
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <SlidersHorizontal size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Search & Filter Leads
                  </h2>
                  <p className="text-sm text-slate-500">
                    Find leads by name, company, email, status, source, or
                    salesperson.
                  </p>
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                <Filter size={16} />
                Filters active
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                placeholder="Search name, company, email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              placeholder="Assigned salesperson"
              value={assignedSalesperson}
              onChange={(e) => setAssignedSalesperson(e.target.value)}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Filter size={18} />
              Apply Filters
            </button>

            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              <X size={18} />
              Clear
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div>
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Lead Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {loading
                  ? "Loading lead records..."
                  : `${leads.length} lead record${
                      leads.length === 1 ? "" : "s"
                    } found.`}
              </p>
            </div>
          </div>

          {loading ? (
            <LeadTableSkeleton />
          ) : (
            <LeadTable leads={leads} onDelete={deleteLead} />
          )}
        </div>
      </section>
    </main>
  );
}

function LeadSummaryCard({
  title,
  value,
  subtitle,
  icon,
  bg,
  text,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${text}`}
      >
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-500">{title}</p>

      <h3 className="mt-2 text-3xl font-black text-slate-950">{value}</h3>

      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function LeadTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="divide-y divide-slate-100">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid animate-pulse gap-4 px-6 py-5 md:grid-cols-6"
          >
            <div className="h-4 rounded bg-slate-200 md:col-span-2" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}