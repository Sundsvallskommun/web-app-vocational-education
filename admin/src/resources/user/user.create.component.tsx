import { Create, SelectInput, SimpleForm, TextInput, email, useTranslate } from 'react-admin';
import { hashPasswordField } from '../../utils/password';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { userRolesChoices } from './constants';
import PasswordField from './password-field.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const UserCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const validateEmail = email();
  return (
    <Create {...props} redirect={() => history.back()} transform={hashPasswordField}>
      <SimpleForm margin="none" toolbar={<CustomToolbar />} reValidateMode="onChange">
        <h1>{`${translate('ra.action.create')} ${translate('resources.user.name', { smart_count: 1 })}`}</h1>
        <TextInput source="username" required />
        <TextInput source="email" required validate={validateEmail} />
        <SelectInput
          source="role"
          choices={userRolesChoices}
          defaultValue="USER"
          optionValue="name"
          isRequired
          resettable
        />
        <PasswordField />
      </SimpleForm>
    </Create>
  );
};
