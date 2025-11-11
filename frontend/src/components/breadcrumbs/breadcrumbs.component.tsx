'use client';

import { Breadcrumb } from '@sk-web-gui/react';
import { urlSegmentToLabel } from '@utils/url';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = ({ lastItemTitle }: { lastItemTitle?: string }) => {
  const pathname = usePathname();
  const pathWithoutBasePath = pathname.replace(new RegExp(`^${process.env.NEXT_PUBLIC_BASE_PATH}`), '') || '/';
  const pathSegments = pathWithoutBasePath.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
      <Breadcrumb.Item>
        <Breadcrumb.Link as={NextLink} href="/">
          Start
        </Breadcrumb.Link>
      </Breadcrumb.Item>

      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        return (
          <Breadcrumb.Item key={href}>
            <NextLink href={href} passHref legacyBehavior>
              <Breadcrumb.Link href={href} currentPage={isLast}>
                {isLast ? (lastItemTitle ?? urlSegmentToLabel(segment)) : urlSegmentToLabel(segment)}
              </Breadcrumb.Link>
            </NextLink>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
