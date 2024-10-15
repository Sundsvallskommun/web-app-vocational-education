import { useThemeQueries } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import Image from 'next/image';

export const useDropProps = (dropIcon, dropDate, dropImageSrc) => {
  const { isMinDesktop } = useThemeQueries();
  let dropContent;
  let dropHeight = 32;
  if (dropIcon) {
    dropHeight = !isMinDesktop ? 45 : 64;
    dropContent = dropIcon;
  }
  if (dropDate) {
    dropHeight = 96;
    dropContent = (
      <div className="text-center justify-center">
        <div className="text-3xl font-bold">{dayjs(dropDate).format('D')}</div>
        <div className="text-large uppercase">{dayjs(dropDate).format('MMM')}</div>
      </div>
    );
  }
  if (dropImageSrc) {
    dropHeight = !isMinDesktop ? 96 : 140;
    dropContent = <Image className="min-h-full" width={dropHeight} height={dropHeight} src={dropImageSrc} alt={''} />;
  }
  return { dropContent, dropHeight };
};

export const Drop: React.FC<{
  className?: string;
  dropLeft?: boolean;
  dropRight?: boolean;
  dropIcon?: React.ReactNode;
  dropDate?: React.ReactNode;
  dropImageSrc?: React.ReactNode;
  setSize?: boolean;
  dropHeight?: number;
  dropContent?: React.ReactNode;
  topStyle?: string;
}> = ({
  className = '',
  dropIcon,
  dropDate,
  dropImageSrc,
  setSize,
  dropLeft,
  dropRight,
  dropHeight,
  dropContent,
  topStyle,
}) => {
  const { dropContent: _dropContent, dropHeight: _dropHeight } = useDropProps(dropIcon, dropDate, dropImageSrc);

  let dropDirectionClass = 'drop-right';
  dropDirectionClass = dropLeft ? 'drop-left' : dropDirectionClass;
  dropDirectionClass = dropRight ? 'drop-right' : dropDirectionClass;

  return (
    <div
      style={
        setSize ?
          {
            height: dropHeight ? dropHeight + 'px' : _dropHeight + 'px',
            width: dropHeight ? dropHeight + 'px' : _dropHeight + 'px',
            top: topStyle ? topStyle + 'px' : 'initial',
          }
        : {}
      }
      className={`drop-card-drop ${className} ${dropDirectionClass} ${
        dropContent ? 'absolute mx-auto' : 'block'
      } min-w-[4.8rem] min-h-[4.8rem] overflow-hidden shadow-md bg-white inline-flex flex-grow-0 items-center justify-center border-2 border-border-color`}
    >
      {dropContent ? dropContent : _dropContent}
    </div>
  );
};

export default Drop;
