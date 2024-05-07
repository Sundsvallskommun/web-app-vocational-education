import { useEffect, useState } from 'react';
import { useGetIdentity, useGetRecordId, useResourceContext } from 'react-admin';
import { useNavigate } from 'react-router';

export default function useRoutePermissions() {
  const [mounted, setMounted] = useState(false);
  const resourceContext = useResourceContext();
  const { data: user } = useGetIdentity();
  const navigate = useNavigate();
  let recordId;

  try {
    recordId = useGetRecordId();
  } catch (err) {}

  // exports
  const isAdmin = user?.role === 'ADMIN';
  const editedUserIsUser = user?.id == parseInt(recordId as string);

  useEffect(() => {
    if (mounted) {
      const hasRouteAccess = (route: string) => {
        switch (route) {
          case 'user':
            if (isAdmin || editedUserIsUser) {
              return true;
            } else {
              return false;
            }
          default:
            return true;
        }
      };
      if (!hasRouteAccess(resourceContext)) {
        navigate('/page');
      }
    } else {
      setMounted(true);
    }
  }, [mounted, resourceContext, user]);

  return { isAdmin, editedUserIsUser };
}
