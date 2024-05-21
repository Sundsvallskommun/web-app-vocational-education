import { BooleanInput, Edit, SimpleForm, TextInput, useGetRecordId, useStore, useTranslate } from 'react-admin';
import { useEffect } from 'react';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { EditEmployerPromotionsBlockPromotions } from '../components/employer-promotions-block-promotions.edit.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const EmployerPromotionsBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [, setValue] = useStore('activeBlockIdEdit', '');
  const recordId = useGetRecordId();
  useEffect(() => {
    setValue(recordId.toString());
  }, [recordId]);
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete />}>
        <h1>{`${translate('ra.action.edit')} ${translate('resources.employerPromotionsBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <TextInput source="pageName" disabled />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <EditEmployerPromotionsBlockPromotions />
      </SimpleForm>
    </Edit>
  );
};
