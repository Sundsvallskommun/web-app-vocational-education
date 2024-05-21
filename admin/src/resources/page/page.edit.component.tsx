import { Edit, SimpleForm, TextInput, WithRecord, required, useGetRecordId, useStore, useTranslate } from 'react-admin';
import { PageSwitch } from '../components/PageSwitch.component';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { useEffect } from 'react';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const PageEdit = (props: any) => {
  const { isSuperAdmin } = useRoutePermissions();
  const translate = useTranslate();
  const [, setValue] = useStore('activePageIdEdit', '');
  const recordId = useGetRecordId();

  useEffect(() => {
    setValue(recordId.toString());
  }, [recordId]);

  return (
    <Edit {...props} redirect={false} mutationMode="pessimistic">
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete={!isSuperAdmin} />} sx={{ maxWidth: '600px' }}>
        <h1>
          {`${translate('ra.action.edit')} `}
          <WithRecord label="pageName" render={(record) => <span>{record.url}</span>} />
        </h1>
        <TextInput source="url" validate={[required()]} disabled />
        <TextInput source="pageName" validate={[required()]} disabled />
        <TextInput
          source="title"
          validate={[required()]}
          multiline
          inputProps={{
            sx: { width: '222px', fontFamily: 'Montserrat', letterSpacing: '-0.0111em' },
          }}
        />
        <TextInput
          source="description"
          validate={[required()]}
          multiline
          sx={{ hyphens: 'auto' }}
          inputProps={{
            sx: { width: '576px', fontFamily: 'Montserrat', minHeight: '3em' },
          }}
        />

        {/* Switches by pageName */}
        <PageSwitch />
      </SimpleForm>
    </Edit>
  );
};
