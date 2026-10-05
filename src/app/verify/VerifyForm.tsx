'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';

export function VerifyForm() {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[rgb(var(--color-card))] rounded-lg shadow-sm border border-[rgb(var(--color-border))]">
      <h1 className="text-2xl font-bold mb-2 text-center text-[rgb(var(--color-foreground))]">Verify Your Account</h1>
      <p className="text-center text-sm text-[rgb(var(--color-muted-foreground))] mb-6">
        Please enter the verification codes sent to your email and phone.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="emailCode" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Email Verification Code</label>
          <div className="flex gap-2">
            <input
              id="emailCode"
              type="text"
              maxLength={6}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              className="flex-1 px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
              placeholder="••••••"
              required
              aria-label="Email Verification Code"
            />
            <Button type="button" variant="outline" className="px-3">
              Resend
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneCode" className="text-sm font-medium text-[rgb(var(--color-foreground))]">Phone Verification Code</label>
          <div className="flex gap-2">
            <input
              id="phoneCode"
              type="text"
              maxLength={6}
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="flex-1 px-3 py-2 border border-[rgb(var(--color-border))] rounded-md bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
              placeholder="••••••"
              required
              aria-label="Phone Verification Code"
            />
            <Button type="button" variant="outline" className="px-3">
              Resend
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full mt-2">
          Verify Codes
        </Button>
      </form>
    </div>
  );
}