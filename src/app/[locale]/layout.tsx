import type { Metadata } from 'next';
import App from '../../components/App.tsx';
import { AppProvider } from '../../components/AppContext.tsx';
import { StoreProvider } from './StoreProvider.tsx';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../../components/index.css';
import '../../components/App.css';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing.ts';
import { ErrorBoundary } from '../../components/components/ErrorBoundary.tsx';

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
  const messages = await getMessages({ locale: locale });
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>
        <ErrorBoundary>
          <AppProvider>
            <StoreProvider>
              <div id="root">
                <NextIntlClientProvider messages={messages}>
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
