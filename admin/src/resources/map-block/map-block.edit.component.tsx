import { BooleanInput, Edit, SimpleForm, TextInput, useRedirect, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const MapBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit');
  const redirect = useRedirect();
  return (
    <Edit {...props} redirect={false} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `page/${activePageIdEdit}`,
            }}
            backProps={{ onClick: () => redirect(`/page/${activePageIdEdit}`) }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.mapBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <TextInput source="text" />
      </SimpleForm>
    </Edit>
  );
};
