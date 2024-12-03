import ContentBlock from '@components/block/content-block.component';
import Button from '@components/button/button.component';
import Drop from '@components/drop/drop.component';
import { ImportantDatesBlockDateCard, ImportantDatesBlock as ImportantDatesBlockType } from '@interfaces/admin-data';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useThemeQueries } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { Fragment } from 'react';

interface ImportantDatesCardProps {
  dateCard: ImportantDatesBlockDateCard;
}

export function ImportantDatesCard({ dateCard }: ImportantDatesCardProps) {
  return (
    <>
      <div className="important-dates-card">
        <Drop topStyle={'-' + 36} setSize dropDate={dateCard.date} dropHeight={72} />
        <h4 className="important-dates-card-heading">Lorem ipsum dolor sit amet consectuer, est los.</h4>
        <p className="important-dates-card-text">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim{' '}
        </p>
      </div>
    </>
  );
}

interface ImportantDatesBlockProps {
  importantDatesBlock?: ImportantDatesBlockType;
}

export default function ImportantDatesBlock({ importantDatesBlock }: ImportantDatesBlockProps) {
  const { isMinDesktop } = useThemeQueries();
  const orientation = isMinDesktop ? 'horizontal' : 'vertical';

  const currentDate = new Date();
  let previousCardDate = dayjs(importantDatesBlock?.dateCards[0]?.date).format('YYYY-MM');

  if (!importantDatesBlock?.showBlock) return null;
  return (
    <ContentBlock classNameContent="important-dates-content">
      {importantDatesBlock.title ?
        <h2>{importantDatesBlock.title}</h2>
      : null}
      <div className="important-dates-items" data-orientation={orientation}>
        {importantDatesBlock.dateCards
          .filter((card) =>
            !importantDatesBlock.showAll ?
              dayjs(card.date).format('YYYY-MM') === dayjs(currentDate).format('YYYY-MM') ||
              dayjs(card.date).isAfter(currentDate)
            : true
          )
          .slice(
            0,
            importantDatesBlock.showAll ? importantDatesBlock.dateCards.length - 1 : importantDatesBlock.amountShown
          )
          .map((dateCard, i) => {
            const isNewDate = dayjs(dayjs(dateCard.date).format('YYYY-MM')).isAfter(previousCardDate);
            if (isNewDate) {
              previousCardDate = dayjs(dateCard.date).format('YYYY-MM');
            }
            const Level = importantDatesBlock.title ? 'h3' : 'h2';
            return (
              <Fragment key={`${i}`}>
                {isNewDate || i === 0 ?
                  <Level className="important-dates-card-monthyear">{`${dayjs(previousCardDate).format('MMMM YYYY')}`}</Level>
                : null}
                <ImportantDatesCard key={`${i}`} dateCard={dateCard} />
              </Fragment>
            );
          })}
      </div>
      {importantDatesBlock.showSeeAllButton ?
        <div className="flex mt-[2.7rem] desktop:justify-end">
          <NextLink href="/viktiga-datum" className="w-full desktop:w-fit">
            <Button variant="secondary" as="span" rightIcon={<ArrowForwardIcon />}>
              Se alla viktiga datum
            </Button>
          </NextLink>
        </div>
      : null}
    </ContentBlock>
  );
}
