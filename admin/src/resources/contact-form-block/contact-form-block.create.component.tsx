import {
  BooleanInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetOne,
  useStore,
  useTranslate,
} from 'react-admin';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const ContactFormBlockCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit');
  const { data: pageData } = useGetOne('page', { id: activePageIdEdit });
  return (
    <Create
      {...props}
      mutationMode="pessimistic"
      transform={transformPageCreate({ pageId: parseInt(activePageIdEdit), page: { connect: { id: pageData?.id } } })}
    >
      <SimpleForm margin="none" toolbar={<CustomToolbar />}>
        <h1>{`${translate('ra.action.create')} ${translate('resources.contactFormBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="page" reference="page">
          <SelectInput source="page" optionText="id" readOnly value={pageData?.id} defaultValue={pageData?.id} />
        </ReferenceInput>
        <BooleanInput source="showBlock" defaultValue={true} />
        <TextInput source="title" />
        <TextInput
          multiline
          inputProps={{
            sx: { width: '400px', minHeight: '3em' },
          }}
          source="description"
        />
      </SimpleForm>
    </Create>
  );
};
