import { useEffect } from 'react';
import {
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  useGetRecordId,
  useRedirect,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const LogosBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit', '');
  const [_, setValue] = useStore('activeBlockIdEdit', '');
  const recordId = useGetRecordId();
  const redirect = useRedirect();

  useEffect(() => {
    setValue(recordId.toString());
  }, [recordId]);

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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.logosBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <TextInput source="title" />
        <TextInput source="description" />
        {/* <EditLogosBlockLogos /> */}
      </SimpleForm>
    </Edit>
  );
};
