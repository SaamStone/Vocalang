import { siteConfig } from '@/lib/config/site';

export const metadata = { title: 'Refund Policy | Vocalang' };

export default function RefundPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <div className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] p-4 rounded-md mb-8 border border-[var(--color-warning)]/20">
        ⚠️ DRAFT — This document contains placeholder text and will be reviewed by legal professionals before launch.
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Refund Policy</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Version: {siteConfig?.legalVersions?.refund || '1.0.0'} | Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Prepaid Wallet Model</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Refund Eligibility</h2>
        <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Non-Refundable Items</h2>
        <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">4. How to Request a Refund</h2>
        <p className="mb-4">Excepteur sint occaecat cupidatat non proident.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Processing Time</h2>
        <p className="mb-4">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">6. GST Implications</h2>
        <p className="mb-4">Placeholder text for GST implications.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Contact</h2>
        <p className="mb-4">Contact billing@vocalang.com for refund inquiries.</p>
      </section>
    </article>
  );
}