import { List, Datagrid, TextField, useRecordContext } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const LogosBlockList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  const context = useRecordContext();
  return (
    <List {...props} exporter={false} hasCreate={canCreate} filter={{ pageName: context.pageName }}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
