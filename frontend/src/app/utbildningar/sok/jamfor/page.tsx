import { Compare } from '@layouts/page-layout/jamfor-page.component';
import { appName } from '@utils/app-name';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';

export async function generateMetadata() {
  return {
    title: `${urlSegmentToLabel('jamfor')} - ${appName()}`,
  };
}

export default async function Page() {
  const props = await getStandardPageProps('/utbildningar/sok/jamfor');
  return <Compare {...props} />;
}
