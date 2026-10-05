"use client";

import { useRef, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function subscribeToMotionPreference(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getMotionPreferenceSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotionPreferenceSnapshot() {
  return false;
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Reveals children on scroll with a subtle fade+translate animation.
 * Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreferenceSnapshot,
    getServerMotionPreferenceSnapshot
  );
  const isVisible = prefersReducedMotion || hasEntered;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)]",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
