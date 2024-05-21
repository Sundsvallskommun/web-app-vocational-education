import { CreateButton, useGetIdentity } from 'react-admin';

interface ListCreateButtonProps {
  show?: boolean;
}

export const ListCreateButton = ({ show = true }: ListCreateButtonProps) => {
  const { data } = useGetIdentity();
  return <>{(data?.username === 'admin' || show) && <CreateButton />}</>;
};
