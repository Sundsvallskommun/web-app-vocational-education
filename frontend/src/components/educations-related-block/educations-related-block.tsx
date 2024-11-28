import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { EducationsRelated } from '@interfaces/education';
import SchoolIcon from '@mui/icons-material/School';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';

interface EducationsRelatedBlockProps {
  show: boolean;
  educations?: EducationsRelated['educations'];
}

export default function EducationsRelatedBlock({ educations, show }: EducationsRelatedBlockProps) {
  if (!show || !educations?.length) return null;
  return (
    <CardsBlock<EducationsRelated['educations']>
      title={`Relaterade utbildningar`}
      padded
      backgroundClass="bg-blue-light"
      loadMoreColorClass="text-blue-light"
      cards={educations || []}
      cardRender={(education, index) => (
        <DropCard
          key={`${index}`}
          classNameCard="h-[232px] desktop:h-[270px]"
          href={`/utbildningar/${education.courseCode}`}
          dropIcon={<SchoolIcon className="!text-2xl" />}
          footer={
            <>
              <div className="flex items-center">
                <DateRangeIcon className="!text-2xl mr-sm" /> <span>{dayjs(education.date).format('DD MMM YYYY')}</span>
              </div>
              <div className="flex items-center">
                <LocationOnIcon className="!text-2xl mr-sm" /> <span>{education.studyLocation}</span>
              </div>
            </>
          }
        >
          <h3>{education.title}</h3>
          <p className="text">{education.text}</p>
        </DropCard>
      )}
    />
  );
}
