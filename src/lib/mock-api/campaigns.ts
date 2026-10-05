/* ============================================================
   MOCK API — Campaign & Dashboard Service
   Simulates campaigns, contacts, results, and dashboard stats.
   ============================================================ */

import type {
  Campaign,
  CampaignStatus,
  Contact,
  ContactOutcome,
  CallResult,
  ContactBatch,
  DashboardStats,
  TranscriptMessage,
  WizardState,
} from "@/types";
import { sleep } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

const MOCK_DELAY = 600;

// --- Mock Transcript Templates ---
const sampleTranscripts: Record<string, TranscriptMessage[]> = {
  interested: [
    { role: "agent", text: "Hi, this is an AI assistant calling from your service provider. Is this a good time to talk?", timestamp: 0 },
    { role: "customer", text: "Yes, go ahead.", timestamp: 3 },
    { role: "agent", text: "Great! We have a special offering that I'd like to tell you about. Are you interested in hearing more?", timestamp: 5 },
    { role: "customer", text: "Yes, I'm interested. Tell me more.", timestamp: 9 },
    { role: "agent", text: "Wonderful! I'll have our team follow up with detailed information. Thank you for your time!", timestamp: 12 },
  ],
  not_interested: [
    { role: "agent", text: "Hi, this is an AI assistant. I'm calling to share an update about our services.", timestamp: 0 },
    { role: "customer", text: "I'm not interested, thank you.", timestamp: 4 },
    { role: "agent", text: "I understand. Thank you for your time. Have a great day!", timestamp: 6 },
  ],
  callback: [
    { role: "agent", text: "Hello! I'm an AI assistant calling with some information for you.", timestamp: 0 },
    { role: "customer", text: "I'm busy right now. Can someone call me back later?", timestamp: 4 },
    { role: "agent", text: "Of course! I'll schedule a callback for you. What time works best?", timestamp: 7 },
    { role: "customer", text: "Tomorrow afternoon would be good.", timestamp: 10 },
    { role: "agent", text: "Noted! Someone from our team will call you tomorrow afternoon. Thank you!", timestamp: 12 },
  ],
  no_answer: [],
};

// --- Mock Data Generators ---
function randomId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function randomOutcome(): ContactOutcome {
  const outcomes: ContactOutcome[] = [
    "interested", "interested", "interested",
    "not_interested", "not_interested", "not_interested", "not_interested",
    "callback", "callback",
    "no_answer", "no_answer",
    "wrong_number",
    "busy",
  ];
  return outcomes[Math.floor(Math.random() * outcomes.length)]!;
}

function randomPhone(): string {
  return `+919${Math.floor(100000000 + Math.random() * 900000000)}`;
}

const firstNames = ["Aarav", "Priya", "Rohit", "Ananya", "Vikram", "Sneha", "Arjun", "Divya", "Karthik", "Meera", "Suresh", "Lakshmi", "Ravi", "Kavya", "Aditya", "Swathi", "Rahul", "Pooja", "Venkat", "Nandini"];
const lastNames = ["Sharma", "Reddy", "Kumar", "Patel", "Singh", "Rao", "Gupta", "Nair", "Iyer", "Desai", "Chopra", "Menon", "Joshi", "Verma", "Das"];

