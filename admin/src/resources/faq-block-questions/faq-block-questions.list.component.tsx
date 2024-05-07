import { List, Datagrid, TextField } from 'react-admin';

export const FAQBlockQuestionsList = (props: any) => {
  return (
    <List {...props} exporter={false} hasCreate={true}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="question" />
      </Datagrid>
    </List>
  );
};
