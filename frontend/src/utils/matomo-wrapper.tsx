'use client';

import { useLocalStorageValue } from '@react-hookz/web';
import { trackAppRouter } from '@socialgouv/matomo-next';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, ReactNode, useEffect, useState } from 'react';

interface MatomoWrapperProps {
  children: ReactNode;
}

export function MatomoWrapper({ children }: MatomoWrapperProps) {
  const localstorageKey = 'matomoIsActive';
  const { value: matomo } = useLocalStorageValue(localstorageKey, {
    defaultValue: false,
    initializeWithValue: true,
  });
  const [haveInit, setHaveInit] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
  const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

  useEffect(() => {
    if (matomo && !haveInit) {
      // Track page view on route change
      trackAppRouter({
        url: `${MATOMO_URL}`,
        siteId: `${MATOMO_SITE_ID}`,
        pathname: `${BASE_PATH}${pathname}`,
        searchParams,
      });
      setHaveInit(true);
    }

    // If deactivate reload site (there is no de-init)
    if (haveInit && !matomo) {
      location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MATOMO_SITE_ID, MATOMO_URL, haveInit, matomo]);

  return <Fragment>{children}</Fragment>;
}
