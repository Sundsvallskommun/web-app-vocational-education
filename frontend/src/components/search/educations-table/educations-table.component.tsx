import { Course, PagingMetaData } from '@interfaces/education';
import { Checkbox, Link, Pagination, Table } from '@sk-web-gui/react';
import { routeDynamicSlugFormat } from '@utils/app-url';
import { fallbackDataValue } from '@utils/labels';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { tableCellTextClasses } from './defaults';
import { useAppContext } from '@contexts/app-context/use-app-context';

export const EducationsTable: React.FC<{
  educations: Course[];
  handleCheckboxClick: (edu: Course) => React.ChangeEventHandler<HTMLInputElement>;
  handleOnClickResult: (id?: number) => void;
  _meta?: PagingMetaData;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ educations, handleCheckboxClick, _meta, setPage, handleOnClickResult }) => {
  const { searchCompareList } = useAppContext();

  return (
    <div>
      <div className="table-compare">
        <Table>
          <caption className="sr-only">
            Sökresultat av utbildingar, sida {_meta?.page} av {_meta?.totalPages}.
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
            <Table.HeaderColumn>Sista ansökningsdatum</Table.HeaderColumn>
          </Table.Header>
          <Table.Body>
            {educations.map((edu, index) => (
              <Table.Row key={`${index}-${edu?.id}`} className="[&>td]:h-full" data-id={edu?.id}>
                <Table.Column>
                  <Checkbox
                    checked={searchCompareList.filter((x) => x.id == edu?.id).length > 0}
                    onChange={handleCheckboxClick(edu)}
                  />
                </Table.Column>
                <Table.Column>
                  <span className="inline-block">
                    <NextLink
                      onClick={() => handleOnClickResult(edu?.id)}
                      href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: edu })}`}
                    >
                      <Link as="span" className="line-clamp-2 text-base mb-6 leading-[1.5]">
                        {edu?.name ?? fallbackDataValue()}
                      </Link>
                    </NextLink>
                    <div className="text-sm capitalize">{edu?.level ?? fallbackDataValue()}</div>
                  </span>
                </Table.Column>
                <Table.Column className="min-w-[11em]">
                  <span className={tableCellTextClasses}>{edu?.numberOfSeats ?? fallbackDataValue()}</span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>{fallbackDataValue()}</div>
                    <div className={tableCellTextClasses}>{edu?.studyLocation ?? fallbackDataValue()}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span>
                    <div className={tableCellTextClasses}>{edu?.start ?? fallbackDataValue()}</div>
                    <div className={tableCellTextClasses}>{edu?.end ?? fallbackDataValue()}</div>
                  </span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu?.scope ? edu?.scope + '%' : fallbackDataValue()}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>{edu?.level ?? fallbackDataValue()}</span>
                </Table.Column>
                <Table.Column>
                  <span className={tableCellTextClasses}>
                    {edu?.latestApplication ? dayjs(edu?.latestApplication).format('YYYY-MM-DD') : fallbackDataValue()}
                  </span>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {_meta?.totalPages && _meta?.totalPages > 1 && (
        <div className="flex justify-center mt-2xl">
          <Pagination
            className="pagination override"
            changePage={(page) => setPage(page)}
            activePage={_meta?.page ? _meta.page + 1 : 1}
            pages={_meta.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default EducationsTable;
