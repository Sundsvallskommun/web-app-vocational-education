import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@contexts/app.context';
import { useUserStore } from '@services/user-service/user-service';

export default function Logout() {
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
}
