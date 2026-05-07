"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import api from "@/lib/api";
import { DashboardStats } from "@/lib/types";
import { isLoggedIn } from "@/lib/auth";
import toast from "react-hot-toast";

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

  const fetchStats = async () => {
    try {
      const res = await api.get("/leads/dashboard/stats");
      setStats(res.data.stats);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    fetchStats();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">
            Overview of your sales leads and deal values.
          </p>
        </div>

        {loading ? (
          <div className="card p-8 text-center text-slate-500">
            Loading dashboard...
          </div>
        ) : (
          <DashboardCards stats={stats} />
        )}
      </section>
    </main>
  );
}