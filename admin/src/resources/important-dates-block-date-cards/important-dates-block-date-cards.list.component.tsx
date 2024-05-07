import { List, Datagrid, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ImportantDatesBlockDateCardsList = (props: any) => {
  useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={true}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
