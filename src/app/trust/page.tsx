import { Metadata } from 'next';
import { Lock, Shield, Scale, FileAudio, Trash2, ClipboardList, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description: 'Current data handling and security status for the Vocalang website prototype.',
};

const securityFeatures = [
  {
    title: 'Website form storage',
    description: 'Demo and contact requests are stored in Cloudflare D1 and shown in the private founder dashboard.',
    icon: Lock,
  },
  {
    title: 'Founder-only dashboard',
    description: 'The dashboard requires founder sign-in and is not linked from public website navigation.',
    icon: Shield,
  },
  {
    title: 'Calling is not enabled',
    description: 'The current website does not place calls, store call recordings, or accept contact-list uploads.',
    icon: Scale,
  },
  {
    title: 'Limited data collection',
    description: 'The website collects only the information visitors submit through demo and contact forms.',
    icon: FileAudio,
  },
  {
    title: 'Deletion requests',
    description: 'Visitors can request correction or deletion through the contact form; requests are handled manually.',
    icon: Trash2,
  },
  {
    title: 'Product status',
    description: 'Customer workspaces, calling, and campaign features are still in development and are not available for self-service.',
    icon: ClipboardList,
  },
];

const commitments = [
  'Keep service credentials in server-side environment variables',
  'Require founder sign-in to access submitted form data',
  'Review and update this page as the product is built',
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[rgb(var(--color-foreground))] mb-6">
              Trust & Security
            </h1>
            <p className="text-xl text-[rgb(var(--color-muted-foreground))] max-w-2xl mx-auto">
              A clear summary of what the current website stores and what is still being built.
            </p>
          </ScrollReveal>

          {/* Security feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] p-8 rounded-[var(--radius-2xl)] h-full hover:border-[rgb(var(--color-primary))/0.3] transition-colors duration-[var(--duration-normal)]">
                    <div className="w-12 h-12 bg-[rgb(var(--color-primary-light))] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[rgb(var(--color-primary))]" />
                    </div>
                    <h3 className="text-xl font-bold text-[rgb(var(--color-foreground))] mb-3">{feature.title}</h3>
                    <p className="text-[rgb(var(--color-muted-foreground))] leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Commitments + Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-[rgb(var(--color-foreground))] mb-8">Current safeguards</h2>
              <ul className="space-y-4">
                {commitments.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgb(var(--color-success-light))] flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[rgb(var(--color-success))]" />
                    </div>
                    <span className="text-[rgb(var(--color-muted-foreground))] text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-[rgb(var(--color-primary-light))] border border-[rgb(var(--color-primary))/0.2] p-8 md:p-10 rounded-[var(--radius-2xl)]">
                <h3 className="text-xl font-bold text-[rgb(var(--color-foreground))] mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[rgb(var(--color-primary))]" />
                  Compliance status
                </h3>
                <p className="text-[rgb(var(--color-muted-foreground))] leading-relaxed mb-6">
                  Calling, contact uploads, and customer workspaces are not enabled on this website. Applicable operational and legal requirements must be reviewed before those features are offered. This page is not a certification or legal compliance claim.
                </p>
                <Button href="/contact">
                  Contact for security questions
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
