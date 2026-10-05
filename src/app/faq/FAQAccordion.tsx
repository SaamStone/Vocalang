'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] bg-[rgb(var(--color-card))] overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-ring))] hover:bg-[rgb(var(--color-muted))] transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-[rgb(var(--color-foreground))]">{item.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[rgb(var(--color-muted-foreground))] transition-transform duration-[var(--duration-normal)] flex-shrink-0 ml-4",
                openIndex === index ? "rotate-180" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-6 pb-4 pt-2 text-sm text-[rgb(var(--color-muted-foreground))] leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
