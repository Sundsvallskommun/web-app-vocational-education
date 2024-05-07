const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'standalone',
  i18n: {
    locales: ['sv'],
    defaultLocale: 'sv',
  },
  images: {
    domains: [process.env.DOMAIN_NAME || 'localhost', 'placehold.co'],
    formats: ['image/avif', 'image/webp'],
  },
  basePath: process.env.BASE_PATH,
  sassOptions: {
    prependData: `$basePath: '${process.env.BASE_PATH}';`,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${process.env.ADMIN_URL}`,
        permanent: false,
        basePath: false,
      },
    ];
  },
});
