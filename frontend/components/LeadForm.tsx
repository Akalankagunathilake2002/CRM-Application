"use client";

import { useState } from "react";
import { Lead, LeadSource, LeadStatus } from "@/lib/types";

interface LeadFormData {
  leadName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  leadSource: LeadSource;
  assignedSalesperson: string;
  status: LeadStatus;
  estimatedDealValue: number;
}

interface Props {
  initialData?: Lead;
  onSubmit: (data: LeadFormData) => void;
  loading: boolean;
}

const leadSources: LeadSource[] = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Email",
  "Event",
  "Other",
];

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function LeadForm({ initialData, onSubmit, loading }: Props) {
  const [formData, setFormData] = useState<LeadFormData>({
    leadName: initialData?.leadName || "",
    companyName: initialData?.companyName || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    leadSource: initialData?.leadSource || "Website",
    assignedSalesperson: initialData?.assignedSalesperson || "",
    status: initialData?.status || "New",
    estimatedDealValue: initialData?.estimatedDealValue || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimatedDealValue" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Lead Name
          </label>
          <input
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Enter lead name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Company Name
          </label>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="lead@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="0771234567"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Lead Source
          </label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className={inputClass}
          >
            {leadSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Assigned Salesperson
          </label>
          <input
            name="assignedSalesperson"
            value={formData.assignedSalesperson}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Akalanka"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Estimated Deal Value
          </label>
          <input
            name="estimatedDealValue"
            type="number"
            min="0"
            value={formData.estimatedDealValue}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="150000"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : initialData ? "Update Lead" : "Create Lead"}
      </button>
    </form>
  );
}