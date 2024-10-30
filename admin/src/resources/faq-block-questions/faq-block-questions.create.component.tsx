import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';
import { transformPageCreate } from '../../utils/data';

export const FAQBlockQuestionsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  return (
    <Create
      {...props}
      redirect={() => history.back()}
      mutationMode="pessimistic"
      transform={transformPageCreate({ pageId: parseInt(activePageIdEdit) })}
    >
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.faqBlockQuestions.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput
          source="faqBlock"
          reference="faqBlock"
          filter={{ id: parseInt(activeBlockIdEdit), pageId: parseInt(activePageIdEdit) }}
        >
          <SelectInput
            source="faqBlock"
            optionText="pageId"
            readOnly
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="question" />
        <Wysiwyg source="answer" />
      </SimpleForm>
    </Create>
  );
};
