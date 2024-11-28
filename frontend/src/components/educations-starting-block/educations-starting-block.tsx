import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { EducationsStartingBlock as EducationsStartingBlockType } from '@interfaces/admin-data';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { GetEducationEvents, getSanitizedInformation } from '@services/education-service/education-service';
import { routeDynamicSlugFormat } from '@utils/app-url';
import dayjs from 'dayjs';

interface EducationsStartingBlockProps {
  educationsStartingBlock?: EducationsStartingBlockType;
}

export default function EducationsStartingBlock({ educationsStartingBlock }: EducationsStartingBlockProps) {
  if (!educationsStartingBlock) return null;
  return (
    <CardsBlock<GetEducationEvents['courses']>
      title={'Utbildningar som snart börjar'}
      cards={educationsStartingBlock?.courses ?? []}
      cardRender={(course, index) => {
        const informationSanitized = getSanitizedInformation(course?.information);
        return (
          <DropCard
            key={`${index}`}
            classNameCard="h-[232px] desktop:h-[270px]"
            href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: course })}`}
            dropIcon={<SchoolIcon className="!text-2xl" />}
            footer={
              <>
                <div className="flex items-center">
                  <DateRangeIcon className="!text-2xl mr-sm" />{' '}
                  <span className="min-w-[10rem]">{dayjs(course.start).format('DD MMM YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="!text-2xl mr-sm" /> <span>{course.studyLocation}</span>
                </div>
              </>
            }
          >
            <h3>{course.name}</h3>
            {informationSanitized && (
              <div className="text" dangerouslySetInnerHTML={{ __html: informationSanitized }} />
            )}
          </DropCard>
        );
      }}
    />
  );
}
