import { Metadata } from 'next';
import { Upload, Phone, BarChart3, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | Vocalang',
  description: 'Learn how Vocalang automates your voice calling campaigns in three simple steps.',
};

const steps = [
  {
    icon: Upload,
    title: 'Upload your list',
    description: 'Start by uploading your leads or contacts in CSV format. Our system automatically validates and deduplicates your list.',
    features: [
      'Automatic phone number validation',
      'Duplicate removal',
      'Custom field mapping',
      'Secure data handling',
    ],
  },
  {
    icon: Phone,
    title: 'AI makes the calls',
    description: 'Our natural-sounding AI agents engage with your leads in their preferred language, following your custom script.',
    features: [
      'Multi-language support (10+ Indian languages)',
      'Natural conversational AI',
      'Smart outcome tagging',
      'Intelligent retry logic',
    ],
  },
  {
    icon: BarChart3,
    title: 'See your results',
    description: 'Monitor your campaigns in real-time. Review transcripts, listen to recordings, and analyze campaign performance.',
    features: [
      'Real-time dashboard',
      'Call transcripts & recordings',
      'Actionable analytics',
      'Easy data export',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-foreground)]">
              How Vocalang works
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-muted-foreground)]">
              Launch your AI voice campaigns in minutes. It&apos;s as simple as uploading a list and letting our AI do the rest.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-16 md:py-24 px-6 bg-[var(--color-muted)]/30">
        <div className="max-w-5xl mx-auto w-full relative">
          <div className="hidden md:block absolute top-24 left-12 right-12 h-0.5 bg-[var(--color-border)]" />
          <div className="md:hidden absolute top-12 bottom-12 left-8 w-0.5 bg-[var(--color-border)]" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-primary)] flex items-center justify-center mb-8 relative z-10 shadow-sm shrink-0 mx-auto md:mx-0">
                      <Icon className="w-8 h-8 text-[var(--color-primary)]" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted-foreground)] mb-8 min-h-[4rem]">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3 w-full text-left">
                      {step.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                          </div>
                          <span className="text-sm text-[var(--color-foreground)]/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-foreground)]">
            Ready to try it?
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] mb-10 max-w-2xl mx-auto">
            Experience the power of AI voice calling for your business. Start automating your campaigns today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/demo">
              Request Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" href="/register">
              Sign Up Free
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
