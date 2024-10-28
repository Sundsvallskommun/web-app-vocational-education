import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {
  BooleanInput,
  Create,
  Identifier,
  SimpleForm,
  TextInput,
  useGetOne,
  useStore,
  useTranslate,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

const FormValues = () => {
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit');
  const { data: pageData } = useGetOne('page', { id: activePageIdEdit });

  const { setValue, watch } = useFormContext();

  useEffect(() => {
    setValue('pageName', pageData.pageName);
  }, [pageData.pageName]);

  return (
    <>
      <h1>{`${translate('ra.action.create')} ${translate('resources.tableBlock.name', {
        smart_count: 1,
      })}`}</h1>

      <Box display={'inline-flex'} flexDirection={'column'}>
        <TextInput sx={{ display: 'inline' }} value={watch('pageName')} name="pageName" source="pageName" disabled />
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
    </>
  );
};

export const TableBlockCreate = (props: any) => {
  useRoutePermissions();
  const [activePageIdEdit] = useStore('activePageIdEdit');

  return (
    <Create
      {...props}
      resource="tableBlock"
      redirect={(resource: string, id?: Identifier) => `${resource}/${id}`}
      mutationMode="pessimistic"
      transform={transformPageCreate({
        pageId: parseInt(activePageIdEdit),
        page: { connect: { id: parseInt(activePageIdEdit) } },
      })}
    >
      <SimpleForm margin="none">
        <FormValues />
      </SimpleForm>
    </Create>
  );
};
