import { Datagrid, List, TextField } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { UserEdit } from './user.edit.component';
import { CustomListActions } from '../components/ListActionsToolbar.component';

export const UserList = (props: any) => {
  useRoutePermissions();
  return (
    <List actions={<CustomListActions />} {...props}>
      <Datagrid rowClick="edit" expand={UserEdit}>
        <TextField source="username" />
      </Datagrid>
    </List>
  );
};
