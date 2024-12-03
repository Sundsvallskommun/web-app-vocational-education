import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useGetOne,
  useStore,
  useTranslate,
} from 'react-admin';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const ImportantDatesBlockCreate = (props: any) => {
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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.importantDatesBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <BooleanInput source="showBlock" defaultValue={true} />
        <BooleanInput source="showAll" defaultValue={false} />
        <BooleanInput source="showSeeAllButton" defaultValue={true} />
        <NumberInput source="amountShown" defaultValue={3} />
        <TextInput source="title" />
      </SimpleForm>
    </Create>
  );
};
