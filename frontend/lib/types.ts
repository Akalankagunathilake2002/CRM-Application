export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type LeadSource =
  | "Website"
  | "LinkedIn"
  | "Referral"
  | "Cold Email"
  | "Event"
  | "Other";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Lead {
  _id: string;
  leadName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  leadSource: LeadSource;
  assignedSalesperson: string;
  status: LeadStatus;
  estimatedDealValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  _id: string;
  lead: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalEstimatedDealValue: number;
  totalWonDealValue: number;
}