import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import Drop, { useDropProps } from '@components/drop/drop.component';
import { cx } from '@sk-web-gui/react';

export interface DropCard {
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  href?;
  dropIcon?;
  dropDate?;
  dropImageSrc?;
  className?;
  classNameCard?;
  footer?;
  textFade?;
  dropClassName?;
  loadMoreColorClass?;
  allCardClickable?: boolean;
}

export const DropCard: React.FC<DropCard> = ({
  children,
  toolbar,
  href = '',
  dropIcon,
  dropDate,
  dropImageSrc,
  className = '',
  classNameCard = '',
  footer,
  textFade = true,
  dropClassName = '',
  loadMoreColorClass = 'text-white',
  allCardClickable = toolbar ? false : true,
}) => {
  const { dropContent, dropHeight } = useDropProps(dropIcon, dropDate, dropImageSrc);

  const CardComp = allCardClickable ? NextLink : 'div';
  const ContentComp = !allCardClickable ? NextLink : 'div';

  return (
    <CardComp
      href={href}
      className={`${className} drop-card-wrapper box-content flex flex-col group`}
      style={{ paddingTop: dropHeight / 2 + 'px' }}
    >
      <div
        className={`${classNameCard} drop-card max-h-[inherit] group-hover:shadow-md bg-white relative h-full flex flex-grow w-full justify-center border-[2px] border-border-color rounded`}
      >
        <Drop
          setSize
          dropHeight={dropHeight}
          dropContent={dropContent}
          topStyle={'-' + dropHeight / 2}
          className={dropClassName}
        />
        <div
          className={cx(
            `drop-card-container w-full relative overflow-hidden rounded-b-[15px] flex flex-col`,
            toolbar && 'flex-col-reverse'
          )}
        >
          <ContentComp href={href} className="flex">
            <div
              className={cx(
                'drop-card-text px-[15px] pb-[15px] md:px-lg md:pb-lg [&_h2]:break-word [&_h3]:break-word [&_h2]:text-green [&_h3]:text-green group-hover:[&_h2]:underline group-hover:[&_h3]:underline [&_p]:leading-[1.8] [&_ul]:mt-[1rem] [&_ul_li]:text-sm',
                !toolbar && 'pt-md'
              )}
              style={!toolbar ? { marginTop: dropHeight / 2 + 'px' } : undefined}
            >
              {children}
            </div>
            {(footer || textFade) && (
              <div
                className={`drop-card-footer-container absolute w-full bottom-0 pt-md pb-[15px] pl-[15px] md:pb-lg md:pl-lg pr-[55px] bg-white rounded-b-[15px] ${
                  textFade ? `shadow-top ${loadMoreColorClass}` : ''
                }`}
              >
                <div className="drop-card-footer flex items-center gap-sm text-label text-sm">
                  {footer ? footer : ''}
                </div>
              </div>
            )}
            <div className="drop-card-arrow w-[50px] h-[50px] md:w-[60px] md:h-[60px] p-[12px] absolute flex justify-end rounded-tl-full items-end text-green bg-green-light right-0 bottom-0">
              <ArrowForwardIcon className="material-icon !text-xl md:!text-2xl" />
            </div>
          </ContentComp>
          {toolbar && <div className="drop-card-toolbar px-sm pt-sm flex justify-end">{toolbar}</div>}
        </div>
      </div>
    </CardComp>
  );
};

export default DropCard;
