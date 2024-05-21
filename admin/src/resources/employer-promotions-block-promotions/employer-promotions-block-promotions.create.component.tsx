import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const EmployerPromotionsBlockPromotionsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Create {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.employerPromotionsBlockPromotions.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="employerPromotionsBlock" reference="employerPromotionsBlock">
          <SelectInput
            source="employerPromotionsBlock"
            optionText="pageName"
            disabled
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="title" />
        <RichTextInput source="ingress" />
        <Wysiwyg />
        <TextInput source="searchPhrase" />
      </SimpleForm>
    </Create>
  );
};
