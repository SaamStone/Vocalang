/* ============================================================
   VOCALANG i18n SYSTEM
   Simple key-based internationalization.
   English is complete; Telugu and Hindi are stubs to be filled.
   ============================================================ */

import type { SupportedLanguage } from "@/lib/config/site";

type TranslationKey = keyof typeof en;

const en = {
  // --- Nav ---
  "nav.industries": "Industries",
  "nav.howItWorks": "How it works",
  "nav.pricing": "Pricing",
  "nav.demo": "Book a demo",
  "nav.login": "Log in",
  "nav.signup": "Sign up",
  "nav.getStarted": "Get started",

  // --- Hero ---
  "hero.title": "Multilingual AI voice tools for business",
  "hero.subtitle":
    "Explore how multilingual AI calling could support your team. Request a demo to discuss your workflow.",
  "hero.cta.demo": "Book a demo",
  "hero.cta.signup": "Contact us",

  // --- Demo ---
  "demo.title": "Explore a sample conversation",
  "demo.subtitle": "This illustrative preview is not a live call. Request a demo to discuss current product availability.",
  "demo.playing": "Playing...",
  "demo.paused": "Paused",
  "demo.play": "Play demo",
  "demo.pause": "Pause",

  // --- How it Works ---
  "how.title": "How to request a demo",
  "how.subtitle": "Share your needs, meet our team, and review possible next steps.",
  "how.step1.title": "Tell us about your workflow",
  "how.step1.description":
    "Use the form to share your organization and what you would like to explore.",
  "how.step2.title": "Our team reviews it",
  "how.step2.description":
    "We will contact you to arrange a product demonstration.",
  "how.step3.title": "Discuss next steps",
  "how.step3.description":
    "Review indicative pricing, current availability, and your integration needs.",

  // --- Industries ---
  "industries.title": "Built for your industry",
  "industries.subtitle":
    "Product concepts for common business workflows",

  // --- Features ---
  "features.title": "Everything you need",
  "features.subtitle": "Powerful features designed for real business workflows",
  "features.liveEta.title": "Live time estimate",
  "features.liveEta.description":
    "See exactly when your campaign will finish, updated in real time.",
  "features.addData.title": "Add contacts mid-campaign",
  "features.addData.description":
    "Upload more contacts while a campaign is running. No interruptions, no duplicates.",
  "features.voices.title": "Male & female voices",
  "features.voices.description":
    "Choose the voice that fits your brand. Multiple languages, natural conversation.",
  "features.results.title": "Results & exports",
  "features.results.description":
    "Outcome tags, full transcripts, recordings, and Excel exports for every campaign.",
  "features.security.title": "Enterprise security",
  "features.security.description":
    "Encrypted data, isolated accounts, signed URLs, and compliance-ready infrastructure.",
  "features.languages.title": "Multiple languages",
  "features.languages.description":
    "Telugu, Hindi, and English — with more languages coming soon.",

  // --- Trust ---
  "trust.title": "Trust & Security",
  "trust.subtitle":
    "See how the current website prototype handles demo and contact requests.",
  "trust.encryption": "Demo and contact requests are stored in Cloudflare D1",
  "trust.isolation": "Founder sign-in protects the submissions dashboard",
  "trust.compliance": "Calling and contact uploads are not enabled",
  "trust.recordings": "The website does not store call recordings",
  "trust.deletion": "Deletion requests are handled manually",
  "trust.auditing": "Product capabilities are still in development",

  // --- Pricing ---
  "pricing.title": "Simple, transparent pricing",
  "pricing.subtitle": "Review indicative voice tiers and request a confirmed quote.",
  "pricing.placeholder": "Pricing is subject to confirmation.",
  "pricing.perMinute": "per minute",
  "pricing.cta": "Get started",
  "pricing.includes": "Includes",
  "pricing.topUp": "Top up anytime",
  "pricing.popular": "Most popular",

  // --- FAQ ---
  "faq.title": "Frequently asked questions",
  "faq.subtitle": "Everything you need to know about Vocalang",

  // --- CTA Banner ---
  "cta.title": "Want to explore Vocalang?",
  "cta.subtitle":
    "Contact our team to discuss your workflow and the current prototype.",
  "cta.button": "Contact us",

  // --- Footer ---
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.rights": "All rights reserved.",
  "footer.madeIn": "Made in India 🇮🇳",

  // --- Contact ---
  "contact.title": "Get in touch",
  "contact.subtitle": "Send us a message and our team will get back to you.",
  "contact.name": "Full name",
  "contact.email": "Email address",
  "contact.phone": "Phone number",
  "contact.message": "Your message",
  "contact.submit": "Send message",
  "contact.success": "Message sent! We'll get back to you soon.",

  // --- About ---
  "about.title": "About Vocalang",
  "about.subtitle": "We're building the future of business communication in India.",

  // --- Auth ---
  "auth.login.title": "Welcome back",
  "auth.login.subtitle": "Log in to your Vocalang account",
  "auth.login.email": "Email or phone number",
  "auth.login.password": "Password",
  "auth.login.forgot": "Forgot password?",
  "auth.login.submit": "Log in",
  "auth.login.noAccount": "Don't have an account?",
  "auth.login.signup": "Sign up",

  "auth.register.title": "Create your account",
  "auth.register.subtitle": "Start making AI-powered calls in minutes",
  "auth.register.fullName": "Full name",
  "auth.register.businessName": "Business name",
  "auth.register.industry": "Industry",
  "auth.register.email": "Email address",
  "auth.register.phone": "Phone number",
  "auth.register.password": "Password",
  "auth.register.confirmPassword": "Confirm password",
  "auth.register.terms": "I agree to the",
  "auth.register.termsLink": "Terms & Conditions",
  "auth.register.privacyLink": "Privacy Policy",
  "auth.register.acceptableUseLink": "Acceptable Use Policy",
  "auth.register.submit": "Create account",
  "auth.register.hasAccount": "Already have an account?",
  "auth.register.login": "Log in",

  "auth.verify.title": "Verify your account",
  "auth.verify.subtitle": "Enter the codes sent to your email and phone",
  "auth.verify.emailCode": "Email verification code",
  "auth.verify.phoneCode": "Phone verification code",
  "auth.verify.submit": "Verify",
  "auth.verify.resend": "Resend code",

  "auth.forgot.title": "Reset your password",
  "auth.forgot.subtitle": "Enter your email and we'll send you a reset link",
  "auth.forgot.email": "Email address",
  "auth.forgot.submit": "Send reset link",
  "auth.forgot.back": "Back to login",

  // --- Common ---
  "common.loading": "Loading...",
  "common.error": "Something went wrong",
  "common.retry": "Try again",
  "common.back": "Back",
  "common.next": "Next",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.search": "Search",
  "common.learnMore": "Learn more",
} as const;

