"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/shared/Button";
import type { PricingPlan } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

export function PricingPlans({ plans }: { plans: readonly PricingPlan[] }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <>
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="inline-flex rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))] p-1" role="group" aria-label="Choose billing period">
          <button type="button" onClick={() => setBillingCycle("monthly")} aria-pressed={billingCycle === "monthly"} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${billingCycle === "monthly" ? "bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] shadow-[var(--shadow-sm)]" : "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"}`}>
            Monthly
          </button>
          <button type="button" onClick={() => setBillingCycle("annual")} aria-pressed={billingCycle === "annual"} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${billingCycle === "annual" ? "bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] shadow-[var(--shadow-sm)]" : "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"}`}>
            Annual
          </button>
        </div>
        <p className="text-sm text-[rgb(var(--color-muted-foreground))]" aria-live="polite">
          {billingCycle === "annual" ? "Annual rates are placeholders until confirmed." : "Monthly rates are placeholders until confirmed."}
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {plans.map((plan, index) => {
          const isPopular = Boolean(plan.popular);
          const isEnterprise = plan.price < 0;
          const isAnnualUnpriced = billingCycle === "annual" && !isEnterprise && plan.price > 0 && plan.annualPrice == null;
          const displayedPrice = billingCycle === "annual" ? plan.annualPrice : plan.price;

          return (
            <motion.article
              key={plan.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: isPopular ? -8 : 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.07 }}
              className={`relative flex h-full flex-col rounded-[1.5rem] border bg-[rgb(var(--color-card))] p-7 transition-shadow hover:shadow-[var(--shadow-lg)] sm:p-8 ${isPopular ? "border-[rgb(var(--color-accent))] shadow-[var(--shadow-xl)]" : "border-[rgb(var(--color-border))] shadow-[var(--shadow-sm)]"}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[rgb(var(--color-accent))] px-4 py-1.5 text-xs font-semibold text-white">
                  <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Recommended
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">{plan.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">{plan.description}</p>

                <div className="mt-6 min-h-[5.25rem]">
                  {isEnterprise ? (
                    <p className="text-4xl font-semibold tracking-tight text-[rgb(var(--color-foreground))]">Custom</p>
                  ) : isAnnualUnpriced ? (
                    <p className="max-w-[12rem] pt-1 text-lg font-semibold leading-6 text-[rgb(var(--color-foreground))]">Annual rate to be confirmed</p>
                  ) : displayedPrice === 0 ? (
                    <p className="text-4xl font-semibold tracking-tight text-[rgb(var(--color-foreground))]">Free</p>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight text-[rgb(var(--color-foreground))]" aria-live="polite">{formatINR(displayedPrice ?? plan.price)}</span>
                      <span className="text-sm text-[rgb(var(--color-muted-foreground))]">/ month</span>
                    </div>
                  )}
                  {!isEnterprise && !isAnnualUnpriced && displayedPrice !== 0 && (
                    <p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">Billed {billingCycle === "monthly" ? "monthly" : "annually"}</p>
                  )}
                  {plan.perMinuteRate > 0 && <p className="mt-2 text-sm font-medium text-[rgb(var(--color-accent))]">{formatINR(plan.perMinuteRate)} per minute</p>}
                </div>

                <Button href={isEnterprise ? "/contact" : "/register"} variant={isPopular ? "primary" : "outline"} className="mb-7 mt-2 w-full">
                  {plan.cta}
                </Button>

                <p className="mb-4 text-xs font-semibold uppercase tracking-[.12em] text-[rgb(var(--color-foreground))]">Includes</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[rgb(var(--color-success))]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </>
  );
}
