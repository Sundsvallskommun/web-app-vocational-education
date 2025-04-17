import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { cx, useThemeQueries } from '@sk-web-gui/react';
import { usePlaceholderImg } from '@utils/use-placeholder-image.hook';
import Image from 'next/image';
import NextLink from 'next/link';
import DropCard from './drop-card.component';

export const BigDropCard: React.FC<DropCard> = ({ className = '', children, href = '#', dropImageSrc, ...rest }) => {
  const imageSrc = usePlaceholderImg(dropImageSrc);
  const { isDevice } = useThemeQueries();

  return (
    <>
      {isDevice ?
        <NextLink href={href} className="flex">
          <div className={`${className} flex w-full max-h-[124px]  overflow-hidden`}>
            <div className="min-w-[124px] w-[124px] overflow-hidden relative rounded-bl-half border-[2px] border-r-0 border-border-color">
              <Image
                className="next-img drop-left !w-[120px]"
                fill
                objectFit="cover"
                objectPosition="top left"
                sizes="33vw"
                src={`${imageSrc}`}
                alt={''}
                aria-hidden="true"
              />
            </div>
            <div className="flex-grow flex overflow-hidden items-center relative border-[2px] rounded-r-[15px] border-l-0 border-border-color">
              <div
                style={{ hyphens: 'auto' }}
                className="flex-grow text-green pl-lg pr-lg [&>p]:hidden [&>*]:m-0 [&>*]:overflow-anywhere"
              >
                {children}
              </div>
              <div className="w-[40px] h-[40px] flex justify-end rounded-tl-full items-end text-green bg-green-light p-sm absolute right-0 bottom-0">
                <ArrowForwardIcon className="material-icon" />
              </div>
            </div>
          </div>
        </NextLink>
      : <DropCard
          className={cx(`h-[210px] desktop:h-[323px]`, className)}
          dropClassName="!border-0"
          dropImageSrc={`${imageSrc}`}
          href={href}
          {...rest}
        >
          {children}
        </DropCard>
      }
    </>
  );
};

export default BigDropCard;
