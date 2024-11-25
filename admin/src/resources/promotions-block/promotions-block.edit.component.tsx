import { BooleanInput, Edit, SimpleForm, TextInput, useGetRecordId, useStore, useTranslate } from 'react-admin';
import { EditPromotionsBlockPromotions } from '../components/promotions-block-promotions.edit.component';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { useEffect } from 'react';

export const PromotionsBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit, setValue] = useStore('activeBlockIdEdit', '');
  const recordId = useGetRecordId();
  useEffect(() => {
    setValue(recordId.toString());
  }, [recordId]);
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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.promotionsBlock.name', {
          smart_count: 2,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <EditPromotionsBlockPromotions />
      </SimpleForm>
    </Edit>
  );
};
