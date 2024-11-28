import * as React from 'react';
import { BooleanInput, Edit, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const MapBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `page/${activePageIdEdit}`,
            }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.mapBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <TextInput source="text" />
      </SimpleForm>
    </Edit>
  );
};
