'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { AppProvider } from '../../AppContext.tsx';
import { StoreProvider } from '../StoreProvider.tsx';
import { MySpinner } from '../../components/Loader.tsx';
import App from '../../App.tsx';

const Home = dynamic(() => import('../../Home').then((mod) => mod.Home), {
  ssr: false,
  loading: () => <MySpinner />,
});

const About = dynamic(
  () => import('../../pages/About.tsx').then((mod) => mod.About),
  {
    ssr: false,
    loading: () => <MySpinner />,
  }
);

const NotFound = dynamic(
  () => import('../../pages/NotFound').then((mod) => mod.NotFound),
  {
    ssr: false,
    loading: () => <MySpinner />,
  }
);

function Children() {
  const { slug } = useParams<{ slug?: string[] }>() ?? {};

  if (!slug || slug.length === 0) {
    return <Home />;
  }

  switch (slug[0]) {
    case 'about':
      return <About />;
    default:
      return <NotFound />;
  }
}

export function ClientOnly() {
  return (
    <AppProvider>
      <StoreProvider>
        <App>
          <Children />
        </App>
      </StoreProvider>
    </AppProvider>
  );
}
