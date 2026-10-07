export type FounderSection =
  | "Overview"
  | "Clients"
  | "Registrations"
  | "Integrations"
  | "Audit log"
  | "Founder approvals";

export type FounderClient = {
  id: string;
  name: string;
  business: string;
  email: string;
  lastLogin: string;
  lastLogout: string;
  requestedCalls: number;
  payments: number;
  walletBalance: number;
  campaignStatus: "Running" | "Paused" | "Completed" | "Queued";
  eta: string;
  trialUsed: boolean;
  cost: number;
  revenue: number;
};

export type RegistrationRequest = {
  id: string;
  name: string;
  business: string;
  email: string;
  industry: string;
  submittedAt: string;
  verification: "Email verified" | "Phone pending" | "Business pending";
};

export const founderSections: FounderSection[] = [
  "Overview", "Clients", "Registrations", "Integrations", "Audit log", "Founder approvals",
];

export const founderClients: FounderClient[] = [
  { id: "VL-2048", name: "Aarav Mehta", business: "Northstar Realty", email: "aarav@example.test", lastLogin: "Today, 10:42 AM", lastLogout: "Yesterday, 6:18 PM", requestedCalls: 18420, payments: 8, walletBalance: 12450, campaignStatus: "Running", eta: "About 1h 24m", trialUsed: true, cost: 23800, revenue: 41200 },
  { id: "VL-2047", name: "Priya Reddy", business: "Vidya Learning Group", email: "priya@example.test", lastLogin: "Today, 9:16 AM", lastLogout: "Yesterday, 4:52 PM", requestedCalls: 12680, payments: 5, walletBalance: 7850, campaignStatus: "Running", eta: "About 2h 10m", trialUsed: true, cost: 15400, revenue: 27900 },
  { id: "VL-2046", name: "Kabir Shah", business: "OpenRoad Education", email: "kabir@example.test", lastLogin: "Yesterday, 3:08 PM", lastLogout: "Yesterday, 3:46 PM", requestedCalls: 8290, payments: 3, walletBalance: 2400, campaignStatus: "Paused", eta: "Waiting for top-up", trialUsed: true, cost: 9900, revenue: 16400 },
  { id: "VL-2045", name: "Ananya Iyer", business: "Meridian Global Pathways", email: "ananya@example.test", lastLogin: "Yesterday, 11:21 AM", lastLogout: "Yesterday, 5:09 PM", requestedCalls: 6470, payments: 4, walletBalance: 9200, campaignStatus: "Completed", eta: "Finished at 4:40 PM", trialUsed: true, cost: 8100, revenue: 15300 },
  { id: "VL-2044", name: "Rohan Nair", business: "PeopleFirst Talent", email: "rohan@example.test", lastLogin: "Oct 3, 2:14 PM", lastLogout: "Oct 3, 2:51 PM", requestedCalls: 4110, payments: 2, walletBalance: 0, campaignStatus: "Queued", eta: "Starts at 9:00 AM", trialUsed: false, cost: 5200, revenue: 9600 },
  { id: "VL-2043", name: "Meera Kulkarni", business: "Horizon Homes", email: "meera@example.test", lastLogin: "Oct 2, 4:35 PM", lastLogout: "Oct 2, 5:12 PM", requestedCalls: 2860, payments: 1, walletBalance: 1800, campaignStatus: "Completed", eta: "Finished at 5:12 PM", trialUsed: true, cost: 3600, revenue: 7100 },
];

export const registrationRequests: RegistrationRequest[] = [
  { id: "REG-0912", name: "Sana Qureshi", business: "Cedar & Stone Realty", email: "sana@example.test", industry: "Real estate", submittedAt: "12 min ago", verification: "Email verified" },
  { id: "REG-0911", name: "Dev Menon", business: "BrightPath Academy", email: "dev@example.test", industry: "Education", submittedAt: "48 min ago", verification: "Phone pending" },
  { id: "REG-0910", name: "Ishita Rao", business: "Atlas Study Abroad", email: "ishita@example.test", industry: "Study abroad", submittedAt: "2 hours ago", verification: "Business pending" },
];

export const dailyCalls = [
  { day: "Sep 22", calls: 4200 }, { day: "Sep 23", calls: 5100 },
  { day: "Sep 24", calls: 3900 }, { day: "Sep 25", calls: 6400 },
  { day: "Sep 26", calls: 7100 }, { day: "Sep 27", calls: 5600 },
  { day: "Sep 28", calls: 7800 }, { day: "Sep 29", calls: 6900 },
  { day: "Sep 30", calls: 8400 }, { day: "Oct 1", calls: 7600 },
  { day: "Oct 2", calls: 9100 }, { day: "Oct 3", calls: 8200 },
  { day: "Oct 4", calls: 9700 }, { day: "Oct 5", calls: 8800 },
];

export const integrationProviders = [
  { name: "Voice AI", provider: "Sarvam AI", state: "Mock", detail: "Adapter ready · credentials not connected" },
  { name: "Telephony", provider: "Not selected", state: "Not configured", detail: "Provider choice remains open" },
  { name: "Payments", provider: "Razorpay", state: "Mock", detail: "Test-mode adapter placeholder" },
  { name: "File storage", provider: "S3-compatible", state: "Mock", detail: "Private storage adapter placeholder" },
  { name: "Database", provider: "PostgreSQL", state: "Not configured", detail: "Using in-memory mock data" },
  { name: "Email", provider: "Not selected", state: "Not configured", detail: "OTP delivery is not connected" },
] as const;

export const initialAuditEvents = [
  { id: "AUD-8041", action: "Founder preview opened", actor: "Founder 1", target: "Founder console", time: "Today, 10:48 AM", tone: "neutral" },
  { id: "AUD-8040", action: "Wallet top-up recorded", actor: "System · mock", target: "VL-2048", time: "Today, 10:31 AM", tone: "success" },
  { id: "AUD-8039", action: "Campaign paused · low balance", actor: "System · mock", target: "VL-2046", time: "Today, 9:52 AM", tone: "warning" },
  { id: "AUD-8038", action: "Client business verification queued", actor: "System · mock", target: "VL-2045", time: "Today, 9:18 AM", tone: "neutral" },
];

export const founderApprovalRequest = {
  id: "FND-0003",
  title: "Replace the third founder account",
  requester: "Founder 1 · Maya S.",
  detail: "Proposed account: founder3@example.test",
  expiresAt: "Expires in 18 hours",
  requiredApprovals: 2,
  eligibleApprovers: ["Founder 1", "Founder 2"],
} as const;
