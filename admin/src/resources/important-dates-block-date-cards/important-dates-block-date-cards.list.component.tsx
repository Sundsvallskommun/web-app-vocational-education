import { List, Datagrid, TextField, useGetIdentity, DateField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { hasRoles } from '../../utils/has-roles';

export const ImportantDatesBlockDateCardsList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  const { data: user } = useGetIdentity();

  return (
    <List
      {...props}
      exporter={false}
      hasCreate={canCreate || hasRoles(user, ['EDITOR', 'EDUCATIONCOORDINATOR'])}
      sort={{ field: 'date', order: 'ASC' }}
    >
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <DateField source="date" />
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
