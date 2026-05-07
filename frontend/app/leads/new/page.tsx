"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  FilePlus2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

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
                <FilePlus2 size={16} />
                New Lead Entry
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950">
                Create Lead
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Add a new potential customer to your CRM. Enter contact details,
                company information, lead source, assigned salesperson, status,
                and estimated deal value.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
              <HeaderInfoCard
                icon={<ShieldCheck size={20} />}
                title="Protected"
                text="Only logged-in users can create leads"
              />

              <HeaderInfoCard
                icon={<Sparkles size={20} />}
                title="CRM Ready"
                text="Saved directly to MongoDB"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="grid gap-8 xl:grid-cols-5">
          {/* Form Section */}
          <div className="xl:col-span-3">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-950">
                Lead Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill in the required details to create a new lead record.
              </p>
            </div>

            <LeadForm onSubmit={createLead} loading={loading} />
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 xl:col-span-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={26} />
              </div>

              <h3 className="text-xl font-black text-slate-950">
                What is a lead?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                A lead is a potential customer who may be interested in your
                product or service. In this CRM, each lead stores contact
                details, company details, pipeline status, and estimated deal
                value.
              </p>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">
                Required Lead Details
              </h3>

              <div className="mt-5 space-y-3">
                <ChecklistItem icon={<UserRound size={18} />} text="Lead name" />
                <ChecklistItem
                  icon={<BriefcaseBusiness size={18} />}
                  text="Company name"
                />
                <ChecklistItem icon={<Mail size={18} />} text="Email address" />
                <ChecklistItem icon={<Phone size={18} />} text="Phone number" />
                <ChecklistItem
                  icon={<BadgeDollarSign size={18} />}
                  text="Estimated deal value"
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">
                CRM Entry Tips
              </h3>

              <div className="mt-5 space-y-4">
                <TipItem text="Use a real company name to make the demo more realistic." />
                <TipItem text="Choose the correct lead source like Website, LinkedIn, or Referral." />
                <TipItem text="Assign a salesperson so filtering works properly." />
                <TipItem text="Set an estimated deal value to update dashboard totals." />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function HeaderInfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function ChecklistItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-slate-700 shadow-sm">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </span>
      {text}
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