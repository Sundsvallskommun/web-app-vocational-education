import { PageProps } from '@interfaces/admin-data';
import StandardPage from '@layouts/page-layout/standard-page.component';
import { getStandardPageProps } from '@utils/page-types';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Start: React.FC = (props: PageProps) => {
  return <StandardPage {...props} />;
};

export default Start;
