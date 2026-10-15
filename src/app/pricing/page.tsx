import { Metadata } from 'next';
import { pricingPlans } from '@/lib/mock-data';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { PricingPlans } from '@/components/shared/PricingPlans';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Indicative pricing for the Vocalang product preview. Request a confirmed quote.',
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
            <p className="text-xl text-[rgb(var(--color-muted-foreground))] max-w-2xl mx-auto mb-16">
              {t("pricing.subtitle")}
            </p>
          </ScrollReveal>

          <PricingPlans plans={pricingPlans} />

          <ScrollReveal>
            <div className="bg-[rgb(var(--color-muted))] rounded-[var(--radius-2xl)] p-8 md:p-12 border border-[rgb(var(--color-border))] text-left">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-4 text-center">Pricing is shared during a demo</h3>
              <p className="mx-auto max-w-2xl text-center leading-7 text-[rgb(var(--color-muted-foreground))]">The rates shown are indicative per-minute references. Contact our team to confirm the final quote, telephony charges, taxes, and availability before purchasing. Self-service calling and payments are not enabled yet.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
