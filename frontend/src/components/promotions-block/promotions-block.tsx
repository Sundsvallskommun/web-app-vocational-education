import ContentBlock from '@components/block/content-block.component';
import BigDropCard from '@components/card/big-drop-card.component';
import { PromotionsBlock as PromotionsBlockType } from '@interfaces/admin-data';

interface PromotionsBlockProps {
  promotionsBlock?: PromotionsBlockType;
}

export default function PromotionsBlock({ promotionsBlock }: PromotionsBlockProps) {
  if (!promotionsBlock?.showBlock) return <></>;
  const wide = promotionsBlock.promotions.length % 2 === 0 && promotionsBlock.promotions.length % 6 !== 0;
  return (
    <ContentBlock classNameWrapper="desktop:mb-[160px]">
      <div
        className={`grid desktop:flex flex-wrap mt-2xl desktop:mt-3xl justify-center ${wide ? 'gap-y-[2.6rem] gap-x-[2.6rem]' : 'gap-y-[5rem] gap-x-[3.3rem]'}`}
      >
        {promotionsBlock.promotions.map((promotion, i) => (
          <BigDropCard
            key={`${promotion.url}-${i}`}
            className={`
              ${
                wide ?
                  'desktop:flex-[0_1_calc(50%_-_1.3rem)]' // Adjust for half the gap
                : 'desktop:flex-[0_1_calc(33.333%_-_2.2rem)]' // Adjust for a third of the gap
              }
            `}
            href={promotion.promotedPage.url}
            dropImageSrc={promotion.promotedPage.imgSrc}
            footer={<></>}
          >
            <h2>{promotion.promotedPage.title}</h2>
            <p className="text text-full">{promotion.promotedPage.description}</p>
          </BigDropCard>
        ))}
      </div>
    </ContentBlock>
  );
}
