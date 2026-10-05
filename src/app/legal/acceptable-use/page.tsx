import { siteConfig } from '@/lib/config/site';

export const metadata = { title: 'Acceptable Use Policy | Vocalang' };

export default function AcceptableUsePage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <div className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] p-4 rounded-md mb-8 border border-[var(--color-warning)]/20">
        ⚠️ DRAFT — This document contains placeholder text and will be reviewed by legal professionals before launch.
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Acceptable Use Policy</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Version: {siteConfig?.legalVersions?.acceptableUse || '1.0.0'} | Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Purpose</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Permitted Uses</h2>
        <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Prohibited Uses</h2>
        <p className="mb-4">Spam, harassment, illegal activity, etc. Ut enim ad minim veniam.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Compliance</h2>
        <p className="mb-4">TRAI, DND, calling hours compliance. Excepteur sint occaecat cupidatat non proident.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Enforcement</h2>
        <p className="mb-4">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Reporting Violations</h2>
        <p className="mb-4">Placeholder text for reporting violations.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Contact</h2>
        <p className="mb-4">Contact abuse@vocalang.com for issues.</p>
      </section>
    </article>
  );
}