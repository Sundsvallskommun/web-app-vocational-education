import { Edit, SimpleForm, TextInput, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';

export const FooterEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  return (
    <Edit {...props} redirect={false} mutationMode="pessimistic">
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete />}>
        <h1>{`${translate('ra.action.edit')} ${translate('resources.footer.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <h2>{`${translate('ra.action.edit')} ${translate('resources.footer.contactUsName', {
          smart_count: 1,
        }).toLowerCase()}`}</h2>
        <TextInput source="contactTitle" />
        <Wysiwyg source="contactText" />
      </SimpleForm>
    </Edit>
  );
};
