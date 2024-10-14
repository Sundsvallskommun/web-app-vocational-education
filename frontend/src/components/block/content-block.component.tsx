import { cx } from '@sk-web-gui/utils';

export interface ContentBlockProps {
  children?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  classNameContent?: string;
  padded?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  children,
  className = '',
  classNameWrapper = '',
  classNameContent = '',
  padded = false,
}) => {
  return (
    <div className={cx('content-block', classNameWrapper, { padded: padded })}>
      <div className={cx('content-block-container', className)}>
        <div className={cx('content-block-content', classNameContent)}>{children}</div>
      </div>
    </div>
  );
};

export default ContentBlock;
