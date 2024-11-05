import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { appURL } from '@utils/app-url';
import { merge } from 'lodash';

export async function getStandardPageProps(context, options?: { pathname: string }) {
  const layoutProps = await getLayout(context.res);
  const location = new URL(appURL(context.resolvedUrl));
  const pathWithoutBasePath = location.pathname.replace(new RegExp(`^${process.env.BASE_PATH}`), '') || '/';
  const pageProps = await getPage(options?.pathname ?? pathWithoutBasePath, context.res);
  return merge(layoutProps, pageProps);
}

export function getBlockData(block) {
  return block ? block[0] : undefined;
}
