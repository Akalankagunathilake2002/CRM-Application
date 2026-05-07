"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Filter,
  LineChart,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ChatBot from "@/components/ChatBot";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const features = [
  {
    title: "Lead Management",
    desc: "Create, view, update, and delete sales leads with all important customer details.",
    icon: Users,
  },
  {
    title: "Pipeline Tracking",
    desc: "Track progress through New, Contacted, Qualified, Proposal Sent, Won, and Lost stages.",
    icon: LineChart,
  },
  {
    title: "Lead Notes",
    desc: "Add internal notes after calls, emails, meetings, and follow-ups.",
    icon: MessageSquareText,
  },
  {
    title: "Search & Filtering",
    desc: "Filter leads by status, source, salesperson, and search by name, company, or email.",
    icon: Search,
  },
];

const workflow = [
  "Login using secure test credentials",
  "Create a new lead with company and contact details",
  "Update lead status as the sales conversation moves forward",
  "Add notes after calls, emails, or meetings",
  "Use dashboard cards to understand CRM performance",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden px-6 pt-24">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop"
            alt="Sales team CRM background"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 py-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-xl">
              <Sparkles size={16} className="text-blue-200" />
              Full-stack CRM Lead Management System
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Manage leads.
              <span className="block text-blue-200">Close deals faster.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-100">
              LeadFlow CRM helps small sales teams create leads, track pipeline
              progress, add notes, filter opportunities, and view sales
              dashboard insights in one modern full-stack application.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-700 active:scale-95"
              >
                Login to CRM
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <HeroStat countTo={6} suffix="+" label="Pipeline Stages" />
              <HeroStat countTo={100} suffix="%" label="CRUD Ready" />
              <HeroStat countTo={24} suffix="/7" label="CRM Access" />
            </div>
          </motion.div>

          {/* Reference-style moving image area */}
          <div className="relative hidden h-[590px] lg:block">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-12 top-10 h-[390px] w-[390px] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop"
                alt="CRM team working"
                className="h-full w-full rounded-[1.5rem] object-cover"
              />
            </motion.div>

            <FloatingCard
              className="absolute right-0 top-24 animate-float-delay"
              icon={<ShieldCheck size={20} />}
              title="Secure CRM Login"
              text="JWT protected access"
            />

            <FloatingCard
              className="absolute right-4 top-56 animate-float-slow"
              icon={<BarChart3 size={20} />}
              title="Live Dashboard"
              text="Pipeline values updated"
            />

            <FloatingCard
              className="absolute bottom-28 left-0 animate-float-delay"
              icon={<MessageSquareText size={20} />}
              title="Lead Notes"
              text="Call and meeting updates"
            />

            <FloatingCard
              className="absolute bottom-12 right-16 animate-float"
              icon={<Users size={20} />}
              title="Sales Team Flow"
              text="Assigned salesperson tracking"
            />

            <div className="absolute bottom-4 right-0 flex gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20">
                <ArrowLeft size={20} />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Small Info Strip */}
      <section className="border-y border-slate-200 bg-white px-6 py-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto grid max-w-7xl gap-5 text-center sm:grid-cols-3"
        >
          <motion.div variants={fadeInUp}>
            <InfoStrip
              icon={<ShieldCheck size={24} />}
              title="Secure Login"
              text="CRM access is protected using JWT authentication."
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <InfoStrip
              icon={<Wallet size={24} />}
              title="Persistent Data"
              text="Leads and notes are stored in MongoDB Atlas."
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <InfoStrip
              icon={<BarChart3 size={24} />}
              title="Dashboard Ready"
              text="View lead counts and deal values clearly."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionHeading
              badge="Features"
              title="Everything needed for a simple CRM"
              description="This system includes the core assessment features: authentication, lead CRUD, notes, dashboard statistics, search, filtering, and database persistence."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-black text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
              Workflow
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              From new lead to closed deal
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              The system follows a real sales workflow. A user logs in, creates
              a lead, updates its pipeline status, adds communication notes, and
              uses dashboard values to understand sales performance.
            </p>

            <div className="mt-8 space-y-4">
              {workflow.map((item) => (
                <WorkflowItem key={item} text={item} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[2.5rem] bg-slate-950 p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                alt="Dashboard analytics"
                className="h-[430px] w-full rounded-[2rem] object-cover opacity-90"
              />
            </div>

            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-8 -left-4 rounded-3xl bg-blue-600 p-6 text-white shadow-2xl md:-left-8"
            >
              <Target size={32} />
              <h3 className="mt-3 text-2xl font-black">Pipeline Tracking</h3>
              <p className="mt-1 text-sm text-blue-100">
                New → Qualified → Won
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section
        id="dashboard"
        className="bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">
                Dashboard
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                CRM statistics at a glance
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                The dashboard displays total leads, new leads, qualified leads,
                won leads, lost leads, and deal values.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                View Dashboard
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-5 sm:grid-cols-2 lg:col-span-2"
            >
              <motion.div variants={fadeInUp}>
                <PreviewCard
                  title="Total Leads"
                  countTo={128}
                  icon={<Users />}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <PreviewCard
                  title="Qualified Leads"
                  countTo={34}
                  icon={<CheckCircle2 />}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <PreviewCard
                  title="Won Leads"
                  countTo={18}
                  icon={<TrendingUp />}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <PreviewCard
                  title="Estimated Value"
                  countTo={2.4}
                  prefix="Rs. "
                  suffix="M"
                  decimals={1}
                  icon={<Wallet />}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionHeading
              badge="Benefits"
              title="Why this CRM is useful"
              description="The project solves practical problems: organizing leads, tracking communication, improving follow-ups, and understanding sales pipeline value."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={fadeInUp}>
              <BenefitCard
                title="Better Organization"
                text="All leads are stored with contact details, company, source, salesperson, status, and deal value."
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BenefitCard
                title="Clear History"
                text="Lead notes help the team remember every call, email, meeting, and follow-up."
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BenefitCard
                title="Fast Decisions"
                text="Dashboard stats help understand total leads, won leads, lost leads, and deal value."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Tech Stack"
            title="Modern full-stack setup"
            description="Next.js, TypeScript, Node.js, Express, MongoDB, JWT, and Tailwind CSS."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 md:grid-cols-5"
          >
            <motion.div variants={fadeInUp}>
              <TechCard title="Next.js" text="Frontend UI" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TechCard title="TypeScript" text="Safer code" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TechCard title="Express.js" text="Backend API" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TechCard title="MongoDB" text="Database" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TechCard title="JWT" text="Authentication" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-center text-white shadow-2xl md:p-16"
        >
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to manage your CRM leads?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-50">
            Login using the test credentials and start creating leads, adding
            notes, updating statuses, applying filters, and viewing dashboard
            statistics.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-blue-700 transition hover:scale-110 hover:bg-blue-50"
          >
            Login Now
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <PublicFooter />
    </main>
  );
}

/* Live count component */
function CountNumber({
  end,
  duration = 1600,
  decimals = 0,
}: {
  end: number;
  duration?: number;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = end * easedProgress;

      setValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{value.toFixed(decimals)}</>;
}

function HeroStat({
  countTo,
  suffix,
  label,
}: {
  countTo: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl">
      <h3 className="text-2xl font-black">
        <CountNumber end={countTo} />
        {suffix}
      </h3>

      <p className="mt-1 text-xs font-bold text-slate-200">{label}</p>
    </div>
  );
}

function FloatingCard({
  icon,
  title,
  text,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`z-20 flex min-w-[230px] items-center gap-4 rounded-2xl bg-white p-4 shadow-2xl ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h4 className="text-sm font-black text-slate-950">{title}</h4>
        <p className="text-xs font-semibold text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function InfoStrip({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:bg-white hover:shadow-xl">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
        {badge}
      </p>

      <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function WorkflowItem({ text }: { text: string }) {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <CheckCircle2 className="mt-0.5 text-blue-600" size={20} />
      <p className="font-semibold text-slate-700">{text}</p>
    </motion.div>
  );
}

function PreviewCard({
  title,
  countTo,
  icon,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  title: string;
  countTo: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 shadow-xl backdrop-blur transition hover:bg-white/20">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
        {icon}
      </div>

      <p className="text-sm text-slate-300">{title}</p>

      <h3 className="mt-2 text-4xl font-black text-white">
        {prefix}
        <CountNumber end={countTo} decimals={decimals} />
        {suffix}
      </h3>
    </div>
  );
}

function BenefitCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Filter size={26} />
      </div>

      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function TechCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-xl">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Zap size={24} />
      </div>

      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}