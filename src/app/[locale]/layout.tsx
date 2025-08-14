import type { Metadata } from 'next';
import App from '../../App.tsx';
import { AppProvider } from '../../AppContext.tsx';
import { StoreProvider } from './StoreProvider.tsx';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing.ts';
import { setRequestLocale } from 'next-intl/server';

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>
        <AppProvider>
          <StoreProvider>
            <div id="root">
              <NextIntlClientProvider>
                <App>{children} </App>
              </NextIntlClientProvider>
            </div>
          </StoreProvider>
        </AppProvider>
      </body>
    </html>
  );
}
