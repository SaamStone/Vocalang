import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Building2, GraduationCap, Plane, Users, CheckCircle2, type LucideIcon } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  GraduationCap,
  Plane,
  Users
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return siteConfig.industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = siteConfig.industries.find((i) => i.slug === params.slug);
  if (!industry) return {};
  
  return {
    title: `${industry.name} Solutions | Vocalang`,
    description: industry.description,
  };
}

export default function IndustryDetailPage({ params }: Props) {
  const industry = siteConfig.industries.find((i) => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }

  const Icon = iconMap[industry.icon] || Users;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <section className="pt-32 pb-16 px-6 bg-[var(--color-muted)]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <ScrollReveal>
            <div className="w-20 h-20 mx-auto bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-8">
              <Icon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-foreground)]">
              {industry.name}
            </h1>
            <p className="text-xl text-[var(--color-muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              {industry.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-16 mt-16">
        <section>
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 text-[var(--color-foreground)]">Use cases</h2>
            <ul className="space-y-4">
              {industry.useCases?.map((useCase: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <span className="text-lg text-[var(--color-foreground)]/90">{useCase}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>

        <section>
          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl font-bold mb-8 text-[var(--color-foreground)]">Sample conversation</h2>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              {industry.sampleTranscript?.map((msg, index) => {
                const isAgent = msg.role === 'agent';
                return (
                  <div
                    key={index}
                    className={cn(
                      "max-w-[85%] rounded-2xl px-5 py-3 text-sm md:text-base",
                      isAgent 
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-foreground)] self-start rounded-tl-sm"
                        : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] self-end rounded-tr-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>
      </div>

      <section className="mt-24 px-6 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-6 text-[var(--color-foreground)]">
            Start calling your {industry.name.toLowerCase()} leads
          </h2>
          <Button size="lg" href="/demo">
            Book a Demo
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
