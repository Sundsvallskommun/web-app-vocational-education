import DropCard from '@components/card/drop-card.component';
import { CardsBlock } from '@components/cards-block/cards-block.component';
import { EmployerPromotionsBlock as EmployerPromotionsBlockType } from '@interfaces/admin-data';
import SchoolIcon from '@mui/icons-material/School';

interface EmployerPromotionsBlockProps {
  employerPromotionsBlock?: EmployerPromotionsBlockType;
}

export default function EmployerPromotionsBlock({ employerPromotionsBlock }: EmployerPromotionsBlockProps) {
  if (!employerPromotionsBlock?.showBlock) return <></>;
  return (
    <CardsBlock<EmployerPromotionsBlockType['employerPromotions']>
      title={employerPromotionsBlock.title || ''}
      backgroundClass="bg-blue-light"
      loadMoreColorClass="text-blue-light"
      cards={employerPromotionsBlock.employerPromotions}
      cardRender={(card, index) => (
        <DropCard
          key={`${index}`}
          classNameCard="h-[232px] desktop:h-[270px]"
          href={`/utbildningar/efterfragade/${card.title}`}
          dropIcon={<SchoolIcon className="!text-2xl" />}
        >
          <h3>{card.title}</h3>
          <p className="text">{card.ingress}</p>
        </DropCard>
      )}
    />
  );
}
