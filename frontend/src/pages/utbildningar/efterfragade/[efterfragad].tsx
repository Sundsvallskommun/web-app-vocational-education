import Efterfragade, { EfterfragadeProps } from '@layouts/page-layout/efterfragade';
import { getBlock } from '@services/block-service';
import { getLayout } from '@services/layout-service';
import _ from 'lodash';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const blockData = await getBlock('employerPromotionsBlock');
  return await _.merge(layoutProps, blockData);
}

export const Index: React.FC = (props: EfterfragadeProps) => {
  return <Efterfragade {...props} />;
};

export default Index;
