import type { Metadata } from 'next';
import App from '../App.tsx';
import { AppProvider } from '../AppContext.tsx';
import { StoreProvider } from './[locale]/StoreProvider.tsx';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Next.js. Server Side Rendering',
  icons: {
    icon: '/vite.svg',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>
        <AppProvider>
          <StoreProvider>
            <div id="root">
              <NextIntlClientProvider>
                <App locale={locale}>{children} </App>
              </NextIntlClientProvider>
            </div>
          </StoreProvider>
        </AppProvider>
      </body>
    </html>
  );
}
