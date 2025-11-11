import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { appURL } from '@utils/app-url';
import { merge } from 'lodash';

export async function getStandardPageProps(pathname: string) {
  const layoutProps = await getLayout();
  const location = new URL(appURL(pathname));
  const pathWithoutBasePath = location.pathname.replace(new RegExp(`^${process.env.BASE_PATH}`), '') || '/';
  const pageProps = await getPage(pathname ?? pathWithoutBasePath);
  return merge(layoutProps, pageProps);
}

export function getBlockData<TBlock = unknown>(block?: TBlock[]): TBlock | undefined {
  return block ? block[0] : undefined;
}
