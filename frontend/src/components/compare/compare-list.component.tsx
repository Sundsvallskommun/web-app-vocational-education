import { Course } from '@interfaces/education';
import { Checkbox, Link, Pagination, Table } from '@sk-web-gui/react';
import { getPageListSlice } from '@utils/pagination';
import NextLink from 'next/link';
import { useState } from 'react';

export const CompareList: React.FC<{ compareList: Course[]; onRemove? }> = ({ compareList, onRemove }) => {
  const handleOnRemove = (item: Course) => () => {
    onRemove && onRemove(item);
  };

  const [pageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const pagedList = getPageListSlice(compareList, page, pageSize);

  return (
    <div>
      <div className="table-compare">
        <Table>
          <Table.Header>
            <Table.HeaderColumn>Jämför</Table.HeaderColumn>
            <Table.HeaderColumn>Utbildning</Table.HeaderColumn>
            <Table.HeaderColumn>Platser</Table.HeaderColumn>
            <Table.HeaderColumn>Distans / Ort</Table.HeaderColumn>
            <Table.HeaderColumn>Start / Slut</Table.HeaderColumn>
            <Table.HeaderColumn>Studietakt</Table.HeaderColumn>
            <Table.HeaderColumn>Språk</Table.HeaderColumn>
          </Table.Header>
          <Table.Body>
            {pagedList.map((edu, index) => (
              <Table.Row key={`${index}-${edu.id}`}>
                <Table.Column>
                  <span>
                    <Checkbox checked onChange={handleOnRemove(edu)}>
                      <span className="sr-only">Jämför utbildning</span>
                    </Checkbox>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span className="inline-block">
                    <NextLink
                      href={`/utbildningar/${edu.code}-${edu.id}`} /* This should be built and point to dynamic page */
                    >
                      <Link as="span" className="line-clamp-2">
                        {edu.name ?? '-'}
                      </Link>
                    </NextLink>
                    <div className="text-sm capitalize">{edu.level ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>{edu.numberOfSeats ?? '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div>{'(?) Distans / På plats'}</div>
                    <div>{edu.studyLocation ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div>{edu.start ?? '-'}</div>
                    <div>{edu.end ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>{edu.scope ? edu.scope + '%' : '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span>(?)</span>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {Math.ceil(compareList.length / pageSize) > 1 && (
        <div className="flex justify-center mt-2xl">
          <Pagination
            className="pagination override"
            changePage={(page) => setPage(page)}
            activePage={page}
            pages={Math.ceil(compareList.length / pageSize)}
          />
        </div>
      )}
    </div>
  );
};

export default CompareList;
