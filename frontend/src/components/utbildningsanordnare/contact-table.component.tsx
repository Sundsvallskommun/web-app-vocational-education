import LoadMoreBlock from '@components/block/load-more-block.component';
import { TableBlock } from '@interfaces/admin-data';
import { Link, Table, cx } from '@sk-web-gui/react';
import { useState } from 'react';

interface EducationManagerContactTableProps {
  tableBlock?: TableBlock;
}

export const EducationManagerContactTable: React.FC<EducationManagerContactTableProps> = ({ tableBlock }) => {
  const [pageSize] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const pagedList = tableBlock.rows.slice(0, (page - 1) * pageSize + pageSize);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  if (!tableBlock || tableBlock.showBlock === false) return <></>;

  return (
    <div className="mb-[20rem]">
      <div className="table-education-managers-contact">
        <Table>
          <Table.Header>
            {tableBlock.headers?.map((header, i) => (
              <Table.HeaderColumn key={`${header.name}-${i}`}>{header.name}</Table.HeaderColumn>
            ))}
          </Table.Header>
          <Table.Body>
            {pagedList.map((row, rowIndex) => {
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
                            {pagedList[rowIndex].cells[cellIndex].wysiwyg_content}
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
      {tableBlock.rows?.length > pagedList.length && (
        <LoadMoreBlock
          loadMoreColorClass="text-white"
          loadMoreCallback={handleLoadMore}
          className="absolute top-[8.75rem]"
        />
      )}
    </div>
  );
};

export default EducationManagerContactTable;
