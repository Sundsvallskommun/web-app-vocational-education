import { Datagrid, List, TextField, useGetIdentity } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ContactFormBlockEmailsList = (props: any) => {
  const { canCreate } = useRoutePermissions();

  return (
    <List {...props} exporter={false} hasCreate={canCreate}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="label" />
      </Datagrid>
    </List>
  );
};
