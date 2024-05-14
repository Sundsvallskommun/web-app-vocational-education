import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  BooleanInput,
  Button,
  DeleteButton,
  Form,
  SaveButton,
  TextInput,
  useDataProvider,
  useGetOne,
  useTranslate,
} from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TableBlock } from '../../interfaces/database-models';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { EditTableBlockHeaders } from '../components/table-block-headers.edit.component';
import { EditTableBlockRows } from '../components/table-block-rows.edit.component';

const transform = (data: FieldValues) => {
  if (data.headers) {
    delete data.headers;
  }
  if (data.rows) {
    delete data.rows;
  }
  if (data.cells) {
    delete data.cells;
  }
  return data;
};

export const TableBlockEdit = () => {
  const { isSuperAdmin } = useRoutePermissions();
  const translate = useTranslate();
  const { tableId: paramsTableId } = useParams();
  const tableId = paramsTableId ? parseInt(paramsTableId) : null;
  const dataProvider = useDataProvider();

  if (!tableId) return <></>;

  const { data: table, refetch } = useGetOne<TableBlock>('tableBlock', { id: tableId });

  if (!table) return <></>;

  const onUpdate = async (data: FieldValues, previousData: TableBlock) => {
    await dataProvider.update('tableBlock', { id: table.id, data: transform(data), previousData: previousData });
    refetch();
  };

  return (
    <>
      <Container maxWidth={false}>
        <Form onSubmit={(data) => onUpdate(data, table)} resource="tableBlock" record={table}>
          <h1>{`${translate('ra.action.edit')} ${translate('resources.tableBlock.name', {
            smart_count: 1,
          }).toLowerCase()}`}</h1>
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
          <SaveButton />
          {isSuperAdmin && (
            <DeleteButton
              record={table}
              mutationMode="optimistic"
              resource="tableBlock"
              redirect={`/page/${table.pageId}`}
              sx={{ whiteSpace: 'nowrap' }}
            />
          )}
        </Form>
      </Container>

      <Box sx={{ mt: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', mb: '5rem' }}>
        <EditTableBlockHeaders table={table} refetch={refetch} />
        <EditTableBlockRows table={table} refetch={refetch} />
      </Box>
      <Button onClick={() => history.back()} label={`${translate('ra.action.back')}`} />
    </>
  );
};
