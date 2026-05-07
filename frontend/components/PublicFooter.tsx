import Link from "next/link";
import { BarChart3, Code2, Mail, ShieldCheck } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <BarChart3 size={22} />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                LeadFlow CRM
              </h2>
              <p className="text-xs text-slate-500">
                Full-stack CRM Assessment Project
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            A modern CRM Lead Management System built with Next.js, Node.js,
            Express, MongoDB, and JWT authentication for managing sales leads,
            notes, filters, and dashboard analytics.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-950">Project Features</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Lead CRUD</li>
            <li>Pipeline Status</li>
            <li>Lead Notes</li>
            <li>Dashboard Stats</li>
            <li>Search and Filtering</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-slate-950">Tech Stack</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Next.js + TypeScript</li>
            <li>Node.js + Express</li>
            <li>MongoDB Atlas</li>
            <li>JWT Authentication</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-slate-500 md:flex-row">
          <p>© 2026 LeadFlow CRM. Built for full-stack intern assessment.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck size={16} />
              JWT Secured
            </span>

            <span className="flex items-center gap-1">
              <Mail size={16} />
              admin@example.com
            </span>

            <span className="flex items-center gap-1">
              <Code2 size={16} />
              Public Repo Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}