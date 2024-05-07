import * as React from 'react';
import { BooleanInput, Edit, SimpleForm, TextInput, useTranslate } from 'react-admin';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const MapBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete />}>
        <h1>{`${translate('ra.action.edit')} ${translate('resources.mapBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" disabled />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <TextInput source="text" />
        <TextInput source="buttonText" />
      </SimpleForm>
    </Edit>
  );
};
