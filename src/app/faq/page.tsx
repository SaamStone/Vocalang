import { Metadata } from 'next';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import { faqItems } from '@/lib/mock-data';
import { FAQAccordion } from './FAQAccordion';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Vocalang AI voice platform.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[rgb(var(--color-foreground))] mb-6">
              {t("faq.title")}
            </h1>
            <p className="text-xl text-[rgb(var(--color-muted-foreground))]">
              {t("faq.subtitle")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200} className="mb-20">
            <FAQAccordion items={faqItems} />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="text-center p-8 bg-[rgb(var(--color-muted))] rounded-[var(--radius-2xl)] border border-[rgb(var(--color-border))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-4">Still have questions?</h3>
              <p className="text-[rgb(var(--color-muted-foreground))] mb-8">
                Can&apos;t find the answer you&apos;re looking for? Please reach out to our team.
              </p>
              <Button href="/contact">
                Contact us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
