import ContentBlock from '@components/block/content-block.component';
import LoadMoreBlock from '@components/block/load-more-block.component';
import { useThemeQueries } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';

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
  const { isMinDesktop, isMinMediumDevice } = useThemeQueries();

  const loadMoreCallback = () => {
    setShowAmount((amount) => {
      if (!isMinDesktop) {
        return amount + mobileDefaultAmount;
      }
      return amount + DesktopDefaultAmount;
    });
  };

  useEffect(() => {
    if (isMinDesktop) {
      setShowAmount(DesktopDefaultAmount);
    } else if (isMinMediumDevice) {
      setShowAmount(tabletDefaultAmount);
    } else {
      setShowAmount(mobileDefaultAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMinDesktop, isMinMediumDevice]);

  return (
    <ContentBlock classNameWrapper={`${className} ${backgroundClass}`} padded>
      <div>
        <h2>{title}</h2>
        <div className="mt-2xl flex flex-col medium-device:grid medium-device:grid-cols-2 desktop:grid-cols-3 gap-lg gap-y-2xl">
          {cards.slice(0, showAmount).map((card, index) => {
            return cardRender(card, index);
          })}
        </div>
        {!isMinDesktop && showAmount < cards.length && (
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
