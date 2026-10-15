export const metadata = { title: 'Refund Policy | Vocalang' };

export default function RefundPage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Refund Policy</h1>
        <p className="text-[var(--color-muted-foreground)]">Vocalang website preview</p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">No payments are taken on this website</h2>
        <p className="mb-4">The current preview does not offer paid plans, wallet top-ups, or checkout. The prices displayed are indicative references only; no payment is due by submitting a demo or contact form.</p>
        <p className="mb-4">A final refund policy will be published before any paid service is offered. If you believe a payment was taken in error, contact us using the <a href="/contact">contact form</a>.</p>
      </section>
    </article>
  );
}
