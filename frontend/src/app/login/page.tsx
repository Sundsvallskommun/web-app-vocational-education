import { getStandardPageProps } from '@utils/page-types';
import { Login } from '@layouts/page-layout/login-page.component';
import { urlSegmentToLabel } from '@utils/url';
import { appName } from '@utils/app-name';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: `${urlSegmentToLabel('login')} - ${appName()}`,
  };
}

export default async function Page() {
  const props = await getStandardPageProps('/login');
  return <Login {...props} />;
}
