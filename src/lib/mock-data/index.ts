/* ============================================================
   Vocalang pricing benchmark based on publicly listed Outpero rates.
   ============================================================ */

export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly perMinuteRate: number;   // INR per minute
  readonly features: readonly string[];
  readonly popular?: boolean;
  readonly cta: string;
}

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "value",
    name: "Value",
    description: "Budget-friendly. Mostly used for bulk calling campaigns.",
    perMinuteRate: 3.5,
    features: [
      "Native Multilingual",
      "Value Voices",
      "Low Latency",
      "Budget bulk calling",
    ],
    cta: "Start Calling",
  },
  {
    id: "standard",
    name: "Standard",
    description: "The All-Rounder. High realism for everyday customer interactions and support.",
    perMinuteRate: 5,
    features: [
      "Native Multilingual",
      "Standard Voices",
      "Low Latency",
      "The All-Rounder",
    ],
    popular: true,
    cta: "Start Calling",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Curated native speakers. The most real-like voices from our exclusive library.",
    perMinuteRate: 7,
    features: [
      "Native Multilingual",
      "Premium Voices",
      "Ultra-low Latency",
      "Custom integrations",
    ],
    cta: "Start Calling",
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
