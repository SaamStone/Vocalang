export const metadata = { title: 'Terms & Conditions | Vocalang' };

export default function TermsPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
        <p className="text-[var(--color-muted-foreground)]">Vocalang website preview</p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Service availability</h2>
        <p className="mb-4">This site is a product preview. Public visitors can submit a demo or contact request. Customer accounts, calling campaigns, contact uploads, and payments are not available for self-service.</p>
        <p className="mb-4">Pricing shown on the website is indicative and is not a checkout or payment offer. Any future service terms, prices, and operating conditions will be provided for review before a customer activates a paid service.</p>
        <p className="mb-4">These preview terms do not replace the final terms that will be published before the commercial service is launched. For questions, use the <a href="/contact">contact form</a>.</p>
      </section>
    </article>
  );
}
