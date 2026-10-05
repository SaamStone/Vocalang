import { Metadata } from 'next';
import { Building2, GraduationCap, Plane, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/site';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Industries | Vocalang',
  description: 'Discover how Vocalang is built for your industry.',
};

const iconMap: Record<string, any> = {
  Building2,
  GraduationCap,
  Plane,
  Users
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)]">
              Built for your industry
            </h1>
            <p className="text-xl text-[var(--color-muted-foreground)]">
              Tailored AI voice solutions designed to meet the unique challenges of your sector.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {siteConfig.industries.map((industry, index) => {
            const Icon = iconMap[industry.icon] || Users;
            return (
              <ScrollReveal key={industry.slug} delay={index * 0.1}>
                <Link 
                  href={`/industries/${industry.slug}`}
                  className="group block p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-primary-foreground)] transition-colors duration-300 text-[var(--color-primary)]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">
                          {industry.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
