"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import api from "@/lib/api";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      saveAuth(res.data.token, res.data.user);

      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-600/30 blur-3xl" />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left Image Section */}
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:block">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"
            alt="CRM sales team"
            className="h-full w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
              <Sparkles size={16} className="text-blue-300" />
              Sales Lead Management Platform
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight">
              Track leads, notes, pipeline and sales value in one CRM.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-slate-200">
              Built with Next.js, Node.js, Express, JWT authentication, and
              MongoDB database persistence.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <MiniStat value="JWT" label="Auth" />
              <MiniStat value="CRUD" label="Leads" />
              <MiniStat value="Mongo" label="Database" />
            </div>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 shadow-lg shadow-blue-600/30">
                  <ShieldCheck size={30} />
                </div>

                <h1 className="text-3xl font-black">Welcome Back</h1>
                <p className="mt-2 text-sm text-slate-300">
                  Login to access your CRM dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      type="email"
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Lock size={18} className="text-slate-400" />
                    <input
                      type="password"
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password123"
                      required
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login to Dashboard"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
                <p className="font-bold text-white">Test Credentials</p>
                <p className="mt-1">Email: admin@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <h3 className="text-xl font-black">{value}</h3>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  );
}