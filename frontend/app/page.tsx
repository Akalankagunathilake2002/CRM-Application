"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Filter,
  Lock,
  MessageSquareText,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
];

const features = [
  {
    title: "Lead Management",
    desc: "Create, update, track, and organize every sales lead in one clean workspace.",
    icon: Users,
  },
  {
    title: "Pipeline Tracking",
    desc: "Move leads through New, Contacted, Qualified, Proposal Sent, Won, and Lost stages.",
    icon: BarChart3,
  },
  {
    title: "Lead Notes",
    desc: "Add call notes, meeting updates, follow-up reminders, and sales communication history.",
    icon: MessageSquareText,
  },
  {
    title: "Search & Filters",
    desc: "Quickly find leads by name, company, email, source, status, or salesperson.",
    icon: Search,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold">LeadFlow CRM</h1>
              <p className="text-xs text-slate-400">Sales Lead Management</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#workflow" className="hover:text-white">
              Workflow
            </a>
            <a href="#dashboard" className="hover:text-white">
              Dashboard
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pb-24 pt-36">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              <CheckCircle2 size={16} />
              Full-stack CRM with Next.js, Node.js and MongoDB
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Manage leads.
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Close more deals.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              LeadFlow CRM helps small sales teams manage leads, track sales
              pipeline progress, add notes, filter opportunities, and view
              dashboard insights in one modern web application.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-500"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Features
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <HeroStat value="6+" label="Lead Statuses" />
              <HeroStat value="100%" label="CRUD Ready" />
              <HeroStat value="JWT" label="Secure Login" />
            </div>
          </div>

          {/* Moving Image Cards */}
          <div className="relative h-[560px]">
            <div className="absolute left-8 top-4 h-72 w-64 animate-float overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
              <img
                src={heroImages[0]}
                alt="Sales team working"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute right-4 top-24 h-80 w-72 animate-float-delay overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
              <img
                src={heroImages[1]}
                alt="CRM dashboard discussion"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 left-24 h-64 w-80 animate-float-slow overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
              <img
                src={heroImages[2]}
                alt="Sales meeting"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-2 right-10 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <p className="text-sm text-slate-300">Total Deal Value</p>
              <h3 className="mt-1 text-3xl font-black">Rs. 850,000</h3>
              <p className="mt-2 text-sm text-emerald-300">
                +24% pipeline growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo/Info Strip */}
      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 text-center sm:grid-cols-3">
          <InfoStrip title="Authentication" text="Protected CRM access" />
          <InfoStrip title="Persistent Data" text="MongoDB Atlas database" />
          <InfoStrip title="Sales Dashboard" text="Real-time CRM statistics" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
              Features
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Everything a simple sales team needs
            </h2>
            <p className="mt-5 text-slate-300">
              This CRM includes the main features required for lead management:
              CRUD, notes, dashboard, status update, filtering, and search.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-xl transition hover:-translate-y-2 hover:bg-white/[0.08]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
              Workflow
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              A clean pipeline from new lead to won deal
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Sales teams can create leads, update their progress, add internal
              notes, and filter leads based on source, status, and assigned
              salesperson.
            </p>

            <div className="mt-8 space-y-4">
              <WorkflowItem text="Create a new lead with company and contact details" />
              <WorkflowItem text="Move the lead through the sales pipeline stages" />
              <WorkflowItem text="Add notes after calls, emails, and meetings" />
              <WorkflowItem text="Use dashboard insights to understand performance" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-slate-950 p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                alt="Dashboard analytics"
                className="h-[420px] w-full rounded-[1.5rem] object-cover opacity-90"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 rounded-3xl bg-blue-600 p-6 text-white shadow-2xl">
              <BarChart3 size={32} />
              <h3 className="mt-3 text-2xl font-black">Dashboard Ready</h3>
              <p className="mt-1 text-sm text-blue-100">
                Leads, values, wins and losses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
                Dashboard
              </p>
              <h2 className="mt-4 text-4xl font-black">
                View CRM performance clearly
              </h2>
              <p className="mt-5 leading-7 text-slate-300">
                The dashboard shows total leads, new leads, qualified leads, won
                leads, lost leads, total estimated deal value, and won deal
                value.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
              <PreviewCard title="Total Leads" value="128" />
              <PreviewCard title="Qualified Leads" value="34" />
              <PreviewCard title="Won Leads" value="18" />
              <PreviewCard title="Estimated Value" value="Rs. 2.4M" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-center shadow-2xl md:p-16">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to manage your leads?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Login using the test credentials and start creating leads, adding
            notes, updating statuses, and viewing dashboard statistics.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Login to CRM
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        LeadFlow CRM — Full-stack CRM Assessment Project
      </footer>
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <h3 className="text-2xl font-black">{value}</h3>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function InfoStrip({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}

function WorkflowItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <CheckCircle2 className="mt-0.5 text-blue-600" size={20} />
      <p className="font-medium text-slate-700">{text}</p>
    </div>
  );
}

function PreviewCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-xl">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-300">
        <Filter size={24} />
      </div>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-4xl font-black">{value}</h3>
    </div>
  );
}