import { siteConfig } from '@/lib/config/site';

export const metadata = { title: 'Privacy Policy | Vocalang' };

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <div className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] p-4 rounded-md mb-8 border border-[var(--color-warning)]/20">
        ⚠️ DRAFT — This document contains placeholder text and will be reviewed by legal professionals before launch.
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Version: {siteConfig?.legalVersions?.privacy || '1.0.0'} | Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Information We Collect</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">2. How We Use Information</h2>
        <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Data Storage & Security</h2>
        <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Cookies</h2>
        <p className="mb-4">Excepteur sint occaecat cupidatat non proident.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Third-Party Services</h2>
        <p className="mb-4">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Data Retention</h2>
        <p className="mb-4">Placeholder text for data retention policy.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Your Rights</h2>
        <p className="mb-4">Placeholder text for user rights.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Children's Privacy</h2>
        <p className="mb-4">Placeholder text for children's privacy.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Changes</h2>
        <p className="mb-4">Placeholder text for policy changes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">10. Contact</h2>
        <p className="mb-4">For privacy related inquiries, contact privacy@vocalang.com.</p>
      </section>
    </article>
  );
}