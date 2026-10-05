import { siteConfig } from '@/lib/config/site';

export const metadata = { title: 'Terms & Conditions | Vocalang' };

export default function TermsPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <div className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] p-4 rounded-md mb-8 border border-[var(--color-warning)]/20">
        ⚠️ DRAFT — This document contains placeholder text and will be reviewed by legal professionals before launch.
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Version: {siteConfig?.legalVersions?.terms || '1.0.0'} | Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Acceptance</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Service Description</h2>
        <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">3. User Accounts</h2>
        <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Payment Terms</h2>
        <p className="mb-4">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Acceptable Use</h2>
        <p className="mb-4">Placeholder text for Acceptable Use terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Intellectual Property</h2>
        <p className="mb-4">Placeholder text for Intellectual Property terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Limitation of Liability</h2>
        <p className="mb-4">Placeholder text for Limitation of Liability terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Termination</h2>
        <p className="mb-4">Placeholder text for Termination terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Governing Law</h2>
        <p className="mb-4">Placeholder text for Governing Law terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">10. Changes</h2>
        <p className="mb-4">Placeholder text for Changes terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">11. Contact</h2>
        <p className="mb-4">For any questions, please contact us at support@vocalang.com.</p>
      </section>
    </article>
  );
}