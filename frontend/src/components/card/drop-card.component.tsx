import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import Drop from '@components/drop/drop.component';
import { cx } from '@sk-web-gui/react';
import { useDropProps } from '@components/drop/use-drop.component';

export interface DropCard {
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  href?: string;
  dropIcon?: React.ReactNode;
  dropDate?: Date;
  dropImageSrc?: string;
  className?: string;
  classNameCard?: string;
  footer?: React.ReactNode;
  dropClassName?: string;
  allCardClickable?: boolean;
  onClick?: () => void;
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
  dropClassName = '',
  allCardClickable = toolbar ? false : true,
  onClick,
  ...rest
}) => {
  const { dropContent, dropHeight } = useDropProps(dropIcon, dropDate, dropImageSrc);

  const CardComp = allCardClickable && href ? NextLink : 'div';
  const ContentComp = !allCardClickable ? NextLink : 'div';

  return (
    <CardComp
      href={allCardClickable && href ? href : ''}
      onClick={allCardClickable ? onClick : undefined}
      className={`${className} drop-card-wrapper box-content flex flex-col group`}
      style={{ paddingTop: dropHeight / 2 + 'px' }}
      {...rest}
    >
      <div className={cx('drop-card', classNameCard)}>
        <Drop
          setSize
          dropHeight={dropHeight}
          dropContent={dropContent}
          topStyle={'-' + dropHeight / 2}
          className={dropClassName}
        />
        <div className={cx(`drop-card-container`, toolbar && 'flex-col-reverse')}>
          <ContentComp
            href={!allCardClickable && href ? href : ''}
            className="drop-card-container-inner"
            onClick={!allCardClickable ? onClick : undefined}
          >
            {!toolbar && <div style={{ paddingTop: dropHeight / 2 + 'px' }} className="pb-[1.5rem]"></div>}
            <div className="drop-card-text">{children}</div>
            {footer && (
              <div className="drop-card-footer-container">
                {footer && <div className="drop-card-footer">{footer ? footer : ''}</div>}
              </div>
            )}
            <div className="drop-card-arrow">
              <ArrowForwardIcon className="drop-card-arrow-icon" />
            </div>
          </ContentComp>
          {toolbar && <div className="drop-card-toolbar">{toolbar}</div>}
        </div>
      </div>
    </CardComp>
  );
};

export default DropCard;
