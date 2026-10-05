import { VerifyForm } from './VerifyForm';

export const metadata = {
  title: 'Verify Account | Vocalang',
};

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--color-background))]">
      <VerifyForm />
    </div>
  );
}