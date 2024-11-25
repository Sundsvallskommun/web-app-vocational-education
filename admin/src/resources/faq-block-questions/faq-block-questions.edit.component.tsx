import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, WithRecord, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';

export const FAQBlockQuestionsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();

  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <WithRecord
        render={(data) => (
          <SimpleForm
            margin="none"
            toolbar={
              <CustomToolbar
                deleteProps={{
                  redirect: () => `faqBlock/${data.blockId}`,
                }}
              />
            }
          >
            <h1>{`${translate('ra.action.edit')} ${translate('resources.faqBlockQuestions.name', {
              smart_count: 1,
            })}`}</h1>
            <ReferenceInput source="faqBlock" reference="faqBlock" filter={{ id: data.blockId, pageId: data.pageId }}>
              <SelectInput
                source="faqBlock"
                optionText="pageName"
                readOnly
                value={data.blockId}
                defaultValue={data.blockId}
              />
            </ReferenceInput>
            <TextInput source="question" />
            <Wysiwyg source="answer" />
          </SimpleForm>
        )}
      />
    </Edit>
  );
};
