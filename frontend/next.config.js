const envalid = await import('envalid');

const { str, bool, makeValidator, cleanEnv } = envalid.default || envalid;

const authDependent = makeValidator((x) => {
  const authEnabled = process.env.HEALTH_AUTH === 'true';

  if (authEnabled && !x.length) {
    throw new Error(`Can't be empty if "HEALTH_AUTH" is true`);
  }

  return x;
});

cleanEnv(process.env, {
  NEXT_PUBLIC_API_URL: str(),
  HEALTH_AUTH: bool(),
  HEALTH_USERNAME: authDependent(),
  HEALTH_PASSWORD: authDependent(),
});

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  output: 'standalone',
  i18n: {
    locales: ['sv'],
    defaultLocale: 'sv',
  },
  images: {
    remotePatterns: [{ hostname: process.env.DOMAIN_NAME || 'localhost' }, { hostname: 'placehold.co' }],
    formats: ['image/avif', 'image/webp'],
  },
  basePath: process.env.BASE_PATH,
  sassOptions: {
    prependData: `$basePath: '${process.env.BASE_PATH}';`,
  },
  async rewrites() {
    return [{ source: '/napi/:path*', destination: '/api/:path*' }];
  },
});
