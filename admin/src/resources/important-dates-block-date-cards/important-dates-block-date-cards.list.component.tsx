import { List, Datagrid, TextField, useGetIdentity } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { hasRoles } from '../../utils/has-roles';

export const ImportantDatesBlockDateCardsList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  const { data: user } = useGetIdentity();

  return (
    <List {...props} exporter={false} hasCreate={canCreate || hasRoles(user, ['EDITOR', 'EDUCATIONCOORDINATOR'])}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
