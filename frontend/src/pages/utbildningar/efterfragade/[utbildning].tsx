import Efterfragade, { EfterfragadeProps } from '@layouts/page-layout/efterfragade';
import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import _ from 'lodash';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/utbildningar', res);
  const employerPromotionsProps = {
    props: { employerPromotionsBlock: pageProps?.props?.pageData?.employerPromotionsBlock?.pop() },
  };
  return await _.merge(layoutProps, employerPromotionsProps);
}

export const Index: React.FC = (props: EfterfragadeProps) => {
  return <Efterfragade {...props} />;
};

export default Index;
