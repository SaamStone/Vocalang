/* ============================================================
   MOCK DATA — Pricing Plans
   PLACEHOLDER values. All prices will be decided later.
   ============================================================ */

export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;           // INR per month (0 = free tier)
  readonly annualPrice?: number | null; // monthly equivalent billed annually; null until confirmed
  readonly priceLabel: string;
  readonly perMinuteRate: number;   // INR per minute
  readonly includedMinutes: number;
  readonly maxAgents: number;       // simultaneous agents
  readonly voicesAllowed: readonly string[];
  readonly features: readonly string[];
  readonly popular?: boolean;
  readonly cta: string;
}

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting started with AI calling.",
    price: 0,
    annualPrice: 0,
    priceLabel: "Free trial",
    perMinuteRate: 0,
    includedMinutes: 5,
    maxAgents: 1,
    voicesAllowed: ["male"],
    features: [
      "1 free demo call",
      "5 included minutes",
      "1 simultaneous agent",
      "Male voice",
      "Basic results dashboard",
      "Email support",
    ],
    cta: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing businesses running regular campaigns.",
    price: 2999,
    annualPrice: null,
    priceLabel: "₹2,999/mo",
    perMinuteRate: 1.5,
    includedMinutes: 500,
    maxAgents: 3,
    voicesAllowed: ["male", "female"],
    features: [
      "500 included minutes",
      "Up to 3 simultaneous agents",
      "Male & female voices",
      "Full transcripts & recordings",
      "Excel export",
      "Priority support",
      "Add contacts mid-campaign",
    ],
    popular: true,
    cta: "Get started",
  },
  {
    id: "scale",
    name: "Scale",
    description: "For teams running high-volume campaigns daily.",
    price: 9999,
    annualPrice: null,
    priceLabel: "₹9,999/mo",
    perMinuteRate: 1.0,
    includedMinutes: 2000,
    maxAgents: 10,
    voicesAllowed: ["male", "female"],
    features: [
      "2,000 included minutes",
      "Up to 10 simultaneous agents",
      "Male & female voices",
      "Full transcripts & recordings",
      "Excel export",
      "Dedicated support",
      "Add contacts mid-campaign",
      "Custom calling windows",
      "API access",
    ],
    cta: "Get started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations.",
    price: -1,
    annualPrice: null,
    priceLabel: "Custom",
    perMinuteRate: 0,
    includedMinutes: 0,
    maxAgents: 50,
    voicesAllowed: ["male", "female"],
    features: [
      "Custom minute packages",
      "Unlimited simultaneous agents",
      "All voices & languages",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise option",
      "Custom AI training",
    ],
    cta: "Contact sales",
  },
] as const;

export const faqItems: readonly { question: string; answer: string }[] = [
  {
    question: "What is Vocalang?",
    answer:
      "Vocalang is an AI-powered voice calling platform. You upload a list of contacts, and our AI agent calls each person, following your script and reporting structured results — interested, not interested, callback requested, and more.",
  },
  {
    question: "How does the free demo work?",
    answer:
      "After signing up and verifying your phone number, you get one free demo call. The AI agent calls YOUR number so you can experience the conversation first-hand. No contacts are called during the demo.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "Currently we support Telugu, Hindi, and English. More Indian languages are planned. The AI can handle conversations naturally in each language.",
  },
  {
    question: "How accurate is the AI?",
    answer:
      "Our AI is powered by Sarvam AI, a leading Indian language AI platform. It handles natural conversations, understands accents, and correctly tags outcomes in most cases. Every call comes with a full transcript and recording for review.",
  },
  {
    question: "Can I add more contacts while a campaign is running?",
    answer:
      "Yes! Upload additional contacts at any time during a running campaign. They're deduplicated against already-called numbers and added to the queue seamlessly.",
  },
  {
    question: "What file formats can I upload?",
    answer:
      "We accept Excel (.xlsx, .xls), CSV, and PDF files. Our system validates phone numbers, removes duplicates, and flags any issues before calling begins.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Vocalang uses a prepaid wallet model. You top up your wallet and pay per minute of calling. Each plan includes a set number of minutes, with additional minutes at a per-minute rate. You can top up at any time.",
  },
  {
    question: "What happens if my wallet runs out during a campaign?",
    answer:
      "The campaign pauses automatically. You'll receive an alert, and once you top up, calling resumes from where it left off — no calls are lost.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All data is encrypted at rest and in transit. Each account's data is completely isolated. Recordings use expiring signed URLs. We follow Indian data protection guidelines and are working towards full DPDP Act compliance.",
  },
  {
    question: "Does the AI disclose it's not human?",
    answer:
      "Yes. At the start of every call, the AI identifies itself as an AI assistant and informs the person that the call may be recorded. This is both a legal requirement and our commitment to transparency.",
  },
  {
    question: "Can I use my own phone number?",
    answer:
      "Yes, you can verify and use your own number. Alternatively, you can rent a number from Vocalang. Options depend on your plan.",
  },
  {
    question: "What are calling windows?",
    answer:
      "Calling windows define the hours during which calls are placed (default: 9 AM to 8 PM IST). You can customise these per campaign to respect your contacts' preferences and regulatory requirements.",
  },
] as const;

/** Mock stats for the homepage trust section */
export const mockStats = {
  totalCalls: 125000,
  avgCallDuration: "2m 15s",
  successRate: "94%",
  languages: 3,
} as const;

/** Mock testimonials — NOT used until we have real ones */
export const mockTestimonials: readonly {
  name: string;
  role: string;
  company: string;
  text: string;
}[] = [];
