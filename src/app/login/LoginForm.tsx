'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleSignInButton } from '@/components/shared/GoogleSignInButton';
import { Button } from '@/components/shared/Button';
import { t } from '@/lib/i18n';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const identifier = String(formData.get('email') ?? '').trim();

    // Local preview only: keep an identifier and temporary session in this tab.
    // Never persist or validate the password; Supabase will replace this flow.
    window.sessionStorage.setItem(
      'vocalang-demo-session',
      JSON.stringify({ identifier, createdAt: new Date().toISOString() }),
    );
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-[1.75rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))/0.9] p-7 shadow-[var(--shadow-xl)] backdrop-blur-xl sm:p-9">
      <h1 className="text-3xl font-semibold tracking-tight mb-2 text-center text-[rgb(var(--color-foreground))]">{t('auth.login.title')}</h1>
      <p className="mb-7 text-center text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">Sign in to continue to your Vocalang workspace.</p>
      <GoogleSignInButton />
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />
        <span className="text-xs text-[rgb(var(--color-muted-foreground))]">OR CONTINUE WITH EMAIL</span>
        <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />
      </div>
      <p className="mb-4 rounded-lg border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
        Local demo only: enter any email and password to preview the dashboard. Your password is discarded; the temporary session ends when this tab closes.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[rgb(var(--color-foreground))]">
            Email or Phone Number
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
            required
            aria-label="Email or Phone Number"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-[rgb(var(--color-foreground))]">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm text-[rgb(var(--color-primary))] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] pr-10"
              required
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <Button type="submit" className="mt-2 w-full">
          Preview dashboard
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[rgb(var(--color-muted-foreground))]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[rgb(var(--color-primary))] hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
