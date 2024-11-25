import { CreateButton, useGetIdentity, useRecordContext, useResourceContext, useTranslate } from 'react-admin';

interface ListCreateButtonProps {
  show?: boolean;
}

export const ListCreateButton = ({ show = true }: ListCreateButtonProps) => {
  const { data } = useGetIdentity();
  const resource = useResourceContext();
  const t = useTranslate();
  const resourceString = t(`resources.${resource}.name`, { smart_count: 1 });

  return (
    <>{(data?.username === 'admin' || show) && <CreateButton label={`${t('ra.action.create')} ${resourceString}`} />}</>
  );
};
