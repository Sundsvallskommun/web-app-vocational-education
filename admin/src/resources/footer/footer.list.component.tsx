import { List, Datagrid, TextField } from 'react-admin';

export const FooterList = (props: any) => {
  return (
    <List {...props} exporter={false} hasCreate={false}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="contactTitle" label="Rubrik" />
      </Datagrid>
    </List>
  );
};
