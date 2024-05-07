import { List, Datagrid, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const PromotionsBlockPromotionsList = (props: any) => {
  useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={false}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="promotedPageName" />
      </Datagrid>
    </List>
  );
};
