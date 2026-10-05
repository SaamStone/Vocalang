'use client';

import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export function ForgotPasswordForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[rgb(var(--color-card))] rounded-lg shadow-sm border border-[rgb(var(--color-border))]">
      <h1 className="text-2xl font-bold mb-2 text-center text-[rgb(var(--color-foreground))]">Reset Password</h1>
      <p className="text-center text-sm text-[rgb(var(--color-muted-foreground))] mb-6">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Email Address</label>
          <input
            id="email"
            type="email"
            className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
            required
            aria-label="Email Address"
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Submit
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-[rgb(var(--color-primary))] hover:underline font-medium">
          Back to login
        </Link>
      </p>
    </div>
  );
}