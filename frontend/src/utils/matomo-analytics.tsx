'use client';

import { useLocalStorageValue } from '@react-hookz/web';
import { trackAppRouter } from '@socialgouv/matomo-next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function MatomoAnalytics() {
  const localstorageKey = 'matomoIsActive';
  const { value: matomo } = useLocalStorageValue(localstorageKey, {
    defaultValue: false,
    initializeWithValue: true,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
  const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

  useEffect(() => {
    // Track page view on route change
    if (matomo) {
      trackAppRouter({
        url: `${MATOMO_URL}`,
        siteId: `${MATOMO_SITE_ID}`,
        pathname: `${BASE_PATH}${pathname}`,
        searchParams,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MATOMO_SITE_ID, MATOMO_URL, matomo, searchParams, pathname]);

  return null;
}
