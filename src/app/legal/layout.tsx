import { LegalSidebar } from './LegalSidebar';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <LegalSidebar />
      </aside>
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}