import {
  DateInput,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  WithRecord,
  required,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const ImportantDatesBlockDateCardsEdit = (props: any) => {
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
                  redirect: () => `importantDatesBlock/${data.blockId}`,
                }}
              />
            }
          >
            <h1>{`${translate('ra.action.edit')} ${translate('resources.importantDatesBlockDateCards.name', {
              smart_count: 1,
            }).toLowerCase()}`}</h1>
            <ReferenceInput
              source="importantDatesBlock"
              reference="importantDatesBlock"
              filter={{ id: data.blockId, pageId: data.pageId }}
            >
              <SelectInput
                source="importantDatesBlock"
                optionText="pageName"
                readOnly
                value={data.blockId}
                defaultValue={data.blockId}
              />
            </ReferenceInput>
            <TextInput source="title" validate={[required()]} />
            <DateInput source="date" validate={[required()]} />
            <TextInput
              multiline
              inputProps={{
                sx: { width: '400px', minHeight: '3em' },
              }}
              source="text"
            />
          </SimpleForm>
        )}
      />
    </Edit>
  );
};
