import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Next.js. Server Side Rendering',
  icons: {
    icon: '/vite.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
