import { Course } from '@interfaces/education';
import { Checkbox, Link, Pagination, Table } from '@sk-web-gui/react';
import { getPageListSlice } from '@utils/pagination';
import NextLink from 'next/link';
import { useState } from 'react';
import { routeDynamicSlugFormat } from '@utils/app-url';
import { tableCellTextClasses } from '@components/search/educations-table/defaults';

export const CompareList: React.FC<{ compareList: Course[]; onRemove?: (item: Course) => void }> = ({
  compareList,
  onRemove,
}) => {
  const handleOnRemove = (item: Course) => () => {
    onRemove?.(item);
  };

  const [pageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const pagedList = getPageListSlice(compareList, page, pageSize);
  const pages = Math.ceil(compareList.length / pageSize);

  return (
    <div>
      <div className="table-compare">
        <Table>
          <caption className="sr-only">
            Jämför utbildningar, sida {page} av {pages}.
            <br />
            <small>Lista över de utbildningar du valt att jämföra.</small>
          </caption>
          <Table.Header>
            <Table.HeaderColumn>Jämför</Table.HeaderColumn>
            <Table.HeaderColumn>Utbildning</Table.HeaderColumn>
            <Table.HeaderColumn>Platser / Antagna</Table.HeaderColumn>
            <Table.HeaderColumn>Distans / Ort</Table.HeaderColumn>
            <Table.HeaderColumn>Start / Slut</Table.HeaderColumn>
            <Table.HeaderColumn>Studietakt</Table.HeaderColumn>
            <Table.HeaderColumn>Utbildningsform</Table.HeaderColumn>
            <Table.HeaderColumn>Språk</Table.HeaderColumn>
          </Table.Header>
          <Table.Body>
            {pagedList.map((edu, index) => (
              <Table.Row key={`${index}-${edu.id}`} className="[&>td]:h-full">
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
                      href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: edu })}`}
                    >
                      <Link as="span" className="line-clamp-2 text-base mb-6 leading-[1.5]">
                        {edu.name ?? '-'}
                      </Link>
                    </NextLink>
                    <div className="text-sm capitalize">{edu.level ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column className="min-w-[11em]">
                  <span className={tableCellTextClasses}>{edu.numberOfSeats ?? '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>Saknas</div>
                    <div className={tableCellTextClasses}>{edu.studyLocation ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>{edu.start ?? '-'}</div>
                    <div className={tableCellTextClasses}>{edu.end ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu.scope ? edu.scope + '%' : '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu.level ?? '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>Saknas</span>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {pages > 1 && (
        <div className="flex justify-center mt-2xl">
          <Pagination
            className="pagination override"
            changePage={(page) => setPage(page)}
            activePage={page}
            pages={pages}
          />
        </div>
      )}
    </div>
  );
};

export default CompareList;
