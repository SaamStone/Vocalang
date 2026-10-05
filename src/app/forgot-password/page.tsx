import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password | Vocalang',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--color-background))]">
      <ForgotPasswordForm />
    </div>
  );
}