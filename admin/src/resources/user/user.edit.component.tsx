import { Edit, SelectArrayInput, SimpleForm, TextInput, WithRecord, email, required, useTranslate } from 'react-admin';
import { UserRoleOnUser, UserRoles } from '../../interfaces/user';
import { hashPasswordField } from '../../utils/password';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { userRolesChoices } from './constants';
import PasswordField from './password-field.component';

export const UserEdit = (props: any) => {
  const { isAdmin, editedUserIsUser, isSuperAdmin } = useRoutePermissions();
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
        <WithRecord
          render={(data) => (
            <SelectArrayInput
              source="roles"
              format={(data) => data?.map((x: UserRoleOnUser) => x.role)}
              parse={(data: UserRoles[]) =>
                userRolesChoices.filter((roleChoice) => data.some((role) => role === roleChoice.role))
              }
              validate={required()}
              optionValue="role"
              optionText="role"
              readOnly={!isAdmin}
              choices={userRolesChoices}
            />
          )}
        />
        <PasswordField />
      </SimpleForm>
    </Edit>
  );
};
