import {
  DateInput,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useStore,
  useTranslate,
} from 'react-admin';
import { CustomToolbar } from '../components/custom-toolbar.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ImportantDatesBlockDateCardsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `faqBlock/${activeBlockIdEdit}`,
            }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.importantDatesBlockDateCards.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <ReferenceInput source="importantDatesBlock" reference="importantDatesBlock">
          <SelectInput
            source="importantDatesBlock"
            optionText="pageName"
            disabled
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="title" />
        <DateInput source="date" />
        <TextInput
          multiline
          inputProps={{
            sx: { width: '400px', minHeight: '3em' },
          }}
          source="text"
        />
        <TextInput source="url" />
      </SimpleForm>
    </Edit>
  );
};
