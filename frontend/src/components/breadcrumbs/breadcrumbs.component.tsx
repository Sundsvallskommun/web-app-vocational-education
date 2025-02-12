import { Breadcrumb } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const getSegmentString = (segment: string) => {
  segment = segment.toLowerCase();
  if (segment === 'arbetsgivare') return 'För arbetsgivare';
  if (segment === 'utbildningar') return 'För dig som söker utbildning';
  if (segment === 'utbildningsanordnare') return 'För dig som är utbildningsanordnare';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

const Breadcrumbs = ({ lastItemTitle }: { lastItemTitle?: string }) => {
  const router = useRouter();
  const location = new URL(appURL(router.asPath));
  const pathWithoutBasePath = location.pathname.replace(new RegExp(`^${process.env.NEXT_PUBLIC_BASE_PATH}`), '') || '/';
  const pathSegments = pathWithoutBasePath.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
      <Breadcrumb.Item>
        <NextLink href="/" passHref legacyBehavior>
          <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
        </NextLink>
      </Breadcrumb.Item>

      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        return (
          <Breadcrumb.Item key={href}>
            <NextLink href={href} passHref legacyBehavior>
              <Breadcrumb.Link href={href} currentPage={isLast}>
                {isLast ? (lastItemTitle ?? getSegmentString(segment)) : getSegmentString(segment)}
              </Breadcrumb.Link>
            </NextLink>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
