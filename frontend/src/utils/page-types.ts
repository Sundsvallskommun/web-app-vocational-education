import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { appURL } from '@utils/app-url';
import { merge } from 'lodash';

export async function getStandardPageProps(context) {
  const layoutProps = await getLayout(context.res);
  const location = new URL(appURL(context.resolvedUrl));

  let pathname = '';
  if (context.params) {
    const dynamicKey = Object.keys(context.params)[0];
    if (dynamicKey === 'url') {
      pathname = location.pathname;
    } else {
      const lastSlashIndex = location.pathname.lastIndexOf('/');
      const [path] = [location.pathname.slice(0, lastSlashIndex), location.pathname.slice(lastSlashIndex + 1)];
      pathname = `${path}/[${dynamicKey}]`;
    }
  } else {
    pathname = location.pathname;
  }

  const pageProps = await getPage(pathname, context.res);
  return merge(layoutProps, pageProps);
}

export function getBlockData(block) {
  return block ? block[0] : undefined;
}
