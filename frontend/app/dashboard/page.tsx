"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock3,
  FilePlus2,
  RefreshCcw,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import api from "@/lib/api";
import { DashboardStats } from "@/lib/types";
import { isLoggedIn } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    wonLeads: 0,
    lostLeads: 0,
    totalEstimatedDealValue: 0,
    totalWonDealValue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await api.get("/leads/dashboard/stats");
      setStats(res.data.stats);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    toast.success("Dashboard refreshed");
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    fetchStats();
  }, [router]);

  const conversionRate =
    stats.totalLeads > 0
      ? Math.round((stats.wonLeads / stats.totalLeads) * 100)
      : 0;

  const lostRate =
    stats.totalLeads > 0
      ? Math.round((stats.lostLeads / stats.totalLeads) * 100)
      : 0;

  const averageDealValue =
    stats.totalLeads > 0
      ? Math.round(stats.totalEstimatedDealValue / stats.totalLeads)
      : 0;

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <Navbar />

      <section className="ml-64 p-8">
        {/* Page Header */}
        <div className="mb-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-white via-blue-50 to-cyan-50 p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                <BarChart3 size={16} />
                CRM Sales Overview
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950">
                Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                View your lead summary, sales pipeline progress, deal values,
                and quick CRM insights in one clean dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                <CalendarDays size={18} className="text-blue-600" />
                Today
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                <Clock3 size={18} className="text-blue-600" />
                Live data
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
              >
                <RefreshCcw
                  size={18}
                  className={refreshing ? "animate-spin" : ""}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* Soft Summary Row */}
        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <TopSummaryCard
            title="Total Leads"
            value={stats.totalLeads.toString()}
            subtitle="All leads in your CRM"
            icon={<Users size={24} />}
            bg="bg-blue-50"
            text="text-blue-600"
          />

          <TopSummaryCard
            title="Won Deals"
            value={stats.wonLeads.toString()}
            subtitle={`${conversionRate}% conversion rate`}
            icon={<CircleCheckBig size={24} />}
            bg="bg-emerald-50"
            text="text-emerald-600"
          />

          <TopSummaryCard
            title="Lost Leads"
            value={stats.lostLeads.toString()}
            subtitle={`${lostRate}% lost rate`}
            icon={<CircleX size={24} />}
            bg="bg-rose-50"
            text="text-rose-600"
          />

          <TopSummaryCard
            title="Avg. Deal Value"
            value={`Rs. ${averageDealValue.toLocaleString()}`}
            subtitle="Estimated average value"
            icon={<Wallet size={24} />}
            bg="bg-cyan-50"
            text="text-cyan-600"
          />
        </div>

        {/* Existing Dashboard Cards */}
        <div className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Lead Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Key CRM statistics generated from your MongoDB lead records.
              </p>
            </div>
          </div>

          {loading ? (
            <DashboardSkeleton />
          ) : (
            <DashboardCards stats={stats} />
          )}
        </div>

        {!loading && (
          <>
            {/* Main Insights */}
            <div className="grid gap-6 lg:grid-cols-3">
              <LightInsightCard
                icon={<TrendingUp size={26} />}
                title="Sales Conversion"
                value={`${conversionRate}%`}
                description="Percentage of total leads converted into won deals."
                progress={conversionRate}
                accent="bg-blue-600"
              />

              <LightInsightCard
                icon={<FilePlus2 size={26} />}
                title="New Lead Ratio"
                value={`${
                  stats.totalLeads > 0
                    ? Math.round((stats.newLeads / stats.totalLeads) * 100)
                    : 0
                }%`}
                description="Percentage of leads that are still in the New stage."
                progress={
                  stats.totalLeads > 0
                    ? Math.round((stats.newLeads / stats.totalLeads) * 100)
                    : 0
                }
                accent="bg-cyan-600"
              />

              <LightInsightCard
                icon={<CircleCheckBig size={26} />}
                title="Qualified Ratio"
                value={`${
                  stats.totalLeads > 0
                    ? Math.round(
                        (stats.qualifiedLeads / stats.totalLeads) * 100
                      )
                    : 0
                }%`}
                description="Percentage of leads that reached the Qualified stage."
                progress={
                  stats.totalLeads > 0
                    ? Math.round(
                        (stats.qualifiedLeads / stats.totalLeads) * 100
                      )
                    : 0
                }
                accent="bg-emerald-600"
              />
            </div>

            {/* Bottom Section */}
            <div className="mt-8 grid gap-6 lg:grid-cols-5">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm lg:col-span-3">
                <h2 className="text-2xl font-black text-slate-950">
                  Sales Pipeline Summary
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Your CRM has{" "}
                  <span className="font-bold text-blue-600">
                    {stats.totalLeads}
                  </span>{" "}
                  total leads. Currently,{" "}
                  <span className="font-bold text-cyan-600">
                    {stats.newLeads}
                  </span>{" "}
                  leads are new,{" "}
                  <span className="font-bold text-emerald-600">
                    {stats.qualifiedLeads}
                  </span>{" "}
                  are qualified,{" "}
                  <span className="font-bold text-green-600">
                    {stats.wonLeads}
                  </span>{" "}
                  are won, and{" "}
                  <span className="font-bold text-rose-600">
                    {stats.lostLeads}
                  </span>{" "}
                  are lost.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <MiniValueBox
                    label="Total Estimated Value"
                    value={`Rs. ${stats.totalEstimatedDealValue.toLocaleString()}`}
                    icon={<Wallet size={20} />}
                  />

                  <MiniValueBox
                    label="Total Won Value"
                    value={`Rs. ${stats.totalWonDealValue.toLocaleString()}`}
                    icon={<CircleCheckBig size={20} />}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-7 shadow-sm lg:col-span-2">
                <h2 className="text-2xl font-black text-slate-950">
                  Quick Tips
                </h2>

                <div className="mt-5 space-y-4">
                  <TipItem text="Add notes after every call or meeting." />
                  <TipItem text="Update lead status when progress changes." />
                  <TipItem text="Use filters to find qualified leads faster." />
                  <TipItem text="Review won value to measure performance." />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function TopSummaryCard({
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
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${text}`}>
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-500">{title}</p>

      <h3 className="mt-2 text-3xl font-black text-slate-950">{value}</h3>

      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function LightInsightCard({
  icon,
  title,
  value,
  description,
  progress,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  progress: number;
  accent: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-blue-600">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-500">{title}</p>

      <h3 className="mt-2 text-4xl font-black text-slate-950">{value}</h3>

      <p className="mt-3 min-h-[55px] text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${accent} transition-all duration-700`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MiniValueBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-500">{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{value}</h3>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
      <span>{text}</span>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 h-12 w-12 rounded-2xl bg-slate-200" />
          <div className="mb-3 h-4 w-28 rounded bg-slate-200" />
          <div className="h-8 w-20 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}