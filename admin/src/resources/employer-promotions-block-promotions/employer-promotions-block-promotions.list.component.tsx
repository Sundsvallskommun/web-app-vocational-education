import { List, Datagrid, TextField } from 'react-admin';

export const EmployerPromotionsBlockPromotionsList = (props: any) => {
  return (
    <List {...props} exporter={false} hasCreate={true}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
