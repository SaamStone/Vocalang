import { Metadata } from 'next';
import { DemoClient } from './DemoClient';

export const metadata: Metadata = {
  title: 'Book a Demo | Vocalang',
  description: 'Request a Vocalang product demo.',
};

export default function DemoPage() {
  return <DemoClient />;
}
