import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { EmployerPromotionsBlock as EmployerPromotionsBlockType } from '@interfaces/admin-data';
import SchoolIcon from '@mui/icons-material/School';
import { routeDynamicSlugFormat } from '@utils/app-url';

interface EmployerPromotionsBlockProps {
  showBlock?: boolean;
  employerPromotionsBlock?: EmployerPromotionsBlockType;
}

export default function EmployerPromotionsBlock({ employerPromotionsBlock, showBlock }: EmployerPromotionsBlockProps) {
  if (showBlock === false || !employerPromotionsBlock?.showBlock) return <></>;
  return (
    <CardsBlock<EmployerPromotionsBlockType['employerPromotions']>
      title={employerPromotionsBlock.title || ''}
      padded
      backgroundClass="bg-blue-light"
      loadMoreColorClass="text-blue-light"
      cards={employerPromotionsBlock.employerPromotions}
      cardRender={(card, index) => (
        <DropCard
          key={`${index}`}
          classNameCard="h-[232px] desktop:h-[270px]"
          href={`/utbildningar/efterfragade/${routeDynamicSlugFormat({ slug: '/utbildningar/efterfragade/[efterfragad]', data: card })}`}
          dropIcon={<SchoolIcon className="!text-2xl" />}
        >
          <h3>{card.title}</h3>
          <p className="text">{card.ingress}</p>
        </DropCard>
      )}
    />
  );
}
