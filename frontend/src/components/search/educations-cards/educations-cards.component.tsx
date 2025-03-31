import LoadMoreBlock from '@components/block/load-more-block.component';
import DropCard from '@components/card/drop-card.component';
import { useAppContext } from '@contexts/app-context/use-app-context';
import { Course, PagingMetaData } from '@interfaces/education';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { getEducationLengthString, getSanitizedInformation } from '@services/education-service/education-service';
import { Checkbox } from '@sk-web-gui/react';
import { routeDynamicSlugFormat } from '@utils/app-url';
import { orFallbackDataValue } from '@utils/labels';
import dayjs from 'dayjs';

const cardIconClasses = 'medium-device-min:!hidden !text-2xl mr-2 medium-device-min:mr-10';
const cardDataClasses = 'medium-device-min:font-bold capitalize';

export const EducationsCards: React.FC<{
  educations: Course[];
  handleCheckboxClick: (edu: Course) => React.ChangeEventHandler<HTMLInputElement>;
  handleOnClickResult: (id?: number) => void;
  _meta?: PagingMetaData;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ educations, handleCheckboxClick, _meta, setPageSize, handleOnClickResult }) => {
  const { searchCompareList } = useAppContext();

  if (!_meta) return <></>;

  const loadMoreCallback = () => {
    setPageSize((_meta?.count as number) + 10); // make new request
  };

  return (
    <ul aria-label="Sökresultat">
      {educations?.slice(0, _meta?.limit)?.map((edu, index) => {
        const informationSanitized = edu?.information ? getSanitizedInformation(edu?.information) : null;
        const isLastItem = _meta?.limit && index === _meta?.limit - 1;
        return (
          <li key={`${index}-${edu?.id}`} className="w-full flex flex-col">
            <DropCard
              data-id={edu?.id}
              href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: edu })}`}
              onClick={() => handleOnClickResult(edu?.id)}
              dropIcon={<SchoolIcon className="material-icon desktop:!text-2xl" />}
              footer={
                <div className="flex flex-col gap-y-20">
                  <div className="text-[1.3rem] medium-device-min:text-sm flex flex-row-reverse medium-device-min:flex-row flex-wrap gap-x-4 phone:gap-x-20 medium-device-min:gap-x-[6.9em] medium-device-min:gap-y-20">
                    <div className="hidden medium-device-min:block">
                      <label htmlFor="EducationLength">Längd</label>
                      <div id="EducationLength" className="flex items-center">
                        <span className={cardDataClasses}>
                          {orFallbackDataValue(
                            edu?.start && edu?.end ? getEducationLengthString(edu?.start, edu?.end) : null
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="EducationStudyLocation" className="hidden medium-device-min:block">
                        Plats
                      </label>
                      <div id="EducationStudyLocation" className="flex items-center">
                        <LocationOnIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{orFallbackDataValue(edu?.studyLocation)}</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="EducationStart" className="hidden medium-device-min:block">
                        Start
                      </label>
                      <div id="EducationStart" className="flex items-center">
                        <DateRangeIcon className={cardIconClasses} />
                        <span className={cardDataClasses}>{orFallbackDataValue(edu?.start)}</span>
                      </div>
                    </div>
                    <div className="hidden medium-device-min:block">
                      <label htmlFor="EducationScope">Studietakt</label>
                      <div id="EducationScope" className="flex items-center">
                        <span className={cardDataClasses}>
                          {orFallbackDataValue(edu?.scope ? edu?.scope + '%' : null)}
                        </span>
                      </div>
                    </div>
                    <div className="hidden medium-device-min:block">
                      <label htmlFor="EducationLevel">Utbildningsform</label>
                      <div id="EducationLevel" className="flex items-center">
                        <span className={cardDataClasses}>{orFallbackDataValue(edu?.level)}</span>
                      </div>
                    </div>
                    <div className="hidden medium-device-min:block">
                      <label htmlFor="EducationDistance">Distans</label>
                      <div id="EducationDistance" className="flex items-center">
                        <span className={cardDataClasses}>{orFallbackDataValue()}</span>
                      </div>
                    </div>
                    <div className="hidden medium-device-min:block">
                      <label htmlFor="EducationLatestApplication">Sista ansökningsdatum</label>
                      <div id="EducationLatestApplication" className="flex items-center">
                        <span className={cardDataClasses}>
                          {orFallbackDataValue(
                            edu?.latestApplication ? dayjs(edu?.latestApplication).format('YYYY-MM-DD') : null
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <h3 className="mb-10">{edu?.name ? edu?.name : ''}</h3>
              {informationSanitized && (
                <div className="text max-h-[4em]" dangerouslySetInnerHTML={{ __html: informationSanitized }} />
              )}
            </DropCard>
            {!isLastItem ?
              <div className="mt-sm flex justify-end">
                <Checkbox
                  checked={searchCompareList.filter((x) => x.id == edu?.id).length > 0}
                  onChange={handleCheckboxClick(edu)}
                >
                  Jämför utbildning
                </Checkbox>
              </div>
            : null}
          </li>
        );
      })}
      {_meta.totalRecords && _meta.limit && _meta.totalRecords > _meta.limit && (
        <LoadMoreBlock loadMoreColorClass="text-white" loadMoreCallback={loadMoreCallback} className="desktop:mb-3xl" />
      )}
    </ul>
  );
};
export default EducationsCards;
