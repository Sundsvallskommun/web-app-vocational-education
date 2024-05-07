import { Edit, SelectInput, SimpleForm, TextInput, email, useTranslate } from 'react-admin';
import { hashPasswordField } from '../../utils/password';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { userRolesChoices } from './constants';
import PasswordField from './password-field.component';

export const UserEdit = (props: any) => {
  const { isAdmin, editedUserIsUser } = useRoutePermissions();
  const translate = useTranslate();
  const validateEmail = email();

  return (
    <Edit {...props} redirect={() => history.back()} transform={hashPasswordField} mutationOptions={{}}>
      <SimpleForm
        margin="none"
        toolbar={<CustomToolbar hideDelete={!isAdmin || (isAdmin && editedUserIsUser)} />}
        reValidateMode="onChange"
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.user.name', { smart_count: 1 })}`}</h1>
        <TextInput source="username" required />
        <TextInput source="email" required validate={validateEmail} />
        <SelectInput
          source="role"
          disabled={!isAdmin || (isAdmin && editedUserIsUser)}
          choices={userRolesChoices}
          optionValue="name"
        />
        <PasswordField />
      </SimpleForm>
    </Edit>
  );
};
