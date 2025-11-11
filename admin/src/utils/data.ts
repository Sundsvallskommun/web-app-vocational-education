import { NestedPage } from '../interfaces/page';

export const transformPageCreate = (extraParameters?: object) => (data: object) => {
  return {
    ...data,
    ...(extraParameters || {}),
  };
};

export const urlToPageName = (url: string) => (url ? url.replace(/\//g, '_') : '');

export const pageSort = (a: NestedPage, b: NestedPage) => {
  const urlsToPutLast = [
    '/404',
    '/login',
    '/kakor',
    '/om-webbplatsen',
    '/personuppgifter',
    '/tillganglighetsredogorelse',
    '/kontakta-oss',
  ];

  const aUrl = a?.url || '';
  const bUrl = b?.url || '';

  const aIsLast = urlsToPutLast.includes(aUrl);
  const bIsLast = urlsToPutLast.includes(bUrl);

  if (aIsLast && bIsLast) return 0; // Keep their relative order if both are "last" URLs
  if (aIsLast) return 1; // Push `a` after `b`
  if (bIsLast) return -1; // Push `b` after `a`

  // Regular sorting for other URLs
  return aUrl.localeCompare(bUrl);
};
