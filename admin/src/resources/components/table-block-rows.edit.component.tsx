import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { visuallyHidden } from '@mui/utils';
import { DeleteButton, Form, SaveButton, TextInput, useDataProvider, useTranslate } from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { TableBlock, TableBlockCell, TableBlockRow } from '../../interfaces/database-models';

interface TableBlockRowsProps {
  table: TableBlock;
  refetch: () => void;
  tableId?: number;
}

export const EditTableBlockRows = ({ table, refetch }: TableBlockRowsProps) => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();

  if (!table) return <></>;

  const onUpdate = async (fields: FieldValues, previousData: FieldValues) => {
    const updatePromises: Promise<any>[] = [];

    fields.rows.forEach((row: TableBlockRow, rowIndex: number) => {
      row.cells.forEach((cell: TableBlockCell, cellIndex: number) => {
        if (
          fields.rows[rowIndex].cells[cellIndex].wysiwyg_content !==
          previousData.rows[rowIndex].cells[cellIndex].wysiwyg_content
        ) {
          // Pushing the update promise into the array
          updatePromises.push(
            dataProvider.update('tableBlockCell', {
              id: cell.id,
              data: cell,
              previousData: previousData.rows[rowIndex].cells[cellIndex],
            })
          );
        }
      });
    });

    // Waiting for all update promises to resolve
    await Promise.all(updatePromises);

    // After all updates are done, call refetch
    refetch();
  };

  const onCreate = async (fields: FieldValues) => {
    await dataProvider.create('tableBlockRow', {
      data: {
        pageId: table.pageId,
        tableBlock: {
          connect: {
            id: table.id,
          },
        },
        cells: {
          create: fields.newCells.reverse().map((cell: TableBlockCell, cellIndex: number) => ({
            tableBlock: {
              connect: {
                id: table.id,
              },
            },
            tableBlockHeader: {
              connect: {
                id: table.headers[cellIndex].id,
              },
            },
            wysiwyg_content: cell.wysiwyg_content,
          })),
        },
      },
    });
    refetch();
  };

  return (
    <Container maxWidth={false}>
      <h2>{`${translate('resources.tableBlock.rowsHeading')}`}</h2>
      {table?.rows?.length ? (
        <Form warnWhenUnsavedChanges onSubmit={(data) => onUpdate(data, table)} resource="tableBlockRow" record={table}>
          <table>
            <thead>
              <tr>
                {table?.headers.map((header) => {
                  return (
                    <th style={{ textAlign: 'left' }} key={`${header.id}`}>
                      {header.name}
                    </th>
                  );
                })}
                <th style={visuallyHidden}>Knappar</th>
              </tr>
            </thead>
            <tbody>
              {table?.rows?.map((row, rowIndex) => {
                if (!row) return <></>;
                return (
                  <tr key={`${row.id}`}>
                    {row?.cells?.map((cell, cellIndex) => {
                      if (!cell) return <></>;
                      return (
                        <td style={{ textAlign: 'left' }} key={`${cell.id}`}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <TextInput
                              label="resources.tableBlock.fields.cell_label"
                              source={`rows.${rowIndex}.cells.${cellIndex}.wysiwyg_content`}
                              defaultValue={table?.rows[rowIndex].cells[cellIndex].wysiwyg_content}
                            />
                          </Box>
                        </td>
                      );
                    })}
                    <td>
                      <Box sx={{ mb: '1rem' }}>
                        <DeleteButton
                          record={row}
                          mutationMode="optimistic"
                          resource="tableBlockRow"
                          redirect={() => {
                            refetch();
                            return `tableBlock/${table.id}`;
                          }}
                          sx={{ whiteSpace: 'nowrap' }}
                        />
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <SaveButton type="submit" />
        </Form>
      ) : (
        <span>{`${translate('resources.tableBlock.missing_rows')}`}</span>
      )}

      <Box sx={{ mt: '3rem' }}>
        <h3>Ny rad</h3>
        <Form onSubmit={(data) => onCreate(data)}>
          <table>
            <thead>
              <tr>
                {table?.headers?.map((header) => {
                  return (
                    <th style={{ textAlign: 'left' }} key={`${header.id}`}>
                      {header.name}
                    </th>
                  );
                })}
                <th style={visuallyHidden}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {table?.headers?.map((header, i) => {
                  return (
                    <td style={{ textAlign: 'left', verticalAlign: 'bottom' }} key={`${header.id}`}>
                      <TextInput
                        source={`newCells.${i}.wysiwyg_content`}
                        label="resources.tableBlock.fields.cell_label"
                      />
                    </td>
                  );
                })}
                <td>
                  <Box sx={{ mb: '1rem' }}>
                    <SaveButton label="ra.action.add" type="submit" />
                  </Box>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Box>
    </Container>
  );
};
