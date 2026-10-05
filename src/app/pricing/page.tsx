import { Metadata } from 'next';
import { Check, AlertTriangle } from 'lucide-react';
import { pricingPlans } from '@/lib/mock-data';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import { PricingPlans } from '@/components/shared/PricingPlans';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for AI voice calling campaigns.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[rgb(var(--color-foreground))] mb-6">
              {t("pricing.title")}
            </h1>
            <p className="text-xl text-[rgb(var(--color-muted-foreground))] max-w-2xl mx-auto mb-10">
              {t("pricing.subtitle")}
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-[rgb(var(--color-warning-light))] text-[rgb(var(--color-warning))] border border-[rgb(var(--color-warning))/0.3] rounded-[var(--radius-lg)] mb-16">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium text-sm">{t("pricing.placeholder")}</span>
            </div>
          </ScrollReveal>

          <PricingPlans plans={pricingPlans} />

          {/* All plans include */}
          <ScrollReveal>
            <div className="bg-[rgb(var(--color-muted))] rounded-[var(--radius-2xl)] p-8 md:p-12 border border-[rgb(var(--color-border))] text-left">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-8 text-center">All plans include</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'GST invoices for input tax credit',
                  'Secure data encryption at rest and in transit',
                  '24/7 monitoring and high availability',
                  'Access to standard voice models',
                  'Campaign analytics dashboard',
                  'Email support',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Check className="w-5 h-5 text-[rgb(var(--color-primary))] flex-shrink-0" />
                    <span className="text-sm text-[rgb(var(--color-muted-foreground))]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
