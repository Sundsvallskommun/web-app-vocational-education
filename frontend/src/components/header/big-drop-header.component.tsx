import { usePlaceholderImg } from '@utils/use-placeholder-image.hook';
import Image from 'next/image';
import React from 'react';

interface BigDropHeaderProps {
  imageSrc?: string;
  imageAlt?: string;
  children: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  imageDivClassName?: string;
}

export const BigDropHeader: React.FC<BigDropHeaderProps> = ({
  imageSrc,
  imageAlt,
  children,
  breadcrumbs,
  imageDivClassName,
}) => {
  const _imageSrc = usePlaceholderImg(imageSrc);
  return (
    <div className="lg:flex">
      {imageSrc && (
        <div
          className={`mx-auto ${imageDivClassName} ${
            React.Children.count(children) > 1 ?
              'max-w-[380px] lg:w-[380px] lg:h-[380px]'
            : 'max-w-[412px] lg:w-[412px] lg:h-[412px]'
          } order-2 relative mb-[38px] lg:mb-0`}
        >
          <Image
            priority
            className="next-img drop-right !h-full"
            fill
            sizes="(max-width: 768px) 100vw"
            src={`${_imageSrc}`}
            alt={`${imageAlt}`}
            aria-hidden="true"
          />
        </div>
      )}
      <div className={`flex-grow flex flex-col ${breadcrumbs ? 'lg:mt-xl' : 'lg:mt-2xl'} lg:pr-xl`}>
        {breadcrumbs && <div>{breadcrumbs}</div>}

        <div
          className={`h-full flex-grow flex flex-col max-w-[720px] [&>.ingress]:hyphens-auto ${
            React.Children.count(children) > 1 ? 'justify-start' : 'justify-center mt-[7rem]'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
