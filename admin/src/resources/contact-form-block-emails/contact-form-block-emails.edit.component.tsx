import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, WithRecord, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const ContactFormBlockEmailsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();

  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <WithRecord
        render={(data) => (
          <SimpleForm
            margin="none"
            toolbar={
              <CustomToolbar
                deleteProps={{
                  redirect: () => `contactFormBlock/${data.blockId}`,
                }}
              />
            }
          >
            <h1>{`${translate('ra.action.edit')} ${translate('resources.contactFormBlockEmails.name', {
              smart_count: 1,
            })}`}</h1>
            <ReferenceInput
              source="contactFormBlock"
              reference="contactFormBlock"
              filter={{ id: data.blockId, pageId: data.pageId }}
            >
              <SelectInput
                source="contactFormBlock"
                optionText="pageName"
                readOnly
                value={data.blockId}
                defaultValue={data.blockId}
              />
            </ReferenceInput>
            <TextInput source="label" />
            <TextInput source="email" />
          </SimpleForm>
        )}
      />
    </Edit>
  );
};
