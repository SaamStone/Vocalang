"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/shared/Button";
import type { PricingPlan } from "@/lib/mock-data";

interface PricingProps {
  plans: readonly PricingPlan[];
}

export function Pricing({ plans }: PricingProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 text-left md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {plans.map((plan, index) => {
        const isPopular = Boolean(plan.popular);

        return (
          <motion.article
            key={plan.id}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: isPopular ? -8 : 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.07 }}
            className={`relative flex h-full flex-col rounded-3xl border bg-[rgb(var(--color-card))] p-7 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-lg)] sm:p-8 ${isPopular ? "border-[rgb(var(--color-accent))] shadow-[var(--shadow-xl)]" : "border-[rgb(var(--color-border))]"}`}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[rgb(var(--color-accent))] px-4 py-1.5 text-xs font-semibold text-white">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Most Popular
              </div>
            )}

            <div className="flex flex-1 flex-col">
              <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-[rgb(var(--color-foreground))]">₹{plan.perMinuteRate}</span>
                <span className="text-sm font-medium text-[rgb(var(--color-muted-foreground))]">/ min</span>
              </div>

              <ul className="my-7 flex-1 space-y-3 border-t border-[rgb(var(--color-border))] pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[rgb(var(--color-success))]" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button href="/contact" variant={isPopular ? "primary" : "outline"} className="w-full">
                {plan.cta}
              </Button>
            </div>
          </motion.article>
        );
      })}
      <p className="text-center text-sm leading-6 text-[rgb(var(--color-muted-foreground))] md:col-span-2 lg:col-span-3">
        Call charges are based on minutes used. Confirm any phone-number charges with our team.
      </p>
    </div>
  );
}
