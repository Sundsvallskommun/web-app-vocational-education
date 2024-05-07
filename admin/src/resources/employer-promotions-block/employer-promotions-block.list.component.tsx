import { List, Datagrid, TextField } from 'react-admin';

export const EmployerPromotionsBlockList = (props: any) => {
  return (
    <List {...props} exporter={false} hasCreate={false}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
