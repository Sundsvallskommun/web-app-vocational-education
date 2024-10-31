import Efterfragade, { EfterfragadeProps } from '@layouts/page-layout/efterfragade';
import { getBlock } from '@services/block-service';
import { getStandardPageProps } from '@utils/page-types';
import { merge } from 'lodash';

export async function getServerSideProps(context) {
  const blockData = await getBlock('employerPromotionsBlock');
  return merge(await getStandardPageProps(context), blockData);
}

export const Index: React.FC = (props: EfterfragadeProps) => {
  return <Efterfragade {...props} />;
};

export default Index;
