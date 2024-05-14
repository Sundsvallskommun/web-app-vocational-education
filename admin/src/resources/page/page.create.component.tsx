import { Create, Identifier, SimpleForm, TextInput, required, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const PageCreate = (props: any) => {
  const { isSuperAdmin } = useRoutePermissions();
  const translate = useTranslate();

  return (
    <Create {...props} mutationMode="pessimistic" redirect={(resource: string, id?: Identifier) => `${resource}/${id}`}>
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete={!isSuperAdmin} />} sx={{ maxWidth: '600px' }}>
        <h1>{`${translate('ra.action.create')} ${translate('resources.page.name', 1).toLowerCase()}`}</h1>
        <TextInput source="url" validate={[required()]} />
        <TextInput source="pageName" validate={[required()]} />
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
      </SimpleForm>
    </Create>
  );
};