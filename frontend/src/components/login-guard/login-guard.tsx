import LoaderFullScreen from '@components/loader/loader-fullscreen.component';
import { useUserStore } from '@services/user-service/user-service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const protectedRoutes = JSON.parse(process.env.NEXT_PUBLIC_PROTECTED_ROUTES as string);

export const LoginGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, setUser, getMe, reset: resetUser } = useUserStore();
  const router = useRouter();
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
  }, [router.pathname]);

  if (
    !mounted ||
    (protectedRoutes.some((path: string) => router.pathname.startsWith(path)) &&
      !user.username &&
      router.pathname !== '/login')
  ) {
    return <LoaderFullScreen />;
  }

  return <>{children}</>;
};

export default LoginGuard;
