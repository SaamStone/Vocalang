import { Metadata } from 'next';
import { Lightbulb, Shield, Heart, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Vocalang',
  description: 'Learn about our mission and the team behind Vocalang.',
};

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push the boundaries of AI voice technology to deliver the most natural conversations possible.'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Your data is sacred. We employ enterprise-grade security measures to protect every call and contact.'
  },
  {
    icon: Heart,
    title: 'Transparency',
    description: 'No hidden fees or black-box algorithms. We believe in clear pricing and explainable AI.'
  },
  {
    icon: Globe2,
    title: 'Accessibility',
    description: 'Making enterprise-grade tools available to businesses of all sizes across India.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-foreground)] mb-8">
            About Vocalang
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-[var(--color-primary)] leading-tight mb-6">
            "We believe every business in India deserves access to AI-powered communication tools, regardless of size or budget."
          </p>
        </ScrollReveal>
      </section>

      <section className="py-20 px-6 bg-[var(--color-muted)]/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16 text-[var(--color-foreground)]">Our Values</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] h-full">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">{value.title}</h3>
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed">{value.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[var(--color-foreground)]">Our approach</h2>
              <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                Vocalang is proudly built on Sarvam AI to provide unparalleled support for Indian languages. We combine cutting-edge language models with robust telephony infrastructure to deliver a seamless calling experience. Our platform is designed from the ground up to understand the nuances, dialects, and contexts unique to the Indian market.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[var(--color-foreground)]">Our team</h2>
              <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                Our team of engineers and designers is based in Hyderabad, building the future of business communication. We are passionate about democratizing access to AI and helping businesses scale their operations efficiently.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 text-center">
        <ScrollReveal>
          <div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
              We'd love to chat about how Vocalang can help your business grow.
            </p>
            <Button size="lg" href="/contact" className="bg-white text-[rgb(var(--color-primary))] hover:bg-white/90">
              Contact Us
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
