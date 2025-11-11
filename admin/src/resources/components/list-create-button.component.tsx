import { CreateButton, useResourceContext, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ListCreateButton = () => {
  const { canCreate } = useRoutePermissions();
  const resource = useResourceContext();
  const t = useTranslate();
  const resourceString = t(`resources.${resource}.name`, { smart_count: 1 });

  return <>{canCreate && <CreateButton label={`${t('ra.action.create')} ${resourceString}`} />}</>;
};
