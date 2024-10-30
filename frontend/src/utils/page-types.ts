import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { appURL } from '@utils/app-url';
import { merge } from 'lodash';

export async function getStandardPageProps(context) {
  const layoutProps = await getLayout(context.res);
  const location = new URL(appURL(context.resolvedUrl));
  const pageProps = await getPage(location.pathname, context.res);
  return merge(layoutProps, pageProps);
}
