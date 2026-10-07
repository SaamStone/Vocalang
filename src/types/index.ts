/* ============================================================
   VOCALANG TYPE DEFINITIONS
   Shared types for the client dashboard and API layer.
   ============================================================ */

// --- Auth ---
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  businessVerified: boolean;
  businessVerificationStatus: "pending" | "approved" | "rejected" | "not_submitted";
  createdAt: string;
  lastLoginAt: string;
  twoFactorEnabled: boolean;
  freeTrialUsed: boolean;
  avatarUrl?: string;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

export interface PolicyAcceptance {
  policyType: "terms" | "privacy" | "acceptable_use";
  version: string;
  acceptedAt: string;
  ip: string;
}

// --- Wallet ---
export type TransactionType = "top_up" | "campaign_charge" | "refund" | "adjustment";
export type PaymentMethod = "upi" | "card" | "netbanking";

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  description: string;
  campaignId?: string;
  paymentMethod?: PaymentMethod;
  invoiceId?: string;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  currency: "INR";
  lastTopUpAt?: string;
  transactions: WalletTransaction[];
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  gst: number;
  total: number;
  status: "paid" | "pending" | "failed";
  createdAt: string;
  downloadUrl: string;
}

// --- Campaign ---
export type CampaignStatus =
  | "draft"
  | "queued"
  | "running"
  | "paused"
  | "low_balance"
  | "completed"
  | "stopped"
  | "failed";

export type ContactOutcome =
  | "interested"
  | "not_interested"
  | "callback"
  | "wrong_number"
  | "no_answer"
  | "busy"
  | "voicemail"
  | "do_not_call"
  | "failed";

export type ContactStatus =
  | "waiting"
  | "in_progress"
  | "done"
  | "retry"
  | "failed"
  | "do_not_call"
  | "skipped";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  industry: string;
  language: string;
  voice: "male" | "female";
  simultaneousAgents: number;
  totalContacts: number;
  contactsCalled: number;
  contactsRemaining: number;
  contactsFailed: number;
  estimatedMinutesRemaining: number;
  estimatedFinishTime: string;
  callingWindowStart: string;
  callingWindowEnd: string;
  maxRetries: number;
  costPerMinute: number;
  totalCost: number;
  totalMinutes: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  batches: ContactBatch[];
}

export interface ContactBatch {
  id: string;
  campaignId: string;
  fileName: string;
  totalContacts: number;
  validContacts: number;
  duplicatesRemoved: number;
  invalidNumbers: number;
  uploadedAt: string;
}

export interface Contact {
  id: string;
  campaignId: string;
  batchId: string;
  name: string;
  phone: string;
  email?: string;
  status: ContactStatus;
  outcome?: ContactOutcome;
  attempts: number;
  lastAttemptAt?: string;
  notes?: string;
  customFields: Record<string, string>;
}

export interface CallResult {
  id: string;
  contactId: string;
  campaignId: string;
  contactName: string;
  contactPhone: string;
  outcome: ContactOutcome;
  duration: number;
  transcript: TranscriptMessage[];
  recordingUrl?: string;
  callStartedAt: string;
  callEndedAt: string;
  retryNumber: number;
  direction?: "incoming" | "outgoing";
  topic?: string;
  summary?: string;
  sentiment?: "positive" | "neutral" | "negative" | "follow_up" | "abusive";
  whatsappStatus?: "sent" | "not_sent" | "failed";
  disconnectReason?: string;
  abusive?: boolean;
}

export interface TranscriptMessage {
  role: "agent" | "customer";
  text: string;
  timestamp: number;
}

// --- Phone Numbers ---
export interface PhoneNumber {
  id: string;
  number: string;
  type: "owned" | "rented";
  verified: boolean;
  monthlyFee: number;
  assignedCampaigns: string[];
  createdAt: string;
}

// --- Dashboard Stats ---
export interface DashboardStats {
  walletBalance: number;
  activeCampaigns: number;
  totalCallsToday: number;
  totalCallsAllTime: number;
  callsRemaining: number;
  estimatedFinishTime?: string;
  recentCampaigns: Campaign[];
}

// --- Wizard ---
export interface ColumnMapping {
  sourceColumn: string;
  targetField: "name" | "phone" | "email" | "custom" | "skip";
  customLabel?: string;
}

export interface WizardState {
  step: number;
  file?: File;
  fileName?: string;
  parsedHeaders?: string[];
  parsedRows?: Record<string, string>[];
  parsedTotalRows?: number;
  columnMappings?: ColumnMapping[];
  cleanedContacts?: {
    valid: number;
    duplicates: number;
    invalid: number;
    dndFiltered: number;
  };
  campaignName: string;
  industry: string;
  language: string;
  voice: "male" | "female";
  simultaneousAgents: number;
  callingWindowStart: string;
  callingWindowEnd: string;
  maxRetries: number;
  estimate?: {
    totalContacts: number;
    estimatedMinutes: number;
    estimatedCost: number;
    estimatedDuration: string;
    estimatedFinishTime: string;
  };
}

// --- Notifications ---
export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  href?: string;
}
