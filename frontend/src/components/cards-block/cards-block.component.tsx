import ContentBlock from '@components/block/content-block.component';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@utils/use-window-size.hook';
import LoadMoreBlock from '@components/block/load-more-block.component';

type ValuesOf<T extends unknown[]> = T[number];

interface CardsBlockProps<T extends unknown[] = unknown[]> {
  title: string;
  cards: T;
  cardRender: (card: ValuesOf<T>, index: number) => React.ReactElement;
  className?: string;
  backgroundClass?: string;
  loadMoreColorClass?: string;
  mobileDefaultAmount?: number;
  tabletDefaultAmount?: number;
  DesktopDefaultAmount?: number;
}

export const CardsBlock = <T extends unknown[] = unknown[]>({
  title,
  cards,
  cardRender,
  className,
  backgroundClass = 'bg-white',
  loadMoreColorClass = 'text-white',
  mobileDefaultAmount = 2,
  tabletDefaultAmount = 4,
  DesktopDefaultAmount = 6,
}: CardsBlockProps<T>) => {
  const [showAmount, setShowAmount] = useState(mobileDefaultAmount);
  const { windowSize } = useWindowSize();

  const loadMoreCallback = () => {
    setShowAmount((amount) => {
      if (!windowSize.lg) {
        return amount + mobileDefaultAmount;
      }
      return amount + DesktopDefaultAmount;
    });
  };

  useEffect(() => {
    if (windowSize.lg) {
      setShowAmount(DesktopDefaultAmount);
    } else if (windowSize.md) {
      setShowAmount(tabletDefaultAmount);
    } else {
      setShowAmount(mobileDefaultAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.lg, windowSize.md]);

  return (
    <ContentBlock classNameWrapper={`${className} ${backgroundClass}`} padded>
      <div>
        <h2>{title}</h2>
        <div className="mt-2xl flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-lg gap-y-2xl">
          {cards.slice(0, showAmount).map((card, index) => {
            return cardRender(card, index);
          })}
        </div>
        {!windowSize.lg && showAmount < cards.length && (
          <LoadMoreBlock
            loadMoreColorClass={loadMoreColorClass}
            loadMoreCallback={loadMoreCallback}
            backgroundClass={backgroundClass}
          />
        )}
      </div>
    </ContentBlock>
  );
};
