import BigDropCard from '@components/card/big-drop-card.component';
import { PromotionsBlock as PromotionsBlockType } from '@interfaces/admin-data';

interface PromotionsBlockProps {
  promotionsBlock?: PromotionsBlockType;
}

export default function PromotionsBlock({ promotionsBlock }: PromotionsBlockProps) {
  if (!promotionsBlock?.showBlock) return <></>;
  return (
    <div className="grid desktop:grid-cols-3 desktop:grid-rows-[377px] gap-lg mt-2xl desktop:mt-3xl">
      {promotionsBlock.promotions.map((promotion, i) => (
        <BigDropCard
          key={`${promotion.url}-${i}`}
          className="desktop:h-[377px]"
          href={promotion.promotedPage.url}
          dropImageSrc={`/YM_puff${i + 1}.jpg`}
          footer={<></>}
        >
          <h2>{promotion.promotedPage.title}</h2>
          <p className="text text-full">{promotion.promotedPage.description}</p>
        </BigDropCard>
      ))}
    </div>
  );
}
