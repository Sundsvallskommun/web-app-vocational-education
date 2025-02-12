import { useThemeQueries } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

export const useDropProps = (dropIcon: React.ReactNode, dropDate?: Date, dropImageSrc?: string | StaticImport) => {
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
      <div className="drop-date-content text-center justify-center">
        <div className="drop-date-content-day text-3xl font-bold">{dayjs(dropDate).format('D')}</div>
        <div className="drop-date-content-month text-large uppercase">{dayjs(dropDate).format('MMM')}</div>
      </div>
    );
  }
  if (dropImageSrc) {
    dropHeight = !isMinDesktop ? 96 : 140;
    dropContent = <Image className="min-h-full" width={dropHeight} height={dropHeight} src={dropImageSrc} alt={''} />;
  }
  return { dropContent, dropHeight };
};
