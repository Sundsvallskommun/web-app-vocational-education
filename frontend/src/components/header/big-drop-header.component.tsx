'use client';

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
    <div className="desktop:flex">
      {imageSrc && (
        <div
          className={`mx-auto ${imageDivClassName} ${
            React.Children.count(children) > 1 ?
              'max-w-[380px] desktop:w-[380px] desktop:h-[380px]'
            : 'max-w-[412px] desktop:w-[412px] desktop:h-[412px]'
          } order-2 relative mb-[38px] desktop:mb-0`}
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
      <div className={`flex-grow flex flex-col ${breadcrumbs ? 'desktop:mt-xl' : 'desktop:mt-2xl'} desktop:pr-xl`}>
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
