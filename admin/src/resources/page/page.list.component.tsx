import * as React from 'react';
import { List, Datagrid, TextField, useStore, useTranslate } from 'react-admin';
import { PageEdit } from './page.edit.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const PageList = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [, setValue] = useStore('activePageIdEdit', '');

  React.useEffect(() => {
    setValue('');
  }, []);

  return (
    <>
      <h1>{`${translate('resources.page.name', { smart_count: 2 })} `}</h1>
      <List {...props} actions={false} sort={{ field: 'url', order: 'ASC' }} exporter={false} hasCreate={false}>
        <Datagrid rowClick="edit" expand={PageEdit} bulkActionButtons={false}>
          <TextField source="url" />
          <TextField source="pageName" />
          <TextField source="title" />
        </Datagrid>
      </List>
    </>
  );
};
