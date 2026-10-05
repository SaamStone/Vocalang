import { Metadata } from 'next';
import { DemoClient } from './DemoClient';

export const metadata: Metadata = {
  title: 'Free Demo | Vocalang',
  description: 'Try Vocalang AI voice calls for free.',
};

export default function DemoPage() {
  return <DemoClient />;
}
