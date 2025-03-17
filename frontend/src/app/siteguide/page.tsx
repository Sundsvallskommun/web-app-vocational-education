import SiteMap from '@layouts/page-layout/siteguide-page.component';
import { getLayout } from '@services/layout-service';
import { appName } from '@utils/app-name';
import { getPages } from '@utils/file-tree';
import { urlSegmentToLabel } from '@utils/url';
import path from 'path';

export async function generateMetadata() {
  return {
    title: `${urlSegmentToLabel('siteguide')} - ${appName()}`,
  };
}

export default async function Page() {
  const pages: string[] = await getPages(path.join('src', 'app'));
  const { layoutData } = await getLayout();
  const props = {
    pages,
    layoutData,
  };
  return <SiteMap {...props} />;
}
