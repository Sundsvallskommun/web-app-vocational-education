'use client';

import { useAppContext } from '@contexts/app-context/use-app-context';
import { useUserStore } from '@services/user-service/user-service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Logout = () => {
  const { setDefaults } = useAppContext();
  const router = useRouter();
  const { reset: resetUser, logout: logoutUser } = useUserStore();

  const logout = () => {
    setDefaults();
    resetUser();
    localStorage.clear();
  };

  useEffect(() => {
    logout();
    logoutUser();
    router.push(`/`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
