import { cx } from '@sk-web-gui/utils';

export interface ContentBlockProps {
  children?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  classNameContent?: string;
  padded?: boolean;
  fitHeight?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  children,
  className = '',
  classNameWrapper = '',
  classNameContent = '',
  padded = false,
  fitHeight = false,
}) => {
  return (
    <div
      className={cx('content-block', classNameWrapper, { padded: padded })}
      data-fitheight={padded || fitHeight ? 'true' : undefined}
    >
      <div className={cx('content-block-container', className)}>
        <div className={cx('content-block-content', classNameContent)}>{children}</div>
      </div>
    </div>
  );
};

export default ContentBlock;
