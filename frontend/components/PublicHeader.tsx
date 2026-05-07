"use client";

import Link from "next/link";
import { BarChart3, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Benefits", href: "#benefits" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-lg font-black text-slate-950">LeadFlow CRM</h1>
            <p className="text-xs font-medium text-slate-500">
              Sales Lead Management
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Sign In
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Sparkles size={16} />
            Open CRM
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/login"
              className="mt-2 rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white"
            >
              Login to CRM
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}