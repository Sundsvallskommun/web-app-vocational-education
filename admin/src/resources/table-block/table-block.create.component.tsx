import {
  BooleanInput,
  Create,
  Identifier,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  TransformData,
  WithRecord,
  useCreateContext,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const transform: (pageId: number) => TransformData = (pageId) => (data) => {
  return {
    ...data,
    pageId: pageId,
    page: {
      connect: {
        id: pageId,
      },
    },
  };
};

export const TableBlockCreate = (props: any) => {
  const params = useParams();
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit');

  if (!params.pageId) return <></>;

  return (
    <Create
      {...props}
      resource="tableBlock"
      redirect={(resource: string, id?: Identifier) => `${resource}/${id}`}
      mutationMode="pessimistic"
      transform={transform(parseInt(params.pageId))}
    >
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.tableBlock.name', {
          smart_count: 1,
        })}`}</h1>
        <WithRecord
          render={(data) => (
            <ReferenceInput source="page" reference="page" filter={{ pageName: data.pageName }}>
              <SelectInput
                source="page"
                optionText="pageName"
                disabled
                value={parseInt(activePageIdEdit)}
                defaultValue={parseInt(activePageIdEdit)}
              />
            </ReferenceInput>
          )}
        />
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
