import { BooleanInput, Edit, SimpleForm, TextInput, useGetRecordId, useStore, useTranslate } from 'react-admin';
import { EditImportantDatesBlockDateCards } from '../components/important-dates-block-date-cards.edit.component';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { useEffect } from 'react';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ImportantDatesBlockEdit = (props: any) => {
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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.importantDatesBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" disabled />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <EditImportantDatesBlockDateCards />
      </SimpleForm>
    </Edit>
  );
};