/** Telugu translations — stubs for now */
const te: Record<TranslationKey, string> = {
  ...Object.fromEntries(
    Object.keys(en).map((key) => [key, en[key as TranslationKey]])
  ),
  "hero.title": "మీ కోసం కాల్ చేసే AI వాయిస్ ఏజెంట్లు",
  "hero.subtitle":
    "మీ కాంటాక్ట్‌లను అప్‌లోడ్ చేయండి, AI వాయిస్ ఏజెంట్లు కాల్స్ చేస్తారు — తెలుగు, హిందీ లేదా ఆంగ్లంలో.",
  "nav.login": "లాగిన్",
  "nav.signup": "సైన్ అప్",
} as Record<TranslationKey, string>;

/** Hindi translations — stubs for now */
const hi: Record<TranslationKey, string> = {
  ...Object.fromEntries(
    Object.keys(en).map((key) => [key, en[key as TranslationKey]])
  ),
  "hero.title": "AI वॉइस एजेंट जो आपके लिए कॉल करें",
  "hero.subtitle":
    "अपने संपर्क अपलोड करें, AI वॉइस एजेंट कॉल करेंगे — तेलुगु, हिंदी या अंग्रेज़ी में.",
  "nav.login": "लॉग इन",
  "nav.signup": "साइन अप",
} as Record<TranslationKey, string>;

const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en,
  te,
  hi,
};

/**
 * Get a translated string by key.
 * Falls back to English if the key doesn't exist in the requested language.
 */
export function t(key: TranslationKey, lang: SupportedLanguage = "en"): string {
  return translations[lang]?.[key] ?? en[key] ?? key;
}

/**
 * Get all translation keys (useful for type safety)
 */
export type { TranslationKey };

export default translations;
