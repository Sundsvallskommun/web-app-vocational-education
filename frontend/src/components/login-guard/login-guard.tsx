'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen.component';
import { useUserStore } from '@services/user-service/user-service';
import { protectedRoutes } from '@utils/protected-routes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LoginGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, setUser, getMe, reset: resetUser } = useUserStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getMe()
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      })
      .catch(() => {
        resetUser();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (
    !mounted ||
    (protectedRoutes.some((path: string) => pathname.startsWith(path)) && !user.username && pathname !== '/login')
  ) {
    return <LoaderFullScreen />;
  }

  return <>{children}</>;
};

export default LoginGuard;
