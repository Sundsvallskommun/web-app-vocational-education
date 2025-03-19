import { LayoutDataResponse, PageDataResponse } from '@interfaces/admin-data';
import StandardPage from '@layouts/page-layout/standard-page.component';
import { appName } from '@utils/app-name';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ url: string[] }> }) {
  const { url } = await params;
  return {
    title: `${url ? url?.map((segment: string) => urlSegmentToLabel(segment)).join(' - ') : 'Startsida'} - ${appName()}`,
  };
}

async function getPageProps(pathname: string) {
  const paramsUrl = Array.isArray(pathname) ? pathname.join('/') : pathname;
  const path = paramsUrl ? `/${paramsUrl}` : '/';
  const props: LayoutDataResponse & PageDataResponse = await getStandardPageProps(path);
  return props;
}

export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  const ctx = await params;
  const { url } = ctx;
  const props: LayoutDataResponse & PageDataResponse = await getPageProps(url);
  if (!props || props.pageData === undefined || props.layoutData === undefined) {
    return null;
  }

  return <StandardPage {...props} pageData={props.pageData} layoutData={props.layoutData} />;
}
