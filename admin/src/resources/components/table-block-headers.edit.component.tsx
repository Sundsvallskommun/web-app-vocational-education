import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DeleteButton, Form, SaveButton, TextInput, useDataProvider, useTranslate } from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { TableBlock, TableBlockHeader } from '../../interfaces/database-models';

interface TableBlockHeadersProps {
  table: TableBlock;
  refetch: () => void;
}

export const EditTableBlockHeaders = ({ table, refetch }: TableBlockHeadersProps) => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();

  if (!table) return <></>;

  const onUpdate = async (data: FieldValues, previousData: TableBlockHeader) => {
    await dataProvider.update('tableBlockHeader', { id: data.id, data: data, previousData: previousData });
    refetch();
  };

  const onCreate = async (data: FieldValues) => {
    await dataProvider.create('tableBlockHeader', {
      data: {
        name: data.name,
        tableBlock: {
          connect: {
            id: table.id,
          },
        },
        cells: {
          create: table?.rows.map((row) => ({
            tableBlock: {
              connect: {
                id: table.id,
              },
            },
            tableBlockRow: {
              connect: {
                id: row.id,
              },
            },
            wysiwyg_content: '',
          })),
        },
      },
    });
    refetch();
  };

  return (
    <Container maxWidth={false}>
      <h2>{`${translate('resources.tableBlock.headersHeading')}`}</h2>
      {table?.headers?.map((header, i: number) => (
        <Form
          warnWhenUnsavedChanges
          onSubmit={(data) => onUpdate(data, header)}
          key={`${header.id}`}
          resource="tableBlockHeader"
          record={table.headers[i]}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <TextInput label="resources.tableBlock.fields.header_label" source={'name'} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem', marginLeft: '1rem', gap: '1rem' }}>
              <SaveButton label="resources.tableBlock.fields.save" type="submit" />
              <DeleteButton
                record={header}
                mutationMode="optimistic"
                resource="tableBlockHeader"
                redirect={() => {
                  refetch();
                  return `tableBlock/${table.id}`;
                }}
                sx={{ whiteSpace: 'nowrap' }}
              />
            </Box>
          </Box>
        </Form>
      ))}
      <h3>{translate('resources.tableBlock.new_header')}</h3>
      <Form onSubmit={(data) => onCreate(data)}>
        <TextInput source={'name'} label="resources.tableBlock.fields.header_label" />
        <SaveButton
          sx={{
            marginTop: '1rem',
            marginLeft: '1rem',
          }}
          type="submit"
        />
      </Form>
    </Container>
  );
};
