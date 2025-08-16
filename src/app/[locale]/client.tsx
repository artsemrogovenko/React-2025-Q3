'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MySpinner } from '../../components/components/Loader.tsx';

const Home = dynamic(
  () => import('../../components/Home.tsx').then((mod) => mod.Home),
  {
    ssr: false,
    loading: () => <MySpinner />,
  }
);

export function ClientOnly() {
  return <Home />;
}
