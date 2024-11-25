import { useEffect, useState } from 'react';
import { useGetIdentity, useGetRecordId } from 'react-admin';
import { useLocation, useNavigate } from 'react-router';

export default function useRoutePermissions() {
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const { data: user } = useGetIdentity();
  const navigate = useNavigate();
  let recordId;

  try {
    recordId = useGetRecordId();
  } catch (err) {}

  // exports
  const isAdmin = user?.roles.includes('ADMIN');
  const isSuperAdmin = user?.username === 'admin' && isAdmin;
  const editedUserIsUser = user?.id == parseInt(recordId as string);

  let canCreate = isAdmin;

  useEffect(() => {
    if (mounted) {
      const hasRouteAccess = (route: string) => {
        if (route.includes('user')) {
          if (isAdmin || editedUserIsUser) {
            return true;
          } else {
            return false;
          }
        }
        if (route.includes('page/create')) {
          if (isSuperAdmin) {
            return true;
          } else {
            return false;
          }
        }

        if (route.includes('/create')) isAdmin;
        return true;
      };
      if (!hasRouteAccess(pathname)) {
        navigate('/page');
      }
    } else {
      setMounted(true);
    }
  }, [mounted, pathname, user]);

  return { isSuperAdmin, isAdmin, editedUserIsUser, canCreate };
}
