import { PageProps } from '@interfaces/admin-data';
import StandardPage from '@layouts/page-layout/standard-page.component';
import { getStandardPageProps } from '@utils/page-types';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getStandardPageProps(context);
}

export const Start = (props: PageProps) => {
  return <StandardPage {...props} />;
};

export default Start;
