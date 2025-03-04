import Utbildningsanordnare from '@layouts/page-layout/utbildningsanordnare-page.component';
import { appName } from '@utils/app-name';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';

export async function generateMetadata() {
  return {
    title: `${urlSegmentToLabel('utbildningsanordnare')} - ${appName()}`,
  };
}

export default async function Page() {
  const props = await getStandardPageProps('/utbildningsanordnare');
  return <Utbildningsanordnare {...props} />;
}
