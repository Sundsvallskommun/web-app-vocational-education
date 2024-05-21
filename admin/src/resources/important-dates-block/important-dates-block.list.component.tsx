import { List, Datagrid, TextField, DateField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ImportantDatesBlockList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={canCreate}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
