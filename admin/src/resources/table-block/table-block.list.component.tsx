import { Datagrid, List, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { ListCreateButton } from '../components/list-create-button.component';

export const TableBlockList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  return (
    <List {...props} exporter={false} hasCreate={canCreate} actions={<ListCreateButton />} empty={<ListCreateButton />}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
