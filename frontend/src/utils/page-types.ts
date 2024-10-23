import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { merge } from 'lodash';

export async function getStandardPageProps(context) {
  const layoutProps = await getLayout(context.res);
  const pageProps = await getPage(context.resolvedUrl, context.res);
  return await merge(layoutProps, pageProps);
}
