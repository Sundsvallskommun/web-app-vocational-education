import * as React from 'react';
import { Edit, SelectInput, SimpleForm, TextInput, useGetList, useTranslate } from 'react-admin';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const PromotionsBlockPromotionsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const { data } = useGetList('page');
  const choices = data ? data.map((x) => ({ id: x.pageName, name: x.pageName })) : [];
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete />}>
        <h1>{`${translate('ra.action.edit')} ${translate('resources.promotionsBlockPromotions.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" disabled />
        <SelectInput source="promotedPageName" choices={choices} />
      </SimpleForm>
    </Edit>
  );
};
