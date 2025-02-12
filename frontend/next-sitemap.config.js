const appURL = (path = '') => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return `${baseURL}${basePath}${path}`;
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: `${appURL()}`,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [`${appURL()}/server-sitemap-index.xml`],
  },
};

module.exports = config;
