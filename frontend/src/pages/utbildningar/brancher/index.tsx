import StandardPage from '@components/page-types/standard-page.component';
import { PageProps } from '@interfaces/admin-data';
import { getStandardPageProps } from '@utils/page-types';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Index: React.FC = (props: PageProps) => {
  return <StandardPage {...props} />;
};

export default Index;
