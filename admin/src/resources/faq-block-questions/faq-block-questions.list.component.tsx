import { Datagrid, List, TextField, useGetIdentity } from 'react-admin';
import { hasRoles } from '../../utils/has-roles';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const FAQBlockQuestionsList = (props: any) => {
  const { canCreate } = useRoutePermissions();
  const { data: user } = useGetIdentity();

  return (
    <List {...props} exporter={false} hasCreate={canCreate || hasRoles(user, ['EDITOR', 'EDUCATIONCOORDINATOR'])}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="question" />
      </Datagrid>
    </List>
  );
};
