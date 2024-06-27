import {
  Create,
  DateInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ImportantDatesBlockDateCardsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Create {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.importantDatesBlockDateCards.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="importantDatesBlock" reference="importantDatesBlock">
          <SelectInput
            source="importantDatesBlock"
            optionText="pageName"
            readOnly
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <DateInput source="date" />
        <TextInput source="title" />
        <TextInput
          multiline
          inputProps={{
            sx: { width: '400px', minHeight: '3em' },
          }}
          source="text"
        />
        <TextInput source="url" />
      </SimpleForm>
    </Create>
  );
};
