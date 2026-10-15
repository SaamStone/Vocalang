import { siteConfig } from '@/lib/config/site';

export const metadata = { title: 'Privacy Policy | Vocalang' };

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <div className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] p-4 rounded-md mb-8 border border-[var(--color-warning)]/20">
        This notice describes the current website preview. It must be reviewed and updated before the product processes call or customer account data.
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Version: {siteConfig?.legalVersions?.privacy || '1.0.0'} | Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Information collected</h2>
        <p className="mb-4">When you submit a demo or contact form, Vocalang collects the details you enter, such as your name, phone number, email address, organization, preferred language, expected call volume, and message.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">2. How we use it</h2>
        <p className="mb-4">We use form details to review and respond to your enquiry and arrange a product demonstration. The current website does not place calls or collect call recordings.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Storage and access</h2>
        <p className="mb-4">Form submissions are stored in a Cloudflare D1 database. Access to the submissions dashboard is restricted to the founder account. Cloudflare provides the database infrastructure for this storage.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Cookies</h2>
        <p className="mb-4">The founder dashboard uses a secure, HTTP-only session cookie after sign-in. The public website does not use that cookie for form submissions.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Service providers</h2>
        <p className="mb-4">Vercel hosts the website and Cloudflare provides the D1 database used for form storage. We do not sell form submission details.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Retention and deletion requests</h2>
        <p className="mb-4">Form records remain in the database until the founder removes them. To request correction or deletion, use the contact form and include the email address used in your submission. Requests are handled manually.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Questions about your information</h2>
        <p className="mb-4">Use the contact form to ask about information you submitted or request that it be corrected or removed.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Changes</h2>
        <p className="mb-4">We may update this notice as the website and data practices change. The version and last updated date will be shown above.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Contact</h2>
        <p className="mb-4">For privacy questions or a request concerning your form submission, use the <a href="/contact">contact form</a>.</p>
      </section>
    </article>
  );
}
