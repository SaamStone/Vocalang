import { Metadata } from 'next';
import { Upload, Phone, BarChart3, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';

export const metadata: Metadata = {
  title: 'How It Works | Vocalang',
  description: 'Learn how to request a Vocalang product demonstration.',
};

const steps = [
  {
    icon: Upload,
    title: 'Tell us about your workflow',
    description: 'Use the demo request form to share your organization and what you would like to explore.',
    features: [
      'Name and contact details',
      'Organization information',
      'Preferred language',
      'Expected monthly call volume',
    ],
  },
  {
    icon: Phone,
    title: 'Our team reviews it',
    description: 'We will review your request and contact you to arrange a product demonstration.',
    features: [
      'We learn about your use case',
      'We discuss language needs',
      'We answer questions about the prototype',
      'We confirm current availability',
    ],
  },
  {
    icon: BarChart3,
    title: 'Discuss next steps',
    description: 'Review fit, indicative pricing, and what would be required before using a future calling service.',
    features: [
      'Indicative per-minute rates',
      'Current product limitations',
      'Potential integration needs',
      'No payment or commitment',
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
              Request a demonstration and discuss your business workflow with our team.
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
            Want to learn more?
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] mb-10 max-w-2xl mx-auto">
            Contact our team to discuss what is available and what is still being built.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/demo">
              Request Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" href="/contact">
              Contact us
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
