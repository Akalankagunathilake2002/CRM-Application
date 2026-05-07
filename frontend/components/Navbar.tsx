"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const linkClass = (path: string) =>
    `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">CRM</h1>
        <p className="text-sm text-slate-500">Lead Management</p>
      </div>

      <nav className="space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="/leads" className={linkClass("/leads")}>
          <Users size={18} />
          Leads
        </Link>
      </nav>

      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-4 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name || "Admin User"}
          </p>
          <p className="text-xs text-slate-500">
            {user?.email || "admin@example.com"}
          </p>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}