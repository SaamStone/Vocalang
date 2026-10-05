'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoogleSignInButton } from '@/components/shared/GoogleSignInButton';
import { Button } from '@/components/shared/Button';
import { siteConfig } from '@/lib/config/site';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-[1.75rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))/0.9] p-7 shadow-[var(--shadow-xl)] backdrop-blur-xl sm:p-9">
      <h1 className="text-3xl font-semibold tracking-tight mb-2 text-center text-[rgb(var(--color-foreground))]">Create your workspace</h1>
      <p className="mb-7 text-center text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">A few details will help us tailor Vocalang to your team.</p>
      <GoogleSignInButton />
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />
        <span className="text-xs text-[rgb(var(--color-muted-foreground))]">OR SIGN UP WITH EMAIL</span>
        <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
            required
            aria-label="Full Name"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="businessName" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Business Name</label>
            <input
              id="businessName"
              type="text"
              className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
              required
              aria-label="Business Name"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="industry" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Industry</label>
            <select
              id="industry"
              className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
              required
              aria-label="Industry"
            >
              <option value="">Select industry</option>
              {siteConfig?.industries?.map((ind) => (
                <option key={ind.slug} value={ind.slug}>{ind.name}</option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>
        </div>

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

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
            required
            aria-label="Phone Number"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1 relative">
            <label htmlFor="password" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] pr-10"
              required
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-[34px] text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex flex-col gap-1 flex-1 relative">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] pr-10"
              required
              aria-label="Confirm Password"
            />
            <button
              type="button"
              className="absolute right-3 top-[34px] text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-2">
          <input
            id="terms"
            type="checkbox"
            className="mt-1 border-[rgb(var(--color-border))] rounded bg-[rgb(var(--color-background))]"
            required
            aria-label="Agree to terms"
          />
          <label htmlFor="terms" className="text-sm text-[rgb(var(--color-muted-foreground))]">
            I agree to the{' '}
            <Link href="/legal/terms" className="text-[rgb(var(--color-primary))] hover:underline">Terms & Conditions</Link>,{' '}
            <Link href="/legal/privacy" className="text-[rgb(var(--color-primary))] hover:underline">Privacy Policy</Link>, and{' '}
            <Link href="/legal/acceptable-use" className="text-[rgb(var(--color-primary))] hover:underline">Acceptable Use Policy</Link>.
          </label>
        </div>

        <Button type="submit" className="mt-4 w-full">
          Sign Up
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[rgb(var(--color-muted-foreground))]">
        Already have an account?{' '}
        <Link href="/login" className="text-[rgb(var(--color-primary))] hover:underline font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
