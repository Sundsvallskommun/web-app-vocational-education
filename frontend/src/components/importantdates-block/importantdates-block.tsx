import ContentBlock from '@components/block/content-block.component';
import DropCard from '@components/card/drop-card.component';
import { ImportantDatesBlock as ImportantDatesBlockType } from '@interfaces/admin-data';
import dayjs from 'dayjs';

interface ImportantDatesBlockProps {
  importantDatesBlock?: ImportantDatesBlockType;
}

export default function ImportantDatesBlock({ importantDatesBlock }: ImportantDatesBlockProps) {
  if (!importantDatesBlock?.showBlock) return <></>;
  return (
    <ContentBlock>
      <h2>{importantDatesBlock.title}</h2>
      <div className="mt-2xl flex flex-col medium-device:grid medium-device:grid-cols-2 desktop:grid-cols-3 gap-lg gap-y-2xl">
        {importantDatesBlock.dateCards.map((dateCard, i) => (
          <DropCard
            key={`${dateCard.title}-${i}`}
            classNameCard="h-[232px] desktop:h-[270px]"
            href={dateCard.url}
            dropDate={dayjs(dateCard.date)}
          >
            <h3>{dateCard.title}</h3>
            <p className="text">{dateCard.text}</p>
          </DropCard>
        ))}
      </div>
    </ContentBlock>
  );
}
