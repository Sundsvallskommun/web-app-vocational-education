import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useDropProps } from './use-drop.component';

export const Drop: React.FC<{
  className?: string;
  dropLeft?: boolean;
  dropRight?: boolean;
  dropIcon?: React.ReactNode;
  dropDate?: Date;
  dropImageSrc?: string | StaticImport;
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
            minHeight: dropHeight ? dropHeight + 'px' : _dropHeight + 'px',
            width: dropHeight ? dropHeight + 'px' : _dropHeight + 'px',
            minWidth: dropHeight ? dropHeight + 'px' : _dropHeight + 'px',
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
