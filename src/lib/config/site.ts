/* ============================================================
   VOCALANG SITE CONFIGURATION
   All configurable values that drive the public website.
   Edit here, not in component code.
   ============================================================ */

export type SupportedLanguage = "en" | "te" | "hi";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavItem[];
}

export interface SocialLink {
  readonly platform: string;
  readonly href: string;
  readonly label: string;
}

export const siteConfig = {
  name: "Vocalang",
  tagline: "Multilingual AI voice tools for Indian businesses",
  description:
    "Vocalang is developing multilingual AI voice tools for Indian businesses. Request a demo to discuss your workflow.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  env: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",

  /** CONFIGURABLE: supported languages for the voice agent */
  supportedVoiceLanguages: ["Telugu", "Hindi", "English"] as const,

  /** CONFIGURABLE: supported UI languages */
  supportedUILanguages: [
    { code: "en" as const, label: "English", nativeLabel: "English" },
    { code: "te" as const, label: "Telugu", nativeLabel: "తెలుగు" },
    { code: "hi" as const, label: "Hindi", nativeLabel: "हिन्दी" },
  ] as const,

  /** Navigation items for the header */
  nav: {
    main: [
      { label: "Industries", href: "/#industries" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Languages", href: "/#languages" },
      { label: "Why Vocalang", href: "/#why-vocalang" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ] as readonly NavItem[],
    cta: { label: "Book a demo", href: "/demo" },
    login: { label: "Log in", href: "/login" },
  },

  /** Footer configuration */
  footer: {
    product: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Industries", href: "/#industries" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "FAQ", href: "/#faq" },
    ] as readonly NavItem[],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Trust & Security", href: "/trust" },
    ] as readonly NavItem[],
    legal: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
      { label: "Refund Policy", href: "/legal/refund" },
    ] as readonly NavItem[],
    social: [
      { platform: "twitter", href: "#", label: "Twitter" },
      { platform: "linkedin", href: "#", label: "LinkedIn" },
    ] as readonly SocialLink[],
  },

  /** Contact info */
  contact: {
    email: "",
    supportEmail: "",
    phone: "",
    address: "Hyderabad, Telangana, India",
  },

  /** Industries served */
  industries: [
    {
      slug: "real-estate",
      name: "Real Estate",
      icon: "Building2",
      shortDescription: "Explore lead qualification and site-visit workflows.",
      description:
        "A potential workflow could qualify a lead's budget and timeline and help arrange a site visit. Discuss requirements with our team.",
      useCases: [
        "New lead follow-up within 5 minutes",
        "Budget and timeline qualification",
        "Site visit scheduling",
        "Post-visit feedback collection",
        "Payment reminder calls",
      ],
      sampleTranscript: [
        { role: "agent" as const, text: "Hi, this is an AI assistant calling from Skyline Homes. You recently enquired about our 3BHK apartments in Gachibowli. Is this a good time to talk?" },
        { role: "customer" as const, text: "Yes, I'm looking for something around 80 lakhs." },
        { role: "agent" as const, text: "We have units starting at 75 lakhs. Would you like to schedule a site visit this weekend?" },
        { role: "customer" as const, text: "Saturday works. Around 11 AM?" },
        { role: "agent" as const, text: "Done! You're booked for Saturday at 11 AM. You'll receive a confirmation message shortly. Thank you!" },
      ],
    },
    {
      slug: "education",
      name: "Educational Institutes",
      icon: "GraduationCap",
      shortDescription: "Explore admissions follow-up workflows.",
      description:
        "Call every enquiry, remind students about deadlines, and collect feedback — without hiring a call center.",
      useCases: [
        "Admission enquiry follow-up",
        "Application deadline reminders",
        "Document submission reminders",
        "Fee payment reminders",
        "Alumni feedback collection",
      ],
      sampleTranscript: [
        { role: "agent" as const, text: "Hello, I'm an AI assistant from Vidya University. You started an application for our MBA programme. I'm calling to help you complete it." },
        { role: "customer" as const, text: "I haven't uploaded my transcripts yet." },
        { role: "agent" as const, text: "No problem. The deadline is November 15th. Would you like me to send you the upload link by WhatsApp?" },
        { role: "customer" as const, text: "Yes, please." },
        { role: "agent" as const, text: "Done! I've also noted you'd like a callback if you need help. Good luck with your application!" },
      ],
    },
    {
      slug: "study-abroad",
      name: "Study Abroad",
      icon: "Plane",
      shortDescription: "Explore study-abroad enquiry workflows.",
      description:
        "A potential workflow could answer common programme questions and help arrange consultations. Discuss requirements with our team.",
      useCases: [
        "New lead qualification",
        "University shortlisting consultations",
        "Visa documentation reminders",
        "Pre-departure orientation calls",
        "Application status updates",
      ],
      sampleTranscript: [
        { role: "agent" as const, text: "Hi, this is an AI assistant from GlobalEd Consultants. You enquired about studying in Canada. Can we talk for a moment?" },
        { role: "customer" as const, text: "Sure. I'm interested in computer science programmes." },
        { role: "agent" as const, text: "Great! We work with 12 universities offering CS. Shall I schedule a free 30-minute consultation with our Canada specialist?" },
        { role: "customer" as const, text: "Yes, tomorrow evening would be good." },
        { role: "agent" as const, text: "Booked for tomorrow at 6 PM. Our specialist will call you. Thank you!" },
      ],
    },
    {
      slug: "recruiting",
      name: "Recruiting Agencies",
      icon: "Users",
      shortDescription: "Explore candidate screening workflows.",
      description:
        "A potential workflow could collect candidate interest and availability before a recruiter follows up. Discuss requirements with our team.",
      useCases: [
        "Initial candidate screening",
        "Interview scheduling",
        "Offer communication",
        "Joining date confirmation",
        "Document collection reminders",
      ],
      sampleTranscript: [
        { role: "agent" as const, text: "Hello, this is an AI assistant from TalentBridge. We have an exciting opportunity matching your profile — a senior developer role in Hyderabad. Are you open to hearing more?" },
        { role: "customer" as const, text: "What's the salary range?" },
        { role: "agent" as const, text: "The range is 18 to 25 LPA depending on experience. You'd need at least 4 years of React experience. Does that match your background?" },
        { role: "customer" as const, text: "Yes, I have 5 years. I'm interested." },
        { role: "agent" as const, text: "Excellent! I'll have a recruiter call you tomorrow to discuss details. Thank you for your time!" },
      ],
    },
  ] as const,

  /** CONFIGURABLE: Calling window defaults */
  callingDefaults: {
    windowStart: "09:00",
    windowEnd: "20:00",
    timezone: "Asia/Kolkata",
    maxRetries: 3,
    avgCallDurationSeconds: 120,
  },

  /** Legal document versions (track changes for compliance) */
  legalVersions: {
    terms: "1.0.0-draft",
    privacy: "1.0.0-draft",
    acceptableUse: "1.0.0-draft",
    refund: "1.0.0-draft",
  },
} as const;

export type Industry = (typeof siteConfig.industries)[number];
export type IndustrySlug = Industry["slug"];
