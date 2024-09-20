import LoadMoreBlock from '@components/block/load-more-block.component';
import DropCard from '@components/card/drop-card.component';
import { useAppContext } from '@contexts/app.context';
import { Course, PagingMetaData } from '@interfaces/education';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { getEducationLengthString, getSanitizedInformation } from '@services/education-service/education-service';
import { Checkbox } from '@sk-web-gui/react';

const cardIconClasses = 'desktop:!hidden !text-2xl mr-10';
const cardDataClasses = 'desktop:font-bold capitalize';

export const EducationsCards: React.FC<{
  educations: Course[];
  handleCheckboxClick: (edu: Course) => (e) => void;
  _meta: PagingMetaData;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ educations, handleCheckboxClick, _meta, setPageSize }) => {
  const { searchCompareList } = useAppContext();

  if (!_meta) return <></>;

  const loadMoreCallback = () => {
    setPageSize((amount) => (_meta?.totalRecords <= amount ? amount : amount + 10)); // make new request
  };

  return (
    <>
      {educations?.slice(0, _meta?.limit)?.map((edu, index) => {
        const informationSanitized = getSanitizedInformation(edu?.information);
        return (
          <div key={`${index}-${edu?.id}`} className="w-full flex flex-col">
            <DropCard
              href={`/utbildningar/${edu?.id}`}
              dropIcon={<SchoolIcon className="material-icon desktop:!text-2xl" />}
              footer={
                <div className="flex flex-col gap-y-20">
                  <div className="text-[1.3rem] medium-device:text-sm flex flex-row-reverse desktop:flex-row flex-wrap gap-x-20 desktop:gap-x-[6.9em] desktop:gap-y-20">
                    <div className="hidden desktop:block">
                      <div className="label">Längd</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{getEducationLengthString(edu?.start, edu?.end) ?? '-'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="hidden desktop:block label">Plats</div>
                      <div className="flex items-center">
                        <LocationOnIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{edu?.studyLocation?.split(',')}</span>
                      </div>
                    </div>
                    <div>
                      <div className="hidden desktop:block label">Start</div>
                      <div className="flex items-center">
                        <DateRangeIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{edu?.start ?? '-'}</span>
                      </div>
                    </div>
                    <div className="hidden desktop:block">
                      <div className="label">Studietakt</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{edu?.scope ? edu?.scope + '%' : '-'}</span>
                      </div>
                    </div>
                    <div className="hidden desktop:block">
                      <div className="label">Utbildningsform</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{edu?.level ?? '-'}</span>
                      </div>
                    </div>
                    <div className="hidden desktop:block">
                      <div className="label">Distans (?)</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{'X'}</span>
                      </div>
                    </div>
                    <div className="hidden desktop:block">
                      <div className="label">Språk (?)</div>
                      <div className="flex items-center">
                        <span className={cardDataClasses}>{'X'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <h3 className="mb-10">{edu?.name ? edu?.name : ''}</h3>
              <div
                className="text h-[9em] desktop:h-[11em]"
                dangerouslySetInnerHTML={{ __html: informationSanitized }}
              />
            </DropCard>
            <div className="mt-sm flex justify-end">
              <Checkbox
                checked={searchCompareList.filter((x) => x.id == edu?.id).length > 0}
                onChange={handleCheckboxClick(edu)}
              >
                Jämför utbildning
              </Checkbox>
            </div>
          </div>
        );
      })}
      {_meta.totalRecords > _meta.limit && (
        <LoadMoreBlock loadMoreColorClass="text-white" loadMoreCallback={loadMoreCallback} className="desktop:mb-3xl" />
      )}
    </>
  );
};
export default EducationsCards;
