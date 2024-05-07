import { useAppContext } from '@contexts/app.context';
import { Course, PagingMetaData } from '@interfaces/education';
import { Checkbox, Link, Pagination, Table } from '@sk-web-gui/react';
import NextLink from 'next/link';

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
          <Table.Header>
            <Table.HeaderColumn>Jämför</Table.HeaderColumn>
            <Table.HeaderColumn>Utbildning</Table.HeaderColumn>
            <Table.HeaderColumn>Platser</Table.HeaderColumn>
            <Table.HeaderColumn>Distans / Ort (?)</Table.HeaderColumn>
            <Table.HeaderColumn>Start / Slut</Table.HeaderColumn>
            <Table.HeaderColumn>Studietakt</Table.HeaderColumn>
            <Table.HeaderColumn>Språk (?)</Table.HeaderColumn>
          </Table.Header>
          <Table.Body>
            {pagedList.map((edu, index) => (
              <Table.Row key={`${index}-${edu.id}`}>
                <Table.Column>
                  <Checkbox
                    checked={searchCompareList.filter((x) => x.id == edu.id).length > 0}
                    onChange={handleCheckboxClick(edu)}
                  />
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
