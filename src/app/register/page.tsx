import { RegisterForm } from './RegisterForm';
import { AuthPageLayout } from '@/components/layout/AuthPageLayout';

export const metadata = {
  title: 'Sign Up | Vocalang',
};

export default function RegisterPage() {
  return (
    <AuthPageLayout mode="signup">
      <RegisterForm />
    </AuthPageLayout>
  );
}
