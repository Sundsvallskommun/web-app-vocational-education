import { TableBlock as TableBlockType } from '@interfaces/admin-data';
import { Link, Table, cx, SortMode } from '@sk-web-gui/react';
import { useState } from 'react';

export const TableBlock = ({ tableBlock }: { tableBlock?: TableBlockType }) => {
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState(SortMode.ASC);

  const handleSorting = (column: number) => {
    if (sortColumn !== column) {
      setSortColumn(column);
    } else {
      setSortOrder(sortOrder === SortMode.ASC ? SortMode.DESC : SortMode.ASC);
    }
  };

  if (!tableBlock || tableBlock.showBlock === false) return <></>;

  return (
    <div className="mb-[20rem]">
      <div className="table-education-managers-contact">
        <Table>
          {tableBlock.title && (
            <caption className="sr-only">
              {tableBlock.title}
              {tableBlock.summary && (
                <>
                  <br />
                  <small>{tableBlock.summary}</small>
                </>
              )}
            </caption>
          )}
          <Table.Header>
            {tableBlock.headers?.map((header, i) => (
              <Table.HeaderColumn key={`${header.name}-${i}`}>
                <Table.SortButton isActive={sortColumn === i} sortOrder={sortOrder} onClick={() => handleSorting(i)}>
                  {header.name}
                </Table.SortButton>
              </Table.HeaderColumn>
            ))}
          </Table.Header>
          <Table.Body>
            {tableBlock.rows
              ?.sort((a, b) => {
                const order = sortOrder === SortMode.ASC ? -1 : 1;
                return (
                  a.cells[sortColumn].wysiwyg_content < b.cells[sortColumn].wysiwyg_content ? order
                  : a.cells[sortColumn].wysiwyg_content > b.cells[sortColumn].wysiwyg_content ? order * -1
                  : 0
                );
              })
              .map((row, rowIndex) => {
                if (!row) return <></>;
                return (
                  <Table.Row key={`${row.id}`} className="text-label">
                    {row?.cells?.map((cell, cellIndex) => {
                      // is email
                      if (cell.wysiwyg_content.match(/^\S+@\S+$/)) {
                        return (
                          <Table.Column key={`${cell.id}`}>
                            <span>
                              <Link className="text-label hover:text-label" href={`mailto:${cell.wysiwyg_content}`}>
                                {cell.wysiwyg_content}
                              </Link>
                            </span>
                          </Table.Column>
                        );
                      } else {
                        return (
                          <Table.Column key={`${cell.id}`}>
                            <span className={cx(cellIndex === 0 && 'font-bold')}>
                              {tableBlock.rows[rowIndex].cells[cellIndex].wysiwyg_content}
                            </span>
                          </Table.Column>
                        );
                      }
                    })}
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default TableBlock;
