import {
  BadgeDollarSign,
  CircleCheckBig,
  CircleX,
  FilePlus,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
}

export default function DashboardCards({ stats }: Props) {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: FilePlus,
    },
    {
      title: "Qualified Leads",
      value: stats.qualifiedLeads,
      icon: CircleCheckBig,
    },
    {
      title: "Won Leads",
      value: stats.wonLeads,
      icon: Trophy,
    },
    {
      title: "Lost Leads",
      value: stats.lostLeads,
      icon: CircleX,
    },
    {
      title: "Estimated Value",
      value: `Rs. ${stats.totalEstimatedDealValue.toLocaleString()}`,
      icon: Wallet,
    },
    {
      title: "Won Deal Value",
      value: `Rs. ${stats.totalWonDealValue.toLocaleString()}`,
      icon: BadgeDollarSign,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="card p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon size={24} />
            </div>

            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}