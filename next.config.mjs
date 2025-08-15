import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/.*',
        '**/node_modules/**',
        '**/System Volume Information/**',
        '**/pagefile.sys',
        '**/DumpStack.log.tmp',
        '**/swapfile.sys',
      ],
    };
    return config;
  },
  // experimental: {
  //   globalNotFound: true,
  // },
  images: { unoptimized: true },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
