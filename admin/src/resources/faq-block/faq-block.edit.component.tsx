import { BooleanInput, Edit, SimpleForm, TextInput, useGetRecordId, useStore, useTranslate } from 'react-admin';
import { EditFAQBlockQuestions } from '../components/faq-block-questions.edit.component';
import { useEffect } from 'react';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const FAQBlockEdit = (props: any) => {
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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.faqBlock.name', { smart_count: 1 })}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <TextInput
          multiline
          inputProps={{
            sx: { width: '400px', minHeight: '3em' },
          }}
          source="description"
        />
        <EditFAQBlockQuestions />
      </SimpleForm>
    </Edit>
  );
};
