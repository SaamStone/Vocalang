'use client';

import { useState, type FormEvent } from 'react';

const fieldClass = 'mt-1.5 w-full rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input))] px-3.5 py-3 text-sm text-[rgb(var(--color-foreground))] outline-none transition focus-visible:border-[rgb(var(--color-ring))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-ring))/0.25]';
const labelClass = 'block text-sm font-medium text-[rgb(var(--color-foreground))]';

export function DemoClient() {
  const [language, setLanguage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          formType: 'demo',
          language: values.language === 'Other' ? values.otherLanguage : values.language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not send your request.');

      form.reset();
      setLanguage('');
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not send your request.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-[rgb(var(--color-background))] px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-6 shadow-xl sm:p-9">
        <p className="marketing-kicker">Vocalang demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl">Book a demo</h1>
        <p className="mt-3 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">Share your details and our team will get back to you.</p>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="demo-website-honeypot">Website</label>
            <input id="demo-website-honeypot" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <label className={labelClass} htmlFor="demo-name">Name *
            <input className={fieldClass} id="demo-name" name="name" autoComplete="name" required placeholder="Your name" />
          </label>
          <label className={labelClass} htmlFor="demo-phone">Number *
            <input className={fieldClass} id="demo-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 98765 43210" />
          </label>
          <label className={labelClass} htmlFor="demo-email">Email *
            <input className={fieldClass} id="demo-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          <label className={labelClass} htmlFor="demo-organization">Organization *
            <input className={fieldClass} id="demo-organization" name="organization" autoComplete="organization" required placeholder="Organization name" />
          </label>
          <label className={labelClass} htmlFor="demo-volume">Expected calls per month
            <select className={fieldClass} id="demo-volume" name="callVolume" defaultValue="">
              <option value="" disabled>Select a range</option>
              <option>Under 1,000</option>
              <option>1,000–10,000</option>
              <option>10,000–50,000</option>
              <option>50,000+</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className={labelClass} htmlFor="demo-language">Preferred language *
            <select className={fieldClass} id="demo-language" name="language" value={language} onChange={(event) => setLanguage(event.target.value)} required>
              <option value="" disabled>Select a language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option value="Other">Other</option>
            </select>
          </label>
          {language === 'Other' && (
            <label className={labelClass} htmlFor="demo-other-language">Type your language *
              <input className={fieldClass} id="demo-other-language" name="otherLanguage" required placeholder="Your preferred language" />
            </label>
          )}
          <label className={`${labelClass} sm:col-span-2`} htmlFor="demo-notes">Anything else we should know? <span className="font-normal text-[rgb(var(--color-muted-foreground))]">(optional)</span>
            <textarea className={`${fieldClass} min-h-24 resize-y`} id="demo-notes" name="notes" placeholder="Tell us what you would like to explore." />
          </label>
          <div className="sm:col-span-2">
            {error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}
            {submitted && <p role="status" className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Thank you. Our team will reach out to you soon.</p>}
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-[rgb(var(--color-primary))] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[rgb(var(--color-primary-hover))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))] disabled:cursor-wait disabled:opacity-60">
              {submitting ? 'Sending…' : 'Send demo request'}
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-[rgb(var(--color-muted-foreground))]">Your details will be saved so our team can respond. See our <a className="underline underline-offset-2" href="/legal/privacy">Privacy Policy</a>.</p>
          </div>
        </form>
      </section>
      <section aria-labelledby="demo-process-title" className="mx-auto mt-5 max-w-2xl rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] px-5 py-4">
        <h2 id="demo-process-title" className="text-sm font-semibold text-[rgb(var(--color-foreground))]">What happens next</h2>
        <p className="mt-1 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">Our team will review your request and contact you to arrange a demo.</p>
      </section>
    </main>
  );
}
