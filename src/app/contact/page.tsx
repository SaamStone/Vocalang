'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setError('');

    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, formType: 'contact' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not send your message.');
      form.reset();
      setIsSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not send your message.');
    } finally {
      setIsSubmitting(false);
    }
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
              Have questions about Vocalang? We&apos;re here to help you get started.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <div className="bg-[var(--color-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website-honeypot">Website</label>
                  <input id="contact-website-honeypot" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-foreground)]">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
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
                    name="email"
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
                    name="phone"
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
                    name="notes"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending…'
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Message</>
                  )}
                </Button>
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                {isSuccess && <p role="status" aria-live="polite" className="text-center text-sm leading-5 text-emerald-800">Thank you. Our team will reach out to you soon.</p>}
                <p className="text-center text-xs leading-5 text-[var(--color-muted-foreground)]">Submitting this form lets us use your details to respond. See our <a className="underline underline-offset-2" href="/legal/privacy">Privacy Policy</a>.</p>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {siteConfig.contact?.email && <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-1">Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>}

                {siteConfig.contact?.phone && <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-1">Phone</h3>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>}

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

            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
