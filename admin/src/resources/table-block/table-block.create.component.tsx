import {
  BooleanInput,
  Create,
  Identifier,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TransformData,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

const transform: TransformData = (data) => {
  return {
    ...data,
    page: {
      connect: {
        id: data.page,
      },
    },
  };
};

export const TableBlockCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit');
  console.log('activePageIdEdit', activePageIdEdit);
  return (
    <Create
      {...props}
      resource="tableBlock"
      redirect={(resource: string, id?: Identifier) => `${resource}/${id}`}
      mutationMode="pessimistic"
      transform={transform}
    >
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.tableBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="page" reference="page">
          <SelectInput
            source="page"
            optionText="pageName"
            disabled
            value={parseInt(activePageIdEdit)}
            defaultValue={parseInt(activePageIdEdit)}
          />
        </ReferenceInput>
        <BooleanInput source="showBlock" />
      </SimpleForm>
    </Create>
  );
};
