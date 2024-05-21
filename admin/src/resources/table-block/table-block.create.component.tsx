import {
  BooleanInput,
  Create,
  Identifier,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  TransformData,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import Box from '@mui/material/Box';

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
        <Box display={'inline-flex'} flexDirection={'column'}>
          <TextInput sx={{ display: 'inline' }} source="pageName" disabled />
          <TextInput
            source="title"
            multiline
            inputProps={{
              sx: { width: '222px' },
            }}
          />
          <TextInput
            source="summary"
            multiline
            sx={{ hyphens: 'auto' }}
            inputProps={{
              sx: { width: '576px' },
            }}
          />
        </Box>
        <BooleanInput source="showBlock" />
      </SimpleForm>
    </Create>
  );
};
