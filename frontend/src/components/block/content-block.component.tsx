import { cx } from '@sk-web-gui/utils';

export const ContentBlock: React.FC<{
  children?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  classNameContent?: string;
  padded?: boolean;
}> = ({ children, className = '', classNameWrapper = '', classNameContent = '', padded = false }) => {
  return (
    <div className={cx('content-block', classNameWrapper, { padded: padded })}>
      <div className={cx('content-block-container', className)}>
        <div className={cx('content-block-content', classNameContent)}>{children}</div>
      </div>
    </div>
  );
};

export default ContentBlock;
