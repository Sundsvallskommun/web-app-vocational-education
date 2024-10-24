import { useEffect, useState } from 'react';
import { CreateButton, useGetIdentity, useRecordContext, useResourceContext } from 'react-admin';

interface ListCreateButtonProps {
  show?: boolean;
}

export const ListCreateButton = ({ show = true }: ListCreateButtonProps) => {
  const { data } = useGetIdentity();
  const record = useRecordContext();
  const resource = useResourceContext();
  const [to, setTo] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (resource === 'tableBlock') {
      setTo(`/tableBlock/create/page/${record.id}`);
    }
  }, [record.id, resource]);

  return <>{(data?.username === 'admin' || show) && <CreateButton to={to} />}</>;
};
