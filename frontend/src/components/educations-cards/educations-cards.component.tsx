import LoadMoreBlock from '@components/block/load-more-block.component';
import DropCard from '@components/card/drop-card.component';
import { useAppContext } from '@contexts/app.context';
import { Course, PagingMetaData } from '@interfaces/education';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { getEducationLengthString } from '@services/education-service/education-service';
import { Checkbox } from '@sk-web-gui/react';
import { XMLParser } from 'fast-xml-parser';
import SanitizeHTML from 'sanitize-html';

const cardIconClasses = 'lg:!hidden !text-2xl mr-sm';
const cardDataClasses = 'lg:font-bold';

const parser = new XMLParser();

const cardInformationSanitizeOptions = {
  allowedTags: [
    'p',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'del',
    'div',
    'sup',
    'sub',
    'span',
    'br',
  ],
  allowedAttributes: {
    a: ['class'],
    p: ['class'],
    br: ['class'],
  },
  transformTags: {
    a: function () {
      return {
        tagName: 'span',
      };
    },
    p: function () {
      return {
        tagName: 'p',
        attribs: {
          class: 'my-0',
        },
      };
    },
    br: function () {
      return {
        tagName: 'br',
        attribs: {
          class: 'block mt-[.4rem]',
        },
      };
    },
  },
};

export const EducationsCards: React.FC<{
  educations: Course[];
  handleCheckboxClick: (edu: Course) => (e) => void;
  _meta: PagingMetaData;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ educations, handleCheckboxClick, _meta, setPageSize }) => {
  const { searchCompareList } = useAppContext();

  const loadMoreCallback = () => {
    setPageSize((amount) => (_meta.totalRecords <= amount ? amount : amount + 10)); // make new request
  };

  return (
    <>
      {educations.slice(0, _meta.limit).map((edu, index) => {
        let information = edu.information;
        if (edu.information.includes('CDATA')) {
          const xmlParsedInformation = parser.parse(edu.information);
          information = xmlParsedInformation ? xmlParsedInformation['#text'] : '';
        }
        const informationSanitized = SanitizeHTML(information, cardInformationSanitizeOptions);
        return (
          <div key={`${index}-${edu.code}`} className="w-full flex flex-col">
            <DropCard
              classNameCard="h-[218px] lg:h-[247px]"
              href={`/utbildningar/${edu.code}-${edu.id}`}
              dropIcon={<SchoolIcon className="material-icon lg:!text-2xl" />}
              footer={
                <>
                  <div className="text-[1.3rem] md:text-sm flex justify-between gap-md lg:gap-lg">
                    <div className="hidden lg:block">
                      <div className="label">Utbildningens längd</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{getEducationLengthString(edu.start, edu.end) ?? '-'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="hidden lg:block label">Plats</div>
                      <div className="flex items-center">
                        <LocationOnIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{edu.studyLocation.split(',')}</span>
                      </div>
                    </div>
                    <div>
                      <div className="hidden lg:block label">Start</div>
                      <div className="flex items-center">
                        <DateRangeIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{edu.start ?? ''}</span>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="label">Studietakt</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{edu.scope ? edu.scope + '%' : '-'}</span>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="label">Distans (?)</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{'X'}</span>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="label">Språk (?)</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{'X'}</span>
                      </div>
                    </div>
                  </div>
                </>
              }
            >
              <h3>{edu.name ? edu.name : ''}</h3>
              <span
                className="text [&>p:first-child]:mt-sm"
                dangerouslySetInnerHTML={{ __html: informationSanitized }}
              />
            </DropCard>
            <div className="mt-sm flex justify-end">
              <Checkbox
                checked={searchCompareList.filter((x) => x.id == edu.id).length > 0}
                onChange={handleCheckboxClick(edu)}
              >
                Jämför utbildning
              </Checkbox>
            </div>
          </div>
        );
      })}
      {_meta.totalRecords > _meta.limit && (
        <LoadMoreBlock loadMoreColorClass="text-white" loadMoreCallback={loadMoreCallback} className="lg:mb-3xl" />
      )}
    </>
  );
};
export default EducationsCards;
