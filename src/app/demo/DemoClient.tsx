'use client';

import { useState } from 'react';
import { Phone, Check, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/site';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';

export function DemoClient() {
  const industries = siteConfig.industries;
  const languages = siteConfig.supportedVoiceLanguages;

  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [industry, setIndustry] = useState('');
  const [language, setLanguage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeIndustry = industries[activeIndustryIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[rgb(var(--color-foreground))] mb-6">
              Try Vocalang — free
            </h1>
            <p className="text-xl text-[rgb(var(--color-muted-foreground))] max-w-2xl mx-auto">
              Experience the future of voice interactions firsthand.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
            <ScrollReveal className="space-y-6">
              <h2 className="text-3xl font-bold text-[rgb(var(--color-foreground))]">How it works</h2>
              <p className="text-lg text-[rgb(var(--color-muted-foreground))]">
                Fill out the form with your phone number and preferred settings. Within seconds:
              </p>
              <ul className="space-y-4 mt-6">
                {[
                  'Our AI will call YOUR number directly',
                  'You get one free demo call to test the capabilities',
                  'Experience a natural, fluid conversation in your chosen language',
                ].map((step, i) => (
                  <li key={i} className="flex items-center text-[rgb(var(--color-muted-foreground))]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgb(var(--color-success-light))] flex items-center justify-center mr-4">
                      <Check className="w-3.5 h-3.5 text-[rgb(var(--color-success))]" />
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] p-8 rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)]">
                <h3 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-6">Enter your details</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="demo-phone" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--color-muted-foreground))]" />
                      <input
                        id="demo-phone"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-[rgb(var(--color-input))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] text-[rgb(var(--color-foreground))] focus:ring-2 focus:ring-[rgb(var(--color-ring))] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="demo-industry" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-2">
                      Industry
                    </label>
                    <select
                      id="demo-industry"
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 bg-[rgb(var(--color-input))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] text-[rgb(var(--color-foreground))] focus:ring-2 focus:ring-[rgb(var(--color-ring))] focus:outline-none appearance-none"
                    >
                      <option value="" disabled>Select your industry</option>
                      {industries.map((ind) => (
                        <option key={ind.slug} value={ind.slug}>{ind.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="demo-language" className="block text-sm font-medium text-[rgb(var(--color-foreground))] mb-2">
                      Language
                    </label>
                    <select
                      id="demo-language"
                      required
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-[rgb(var(--color-input))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] text-[rgb(var(--color-foreground))] focus:ring-2 focus:ring-[rgb(var(--color-ring))] focus:outline-none appearance-none"
                    >
                      <option value="" disabled>Select AI voice language</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" className="w-full py-4 text-lg mt-4">
                    {submitted ? '✓ Demo request sent!' : 'Call me now'}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* What to expect */}
          <ScrollReveal className="mb-24">
            <h2 className="text-3xl font-bold text-[rgb(var(--color-foreground))] text-center mb-16">What to expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '1. Phone rings', desc: 'You will receive a call from our secure demo number.', icon: Phone },
                { title: '2. AI introduces itself', desc: 'The voice agent greets you and sets the context for the conversation.', icon: MessageSquare },
                { title: '3. Have a conversation', desc: 'Ask questions, interrupt, or test its knowledge naturally.', icon: Check },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="text-center relative">
                    <div className="w-16 h-16 mx-auto bg-[rgb(var(--color-primary-light))] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[rgb(var(--color-primary))]" />
                    </div>
                    <h3 className="text-xl font-bold text-[rgb(var(--color-foreground))] mb-3">{step.title}</h3>
                    <p className="text-[rgb(var(--color-muted-foreground))]">{step.desc}</p>
                    {i < 2 && <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-1/2 h-0.5 bg-[rgb(var(--color-border))] -z-10" />}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Sample transcript by industry */}
          <ScrollReveal>
            <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-[var(--radius-2xl)] p-8 max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-8 text-center">Sample Transcript</h2>

              <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-[rgb(var(--color-border))]">
                {industries.map((ind, i) => (
                  <button
                    key={ind.slug}
                    onClick={() => setActiveIndustryIdx(i)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 font-medium transition-colors border-b-2 text-sm",
                      i === activeIndustryIdx
                        ? "text-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]"
                        : "text-[rgb(var(--color-muted-foreground))] border-transparent hover:text-[rgb(var(--color-foreground))]"
                    )}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {activeIndustry?.sampleTranscript.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex",
                      msg.role === 'customer' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-5 py-3 text-sm leading-relaxed",
                        msg.role === 'customer'
                          ? "bg-[rgb(var(--color-primary))] text-white rounded-2xl rounded-br-md"
                          : "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-foreground))] rounded-2xl rounded-bl-md"
                      )}
                    >
                      <span className="block text-[10px] font-semibold uppercase mb-1 opacity-70">
                        {msg.role === 'agent' ? '🤖 AI Agent' : '👤 Customer'}
                      </span>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button href="/register" size="lg">
                Ready for the full experience? Sign up →
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
