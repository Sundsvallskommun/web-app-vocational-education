import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { Course } from '@interfaces/education';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { getSanitizedInformation } from '@services/education-service/education-service';
import { routeDynamicSlugFormat } from '@utils/app-url';
import dayjs from 'dayjs';

interface EducationsRelatedBlockProps {
  show: boolean;
  educations?: Course[];
}

export default function EducationsRelatedBlock({ educations, show }: EducationsRelatedBlockProps) {
  if (!show || !educations?.length) return null;
  return (
    <CardsBlock<Course[]>
      title={`Relaterade utbildningar`}
      padded
      backgroundClass="bg-blue-light"
      loadMoreColorClass="text-blue-light"
      cards={educations || []}
      cardRender={(edu, index) => {
        const informationSanitized = edu?.information ? getSanitizedInformation(edu?.information) : null;
        return (
          <DropCard
            key={`${index}`}
            classNameCard="h-[232px] desktop:h-[270px]"
            href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: edu })}`}
            dropIcon={<SchoolIcon className="!text-2xl" />}
            footer={
              <>
                <div className="flex items-center">
                  <DateRangeIcon className="!text-2xl mr-sm" /> <span>{dayjs(edu.start).format('DD MMM YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="!text-2xl mr-sm" /> <span>{edu.studyLocation}</span>
                </div>
              </>
            }
          >
            <h3>{edu?.name ? edu?.name : ''}</h3>
            <div className="text max-h-[4em]">
              {edu?.scope ?
                <div className="mb-8 text-sm text-label leading-[1.8rem]">{`Studietakt: ${edu?.scope}%`}</div>
              : null}
              {informationSanitized ?
                <div dangerouslySetInnerHTML={{ __html: informationSanitized }} />
              : null}
            </div>
          </DropCard>
        );
      }}
    />
  );
}
