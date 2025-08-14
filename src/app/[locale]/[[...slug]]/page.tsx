import '../../../index.css';
import { ClientOnly } from './client.tsx';

export function generateStaticParams() {
  return [{ slug: [] }, { slug: ['details'] }, { slug: ['page'] }];
}

export default function Page() {
  return <ClientOnly />;
}
