import { LayoutDataResponse, PageDataResponse } from '@interfaces/admin-data';
import StandardPage from '@layouts/page-layout/standard-page.component';
import { getAdminPages } from '@services/page-service';
import { appName } from '@utils/app-name';
import { getFilePages } from '@utils/file-tree';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';
import path from 'path';

export async function generateMetadata({ params }: { params: Promise<{ url: string[] }> }) {
  const { url } = await params;
  return {
    title: `${url ? url?.map((segment: string) => urlSegmentToLabel(segment)).join(' - ') : 'Startsida'} - ${appName()}`,
  };
}

export const generateStaticParams = async () => {
  const adminPages = (await getAdminPages()).map((x) => x.url);
  const pages = await getFilePages(path.join('src', 'app'));
  const routePages = adminPages.filter((x) => !pages.some((page) => page === x));
  return routePages.map((page) => ({
    url: [page],
  }));
};

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
