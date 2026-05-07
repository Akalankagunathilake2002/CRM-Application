"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import api from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  const createLead = async (data: any) => {
    try {
      setLoading(true);

      await api.post("/leads", data);

      toast.success("Lead created successfully");
      router.push("/leads");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Lead</h1>
          <p className="mt-1 text-slate-500">
            Add a new potential customer to your CRM.
          </p>
        </div>

        <LeadForm onSubmit={createLead} loading={loading} />
      </section>
    </main>
  );
}