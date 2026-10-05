import { Metadata } from 'next';
import { Lock, Shield, Scale, FileAudio, Trash2, ClipboardList, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description: 'Enterprise-grade protection for your voice calling data.',
};

const securityFeatures = [
  {
    title: 'End-to-end encryption',
    description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards.',
    icon: Lock,
  },
  {
    title: 'Data isolation',
    description: 'Your customer data is strictly isolated. Each account has complete data separation enforced at the database level.',
    icon: Shield,
  },
  {
    title: 'Indian compliance',
    description: 'Designed for compliance with TRAI regulations, DND requirements, and the Digital Personal Data Protection Act, 2023.',
    icon: Scale,
  },
  {
    title: 'Secure recordings',
    description: 'Call recordings are stored with role-based access control, expiring signed URLs, and automatic retention policies.',
    icon: FileAudio,
  },
  {
    title: 'Data deletion on request',
    description: 'Full data deletion capabilities upon request. You control your data and can remove it at any time.',
    icon: Trash2,
  },
  {
    title: 'Audit logging',
    description: 'Comprehensive, immutable audit trails for all system access and administrative actions.',
    icon: ClipboardList,
  },
];

const commitments = [
  'Regular penetration testing and vulnerability scanning',
  'Strict access controls for our engineering team',
  'Incident response plan with 24/7 coverage',
  'Vendor risk management program',
  'Continuous monitoring of security posture',
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
              Enterprise-grade protection for your voice calling data and campaigns.
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
              <h2 className="text-3xl font-bold text-[rgb(var(--color-foreground))] mb-8">Our commitments</h2>
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
                  Regulatory Compliance
                </h3>
                <p className="text-[rgb(var(--color-muted-foreground))] leading-relaxed mb-6">
                  We are designing for compliance with TRAI regulations, DND (Do Not Call) requirements, and the Digital Personal Data Protection Act, 2023. Our compliance posture is reviewed by legal professionals before launch.
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
