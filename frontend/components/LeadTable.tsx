"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Lead } from "@/lib/types";

interface Props {
  leads: Lead[];
  onDelete: (id: string) => void;
}

const statusClass = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-50 text-blue-700";
    case "Contacted":
      return "bg-purple-50 text-purple-700";
    case "Qualified":
      return "bg-green-50 text-green-700";
    case "Proposal Sent":
      return "bg-yellow-50 text-yellow-700";
    case "Won":
      return "bg-emerald-50 text-emerald-700";
    case "Lost":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default function LeadTable({ leads, onDelete }: Props) {
  if (leads.length === 0) {
    return (
      <div className="card p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No leads found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Create a new lead or change your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50 text-sm text-slate-600">
            <tr>
              <th className="px-5 py-4">Lead</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Source</th>
              <th className="px-5 py-4">Salesperson</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Value</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    {lead.leadName}
                  </p>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {lead.companyName}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {lead.leadSource}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {lead.assignedSalesperson}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  Rs. {lead.estimatedDealValue.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/leads/${lead._id}`}
                      className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                    >
                      <Eye size={16} />
                    </Link>

                    <Link
                      href={`/leads/${lead._id}?edit=true`}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      onClick={() => onDelete(lead._id)}
                      className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}