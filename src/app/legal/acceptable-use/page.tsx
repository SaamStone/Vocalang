export const metadata = { title: 'Acceptable Use | Vocalang' };

export default function AcceptableUsePage() {
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[var(--color-foreground)]">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Acceptable Use</h1>
        <p className="text-[var(--color-muted-foreground)]">Applies to the Vocalang website preview</p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Using this website</h2>
        <p className="mb-4">Use the website and its forms lawfully. Submit only information you are authorized to share, and do not use the site to send malicious code, disrupt the service, or attempt to access private areas or other users&apos; information.</p>
        <p className="mb-4">The public preview does not provide contact uploads or calling campaigns. This short preview policy is not the operating policy for any future calling service; that policy will be published before those features are offered.</p>
        <p className="mb-4">To report a website issue, use the <a href="/contact">contact form</a>.</p>
      </section>
    </article>
  );
}
