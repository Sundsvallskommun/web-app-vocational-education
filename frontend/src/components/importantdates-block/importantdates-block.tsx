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
      <div className="mt-2xl flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-lg gap-y-2xl">
        {importantDatesBlock.dateCards.map((dateCard, i) => (
          <DropCard
            key={`${dateCard.title}-${i}`}
            classNameCard="max-h-[232px] min-h-[232px] lg:max-h-[270px]"
            href={dateCard.url}
            dropDate={dayjs(dateCard.date)}
            textFade
          >
            <h3>{dateCard.title}</h3>
            <p className="text">{dateCard.text}</p>
          </DropCard>
        ))}
      </div>
    </ContentBlock>
  );
}
