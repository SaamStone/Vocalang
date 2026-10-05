'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/site';
import { t } from '@/lib/i18n';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';

// NOTE: Next.js will throw an error if you export metadata from a 'use client' component.
// To use metadata here, you can extract the form to a separate component and leave page.tsx as a Server Component.
// export const metadata = {
//   title: 'Contact Us | Vocalang',
//   description: 'Get in touch with the Vocalang team.',
// };

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)]">
              Get in touch
            </h1>
            <p className="text-xl text-[var(--color-muted-foreground)]">
              Have questions about Vocalang? We're here to help you get started.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <div className="bg-[var(--color-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-foreground)]">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-foreground)]">
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-[var(--color-foreground)]">
                    {t('contact.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--color-foreground)]">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : isSuccess ? (
                    'Message Sent!'
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Message</>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-1">Email</h3>
                  <a href={`mailto:${siteConfig.contact?.email || 'hello@vocalang.com'}`} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {siteConfig.contact?.email || 'hello@vocalang.com'}
                  </a>
                </div>

                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-1">Phone</h3>
                  <a href={`tel:${siteConfig.contact?.phone || '+918000000000'}`} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {siteConfig.contact?.phone || '+91 800 000 0000'}
                  </a>
                </div>

                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)] sm:col-span-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-1">Office</h3>
                  <p className="text-[var(--color-muted-foreground)]">
                    {siteConfig.contact?.address || 'Hyderabad, Telangana, India'}
                  </p>
                </div>
              </div>

              <div className="bg-[var(--color-muted)] w-full h-64 rounded-3xl border border-[var(--color-border)] flex items-center justify-center">
                <span className="text-[var(--color-muted-foreground)] font-medium">Map coming soon</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
