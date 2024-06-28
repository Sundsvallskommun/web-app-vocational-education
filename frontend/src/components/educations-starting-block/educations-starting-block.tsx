import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { EducationsStartingBlock as EducationsStartingBlockType } from '@interfaces/admin-data';
import SchoolIcon from '@mui/icons-material/School';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';

interface educationsStartingBlockProps {
  educationsStartingBlock: EducationsStartingBlockType;
}

export default function EducationsStartingBlock({ educationsStartingBlock }: educationsStartingBlockProps) {
  console.log('educationsStartingBlock', educationsStartingBlock);
  const tmp: EducationsStartingBlockType = {
    showBlock: true,
    pageName: 'utbildningar',
    title: 'Utbildningar som snart börjar',
    educations: [
      ...Array.from(Array(6), (_, i) => ({
        title: `mock_title${i}`,
        text: `mock_text${i}`,
        date: new Date(),
        location: `mock_location${i}`,
        courseCode: `mock_XCODE${i}`,
      })),
    ],
  };
  if (!tmp?.showBlock) return <></>;
  return (
    <CardsBlock<EducationsStartingBlockType['educations']>
      title={tmp.title}
      cards={tmp.educations}
      cardRender={(card, index) => (
        <DropCard
          key={`${index}`}
          classNameCard="max-h-[232px] min-h-[232px] desktop:max-h-[270px]"
          href={`/utbildningar/${encodeURIComponent(`${card.courseCode}-${card.title}`)}`}
          dropIcon={<SchoolIcon className="!text-2xl" />}
          footer={
            <>
              <div className="flex items-center">
                <DateRangeIcon className="!text-2xl mr-sm" />{' '}
                <span className="min-w-[10rem]">{dayjs(card.date).format('DD MMM YYYY')}</span>
              </div>
              <div className="flex items-center">
                <LocationOnIcon className="!text-2xl mr-sm" /> <span>{card.location}</span>
              </div>
            </>
          }
        >
          <h3>{card.title}</h3>
          <p className="text">{card.text}</p>
        </DropCard>
      )}
    />
  );
}
