import { BooleanInput, Create, SimpleForm, TextInput, useGetOne, useStore, useTranslate } from 'react-admin';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';

export const LogosBlockCreate = (props: any) => {
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
        <h1>{`${translate('ra.action.edit')} ${translate('resources.logosBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <BooleanInput source="showBlock" defaultValue={true} />
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};
