import {
  BooleanInput,
  Create,
  Identifier,
  ReferenceManyField,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  WithRecord,
  required,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { UserRoleOnUser, UserRoles } from '../../interfaces/user';
import { userRolesChoices } from '../user/constants';
import { GalleryInput } from '../components/gallery/gallery-input.component';
import { WithFormContext } from '../components/with-form-context/with-form-context.component';
import { useEffect, useState } from 'react';
import { urlToPageName } from '../../utils/data';

export const PageCreate = (props: any) => {
  const { isAdmin, canCreate, isSuperAdmin } = useRoutePermissions();
  const translate = useTranslate();

  return (
    <Create {...props} mutationMode="pessimistic" redirect={(resource: string, id?: Identifier) => `${resource}/${id}`}>
      <SimpleForm margin="none" toolbar={<CustomToolbar hideDelete={!canCreate} />} sx={{ maxWidth: '600px' }}>
        <h1>{`${translate('ra.action.create')} ${translate('resources.page.name', 1).toLowerCase()}`}</h1>
        <TextInput source="url" validate={[required()]} />
        <WithFormContext>
          {({ watch, setValue }) => {
            const url = watch('url');
            const [mounted, setMounted] = useState(false);

            useEffect(() => {
              const pageName = urlToPageName(url);
              if (isSuperAdmin && mounted) {
                setValue('pageName', pageName);
              }
              if (!isSuperAdmin) {
                setValue('pageName', pageName);
              }
            }, [url]);

            useEffect(() => {
              setMounted(true);
            }, []);

            return (
              <TextInput
                type={isSuperAdmin ? 'text' : 'hidden'}
                hidden={!isSuperAdmin}
                style={!isSuperAdmin ? { display: 'none' } : undefined}
                source="pageName"
                validate={[required()]}
              />
            );
          }}
        </WithFormContext>
        <TextInput
          source="title"
          multiline
          inputProps={{
            sx: { width: '222px', fontFamily: 'Montserrat', letterSpacing: '-0.0111em' },
          }}
        />
        <TextInput
          source="description"
          multiline
          sx={{ hyphens: 'auto' }}
          inputProps={{
            sx: { width: '576px', fontFamily: 'Montserrat', minHeight: '3em' },
          }}
        />
        <GalleryInput />
        <WithFormContext>
          {({ watch }) => {
            if (watch('imgSrc')) {
              return (
                <>
                  <BooleanInput source="showImgInDesktop" defaultValue={true} />
                  <BooleanInput source="showImgInMobile" defaultValue={true} />
                </>
              );
            }
          }}
        </WithFormContext>

        <BooleanInput source="showSearchBar" />

        <WithRecord
          label="editRoles"
          render={(record) => (
            <ReferenceManyField
              source="editRoles"
              record={record.editRoles}
              reference="editRolesOnPage"
              target="editRoles"
            >
              <SelectArrayInput
                defaultValue={[]}
                source="editRoles"
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
            </ReferenceManyField>
          )}
        />
      </SimpleForm>
    </Create>
  );
};
