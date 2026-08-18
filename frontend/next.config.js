const envalid = require('envalid');

const authDependent = envalid.makeValidator((x) => {
  const authEnabled = process.env.HEALTH_AUTH === 'true';

  if (authEnabled && !x.length) {
    throw new Error(`Can't be empty if "HEALTH_AUTH" is true`);
  }

  return x;
});

envalid.cleanEnv(process.env, {
  NEXT_PUBLIC_API_URL: envalid.str(),
  HEALTH_AUTH: envalid.bool(),
  HEALTH_USERNAME: authDependent(),
  HEALTH_PASSWORD: authDependent(),
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'standalone',
  // Next 16 writes AGENTS.md/CLAUDE.md into the project on `next dev` by default.
  agentRules: false,
  images: {
    remotePatterns: [{ hostname: process.env.DOMAIN_NAME || 'localhost' }, { hostname: 'placehold.co' }],
    formats: ['image/avif', 'image/webp'],
    // Next 16 refuses to optimize images whose host resolves to a local/private IP
    // and answers 400 "url parameter is not allowed". DOMAIN_NAME points at the
    // server's own address (localhost in development, the /etc/hosts entry described
    // in the README when deployed), so uploaded images hit that restriction.
    dangerouslyAllowLocalIP: true,
    // Next 16 narrowed the default from "any quality" to [75]; map-block renders at 100.
    qualities: [75, 100],
  },
  basePath: process.env.BASE_PATH,
  sassOptions: {
    // Turbopack cannot execute JS callbacks passed via `sassOptions.functions`,
    // so the base path is injected as a Sass variable instead. The entry
    // stylesheet (src/styles/tailwind.scss) forwards it to `variables.$basePath`.
    additionalData: `$injectedBasePath: '${process.env.NEXT_PUBLIC_BASE_PATH || ''}';`,
  },
  transpilePackages: ['lucide-react'],
  experimental: {
    swcPlugins: process.env.TEST === 'true' ? [['swc-plugin-coverage-instrument', {}]] : [],
    optimizePackageImports: ['@sk-web-gui'],
  },
  async rewrites() {
    return [{ source: '/napi/:path*', destination: '/api/:path*' }];
  },
});
