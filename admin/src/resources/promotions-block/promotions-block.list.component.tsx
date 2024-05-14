import { List, Datagrid, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const PromotionsBlockList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={canCreate}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="pageName" />
      </Datagrid>
    </List>
  );
};
