import { LoginForm } from './LoginForm';
import { AuthPageLayout } from '@/components/layout/AuthPageLayout';

export const metadata = {
  title: 'Log In | Vocalang',
};

export default function LoginPage() {
  return (
    <AuthPageLayout mode="login">
      <LoginForm />
    </AuthPageLayout>
  );
}
