import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
  title?: string;
}

const variants = {
  primary:
    "bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-hover))] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
  secondary:
    "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-border))]",
  outline:
    "border border-[rgb(var(--color-border))] text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))]",
  ghost:
    "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))]",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  disabled,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-[var(--duration-fast)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
