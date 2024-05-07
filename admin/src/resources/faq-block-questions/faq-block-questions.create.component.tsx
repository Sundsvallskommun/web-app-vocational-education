import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const FAQBlockQuestionsCreate = (props: any) => {
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Create {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.faqBlockQuestions.name', {
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
        <RichTextInput source="answer" />
      </SimpleForm>
    </Create>
  );
};
