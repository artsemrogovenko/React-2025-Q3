import type { Metadata } from 'next';
import App from '../../App.tsx';
import { AppProvider } from '../../AppContext.tsx';
import { StoreProvider } from './StoreProvider.tsx';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import '../../index.css';
import '../../App.css';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ErrorBoundary } from '../../components/ErrorBoundary.tsx';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Next.js. Server Side Rendering',
  icons: {
    icon: '/vite.svg',
  },
};

export default async function LocaleLayout({
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
        <ErrorBoundary>
          <AppProvider>
            <StoreProvider>
              <div id="root">
                <NextIntlClientProvider>
                  <App>{children} </App>
                </NextIntlClientProvider>
              </div>
            </StoreProvider>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
