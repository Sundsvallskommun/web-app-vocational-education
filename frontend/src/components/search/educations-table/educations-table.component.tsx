import { useAppContext } from '@contexts/app.context';
import { Course, PagingMetaData } from '@interfaces/education';
import { Checkbox, Link, Pagination, Table } from '@sk-web-gui/react';
import NextLink from 'next/link';

export const tableCellTextClasses = 'text-base leading-[2.9rem] capitalize';

export const EducationsTable: React.FC<{
  educations: Course[];
  handleCheckboxClick: (edu: Course) => (e) => void;
  _meta: PagingMetaData;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ educations, handleCheckboxClick, _meta, setPage }) => {
  const { searchCompareList } = useAppContext();

  const pagedList = educations;

  return (
    <div>
      <div className="table-compare">
        <Table>
          <caption className="sr-only">
            Sökresultat av utbildingar, sida {_meta.page} av {_meta.totalPages}.
            <br />
            <small>Lista över de utbildningar som matchar ditt sökord och dina sökfilter.</small>
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
              <Table.Row key={`${index}-${edu?.id}`} className="[&>td]:h-full">
                <Table.Column>
                  <Checkbox
                    checked={searchCompareList.filter((x) => x.id == edu?.id).length > 0}
                    onChange={handleCheckboxClick(edu)}
                  />
                </Table.Column>
                <Table.Column>
                  <span className="inline-block">
                    <NextLink href={`/utbildningar/${edu?.id}`} /* This should be built and point to dynamic page */>
                      <Link as="span" className="line-clamp-2 text-base mb-6 leading-[1.5]">
                        {edu?.name ?? '-'}
                      </Link>
                    </NextLink>
                    <div className="text-sm capitalize">{edu?.level ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column className="min-w-[11em]">
                  <span className={tableCellTextClasses}>{edu?.numberOfSeats ?? '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>{'(?)'}</div>
                    <div className={tableCellTextClasses}>{edu?.studyLocation ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>{edu?.start ?? '-'}</div>
                    <div className={tableCellTextClasses}>{edu?.end ?? '-'}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu?.scope ? edu?.scope + '%' : '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu?.level ?? '-'}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>(?)</span>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {_meta.totalPages > 1 && (
        <div className="flex justify-center mt-2xl">
          <Pagination
            className="pagination override"
            changePage={(page) => setPage(page)}
            activePage={_meta.page + 1}
            pages={_meta.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default EducationsTable;
