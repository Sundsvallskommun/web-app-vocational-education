import { Create, SelectArrayInput, SimpleForm, TextInput, email, required, useTranslate } from 'react-admin';
import { UserRoleOnUser, UserRoles } from '../../interfaces/user';
import { hashPasswordField } from '../../utils/password';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { userRolesChoices } from './constants';
import PasswordField from './password-field.component';

export const UserCreate = (props: any) => {
  const { isAdmin } = useRoutePermissions();
  const translate = useTranslate();
  const validateEmail = email();
  return (
    <Create {...props} redirect={() => history.back()} transform={hashPasswordField}>
      <SimpleForm margin="none" toolbar={<CustomToolbar />} reValidateMode="onChange">
        <h1>{`${translate('ra.action.create')} ${translate('resources.user.name', { smart_count: 1 })}`}</h1>
        <TextInput source="username" required />
        <TextInput source="email" required validate={validateEmail} />
        <SelectArrayInput
          defaultValue={[]}
          source="roles"
          format={(data) => data?.map((x: UserRoleOnUser) => x.role)}
          parse={(data: UserRoles[]) =>
            userRolesChoices.filter((roleChoice) => data.some((role) => role === roleChoice.role))
          }
          validate={required()}
          optionValue="role"
          optionText="role"
          disabled={!isAdmin}
          choices={userRolesChoices}
        />
        <PasswordField />
      </SimpleForm>
    </Create>
  );
};
