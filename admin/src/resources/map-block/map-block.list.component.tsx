import { List, Datagrid, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const MapBlockList = (props: any) => {
  useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={false}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" label="Rubrik" />
      </Datagrid>
    </List>
  );
};
