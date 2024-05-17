import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';

export const FAQBlockQuestionsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `faqBlock/${activeBlockIdEdit}`,
            }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.faqBlockQuestions.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="faqBlock" reference="faqBlock">
          <SelectInput
            source="faqBlock"
            optionText="pageName"
            disabled
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="question" />
        <Wysiwyg source="answer" />
      </SimpleForm>
    </Edit>
  );
};
