import { List, Datagrid, TextField, DateField } from 'react-admin';

export const ImportantDatesBlockList = (props: any) => {
  return (
    <List {...props} exporter={false} hasCreate={false}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
