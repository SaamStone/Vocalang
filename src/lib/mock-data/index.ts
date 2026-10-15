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
    description: "Indicative tier for organizations planning larger call volumes.",
    perMinuteRate: 3.5,
    features: [
      "Speaks multiple Indian languages",
      "Clear, cost-effective AI voice",
      "Quick responses during calls",
      "Designed for larger calling workflows",
    ],
    cta: "Contact us",
  },
  {
    id: "standard",
    name: "Standard",
    description: "An indicative tier for everyday customer conversations.",
    perMinuteRate: 5,
    features: [
      "Speaks multiple Indian languages",
      "Natural-sounding AI voice",
      "Quick responses during calls",
      "Designed for everyday customer workflows",
    ],
    popular: true,
    cta: "Contact us",
  },
  {
    id: "premium",
    name: "Premium",
    description: "For teams looking for a more natural-sounding voice experience.",
    perMinuteRate: 7,
    features: [
      "Speaks multiple Indian languages",
      "Natural-sounding voice options",
      "Responsive conversations",
      "Custom integrations available",
    ],
    cta: "Contact us",
  },

] as const;

export const faqItems: readonly { question: string; answer: string }[] = [
  {
    question: "What is Vocalang?",
    answer:
      "Vocalang is developing multilingual AI voice tools for businesses in India. The current website lets you request a product demo; calling campaigns are not available for self-service yet.",
  },
  {
    question: "How do I request a product demo?",
    answer:
      "Send a request through the Book a demo form. Our team will review it and contact you to arrange a demonstration.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "The current demo focus is Telugu, Hindi, and English. Availability will be confirmed when arranging a demonstration.",
  },
  {
    question: "How accurate is the AI?",
    answer:
      "The voice product is still being developed. We will share current capabilities and limitations during a demo; this website does not currently place or record calls.",
  },
  {
    question: "Can I add more contacts while a campaign is running?",
    answer:
      "Contact us to discuss your intended workflow. Contact uploads and calling campaigns are not available on this website yet.",
  },
  {
    question: "What file formats can I upload?",
    answer:
      "The website does not currently accept contact-list uploads. Ask our team about supported formats during a demo.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "The pricing page shows indicative per-minute rates. Contact us for a quote and confirmation of any telephony or tax charges before purchasing. Self-service payments are not enabled.",
  },
  {
    question: "What happens if my wallet runs out during a campaign?",
    answer:
      "Wallets and calling campaigns are not enabled on the public website. Our team can discuss planned billing and campaign controls during a demo.",
  },
  {
    question: "Is my data secure?",
    answer:
      "The website stores demo and contact form submissions in Cloudflare D1 and restricts the founder dashboard to a founder sign-in. Call recordings and customer workspaces are not available in the current prototype. See the Privacy Policy for details.",
  },
  {
    question: "Does the AI disclose it's not human?",
    answer:
      "No calls are placed by the current website. Disclosure and consent workflows will be described before any calling service is made available.",
  },
  {
    question: "Can I use my own phone number?",
    answer:
      "Phone-number options are not available yet. Contact us to discuss the product roadmap.",
  },
  {
    question: "What are calling windows?",
    answer:
      "Calling-window controls are not available on the public website yet. Any calling workflow will need to be configured before launch.",
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