function randomName(): string {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

// --- Generate mock campaigns ---
function generateMockContacts(campaignId: string, count: number): Contact[] {
  return Array.from({ length: count }, (_, i) => {
    const outcome = i < count * 0.7 ? randomOutcome() : undefined;
    const isDone = outcome !== undefined;
    return {
      id: `con_${randomId()}`,
      campaignId,
      batchId: `batch_1`,
      name: randomName(),
      phone: randomPhone(),
      email: Math.random() > 0.5 ? `${randomName().toLowerCase().replace(" ", ".")}@example.com` : undefined,
      status: isDone ? "done" as const : (i < count * 0.75 ? "waiting" as const : "waiting" as const),
      outcome,
      attempts: isDone ? 1 + Math.floor(Math.random() * 2) : 0,
      lastAttemptAt: isDone ? new Date(Date.now() - Math.random() * 86400000).toISOString() : undefined,
      customFields: {},
    };
  });
}

function generateCallResults(contacts: Contact[], campaignId: string): CallResult[] {
  return contacts
    .filter((c) => c.outcome)
    .map((c) => ({
      id: `call_${randomId()}`,
      contactId: c.id,
      campaignId,
      contactName: c.name,
      contactPhone: c.phone,
      outcome: c.outcome!,
      duration: 30 + Math.floor(Math.random() * 180),
      transcript: sampleTranscripts[c.outcome!] ?? sampleTranscripts.interested!,
      recordingUrl: "#mock-recording",
      callStartedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      callEndedAt: new Date(Date.now() - Math.random() * 86400000 + 120000).toISOString(),
      retryNumber: 0,
    }));
}

// Pre-generated mock campaigns
const mockCampaigns: Campaign[] = [
  (() => {
    const id = "camp_active_001";
    return {
      id,
      name: "October Lead Follow-up",
      status: "running" as CampaignStatus,
      industry: "real-estate",
      language: "Telugu",
      voice: "male" as const,
      simultaneousAgents: 2,
      totalContacts: 250,
      contactsCalled: 175,
      contactsRemaining: 75,
      contactsFailed: 8,
      estimatedMinutesRemaining: 150,
      estimatedFinishTime: new Date(Date.now() + 9000000).toISOString(),
      callingWindowStart: "09:00",
      callingWindowEnd: "20:00",
      maxRetries: 3,
      costPerMinute: 1.5,
      totalCost: 525,
      totalMinutes: 350,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      batches: [{
        id: "batch_1",
        campaignId: id,
        fileName: "october_leads.xlsx",
        totalContacts: 250,
        validContacts: 245,
        duplicatesRemoved: 3,
        invalidNumbers: 2,
        uploadedAt: new Date(Date.now() - 172800000).toISOString(),
      }],
    };
  })(),
  {
    id: "camp_completed_001",
    name: "September Admissions Drive",
    status: "completed",
    industry: "education",
    language: "Hindi",
    voice: "female",
    simultaneousAgents: 3,
    totalContacts: 500,
    contactsCalled: 500,
    contactsRemaining: 0,
    contactsFailed: 23,
    estimatedMinutesRemaining: 0,
    estimatedFinishTime: new Date(Date.now() - 604800000).toISOString(),
    callingWindowStart: "09:00",
    callingWindowEnd: "18:00",
    maxRetries: 2,
    costPerMinute: 1.5,
    totalCost: 1500,
    totalMinutes: 1000,
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    startedAt: new Date(Date.now() - 1123200000).toISOString(),
    completedAt: new Date(Date.now() - 604800000).toISOString(),
    batches: [{
      id: "batch_2",
      campaignId: "camp_completed_001",
      fileName: "sept_admissions.csv",
      totalContacts: 510,
      validContacts: 500,
      duplicatesRemoved: 7,
      invalidNumbers: 3,
      uploadedAt: new Date(Date.now() - 1209600000).toISOString(),
    }],
  },
  {
    id: "camp_paused_001",
    name: "Study Abroad Leads Q4",
    status: "paused",
    industry: "study-abroad",
    language: "English",
    voice: "male",
    simultaneousAgents: 1,
    totalContacts: 120,
    contactsCalled: 45,
    contactsRemaining: 75,
    contactsFailed: 3,
    estimatedMinutesRemaining: 150,
    estimatedFinishTime: new Date(Date.now() + 18000000).toISOString(),
    callingWindowStart: "10:00",
    callingWindowEnd: "19:00",
    maxRetries: 3,
    costPerMinute: 1.5,
    totalCost: 135,
    totalMinutes: 90,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    startedAt: new Date(Date.now() - 345600000).toISOString(),
    batches: [{
      id: "batch_3",
      campaignId: "camp_paused_001",
      fileName: "study_abroad_q4.xlsx",
      totalContacts: 125,
      validContacts: 120,
      duplicatesRemoved: 4,
      invalidNumbers: 1,
      uploadedAt: new Date(Date.now() - 432000000).toISOString(),
    }],
  },
];

// Generate contacts and results for each campaign
const mockContactsMap: Record<string, Contact[]> = {};
const mockResultsMap: Record<string, CallResult[]> = {};

mockCampaigns.forEach((c) => {
  const contacts = generateMockContacts(c.id, c.totalContacts);
  mockContactsMap[c.id] = contacts;
  mockResultsMap[c.id] = generateCallResults(contacts, c.id);
});

export const mockCampaignApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    await sleep(MOCK_DELAY);
    const activeCampaigns = mockCampaigns.filter((c) => c.status === "running" || c.status === "paused");
    const runningCampaign = mockCampaigns.find((c) => c.status === "running");
    return {
      walletBalance: 4250,
      activeCampaigns: activeCampaigns.length,
      totalCallsToday: 87,
      totalCallsAllTime: 1243,
      callsRemaining: mockCampaigns.reduce((sum, c) => sum + c.contactsRemaining, 0),
      estimatedFinishTime: runningCampaign?.estimatedFinishTime,
      recentCampaigns: mockCampaigns.slice(0, 5),
    };
  },

  async getCampaigns(): Promise<Campaign[]> {
    await sleep(MOCK_DELAY);
    return [...mockCampaigns];
  },

  async getCampaign(id: string): Promise<Campaign | null> {
    await sleep(MOCK_DELAY);
    return mockCampaigns.find((c) => c.id === id) ?? null;
  },

  async getCampaignContacts(campaignId: string): Promise<Contact[]> {
    await sleep(MOCK_DELAY);
    return mockContactsMap[campaignId] ?? [];
  },

  async getCampaignResults(campaignId: string): Promise<CallResult[]> {
    await sleep(MOCK_DELAY);
    return mockResultsMap[campaignId] ?? [];
  },

  async getCallResult(resultId: string): Promise<CallResult | null> {
    await sleep(MOCK_DELAY);
    for (const results of Object.values(mockResultsMap)) {
      const result = results.find((r) => r.id === resultId);
      if (result) return result;
    }
    return null;
  },

  async createCampaign(wizard: WizardState): Promise<Campaign> {
    await sleep(MOCK_DELAY * 2);
    const id = `camp_${randomId()}`;
    const totalContacts = wizard.estimate?.totalContacts ?? 100;

    const campaign: Campaign = {
      id,
      name: wizard.campaignName,
      status: "queued",
      industry: wizard.industry,
      language: wizard.language,
      voice: wizard.voice,
      simultaneousAgents: wizard.simultaneousAgents,
      totalContacts,
      contactsCalled: 0,
      contactsRemaining: totalContacts,
      contactsFailed: 0,
      estimatedMinutesRemaining: wizard.estimate?.estimatedMinutes ?? 200,
      estimatedFinishTime: wizard.estimate?.estimatedFinishTime ?? new Date(Date.now() + 72000000).toISOString(),
      callingWindowStart: wizard.callingWindowStart,
      callingWindowEnd: wizard.callingWindowEnd,
      maxRetries: wizard.maxRetries,
      costPerMinute: 1.5,
      totalCost: 0,
      totalMinutes: 0,
      createdAt: new Date().toISOString(),
      batches: [{
        id: `batch_${randomId()}`,
        campaignId: id,
        fileName: wizard.fileName ?? "contacts.csv",
        totalContacts: totalContacts + 5,
        validContacts: totalContacts,
        duplicatesRemoved: 3,
        invalidNumbers: 2,
        uploadedAt: new Date().toISOString(),
      }],
    };

    mockCampaigns.unshift(campaign);
    mockContactsMap[id] = generateMockContacts(id, totalContacts);
    mockResultsMap[id] = [];
    return campaign;
  },

  async pauseCampaign(id: string): Promise<Campaign | null> {
    await sleep(MOCK_DELAY);
    const campaign = mockCampaigns.find((c) => c.id === id);
    if (campaign && campaign.status === "running") {
      campaign.status = "paused";
    }
    return campaign ?? null;
  },

  async resumeCampaign(id: string): Promise<Campaign | null> {
    await sleep(MOCK_DELAY);
    const campaign = mockCampaigns.find((c) => c.id === id);
    if (campaign && (campaign.status === "paused" || campaign.status === "low_balance")) {
      campaign.status = "running";
    }
    return campaign ?? null;
  },

  async stopCampaign(id: string): Promise<Campaign | null> {
    await sleep(MOCK_DELAY);
    const campaign = mockCampaigns.find((c) => c.id === id);
    if (campaign) {
      campaign.status = "stopped";
      campaign.completedAt = new Date().toISOString();
    }
    return campaign ?? null;
  },

  /** Simulate file parsing for the wizard */
  async parseUploadedFile(file: File): Promise<{
    headers: string[];
    rows: Record<string, string>[];
    totalRows: number;
  }> {
    await sleep(MOCK_DELAY * 2);
    // Return mock parsed data regardless of actual file
    const headers = ["Name", "Phone Number", "Email", "City", "Notes"];
    const rows = Array.from({ length: Math.min(20, 50 + Math.floor(Math.random() * 200)) }, (_, i) => ({
      "Name": randomName(),
      "Phone Number": randomPhone(),
      "Email": `contact${i + 1}@example.com`,
      "City": ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai"][Math.floor(Math.random() * 5)]!,
      "Notes": ["New lead", "Follow up", "Warm lead", "Cold lead", ""][Math.floor(Math.random() * 5)]!,
    }));
    return { headers, rows, totalRows: 50 + Math.floor(Math.random() * 200) };
  },

  /** Calculate estimate for the wizard */
  calculateEstimate(params: {
    totalContacts: number;
    simultaneousAgents: number;
    callingWindowStart: string;
    callingWindowEnd: string;
    maxRetries: number;
  }): {
    totalContacts: number;
    estimatedMinutes: number;
    estimatedCost: number;
    estimatedDuration: string;
    estimatedFinishTime: string;
  } {
    const avgCallMinutes = siteConfig.callingDefaults.avgCallDurationSeconds / 60;
    const retryFactor = 1 + params.maxRetries * 0.3;
    const totalMinutes = params.totalContacts * avgCallMinutes * retryFactor;
    const parallelMinutes = totalMinutes / params.simultaneousAgents;
    const costPerMinute = 1.5; // PLACEHOLDER
    const estimatedCost = totalMinutes * costPerMinute;

    const hours = Math.floor(parallelMinutes / 60);
    const mins = Math.round(parallelMinutes % 60);
    const estimatedDuration = hours > 0 ? `About ${hours}h ${mins}m` : `About ${mins}m`;

    const finishTime = new Date(Date.now() + parallelMinutes * 60000);

    return {
      totalContacts: params.totalContacts,
      estimatedMinutes: Math.round(totalMinutes),
      estimatedCost: Math.round(estimatedCost),
      estimatedDuration,
      estimatedFinishTime: finishTime.toISOString(),
    };
  },
};
