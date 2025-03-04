import { Sok } from '@layouts/page-layout/utbildningar-sok.component';
import { appName } from '@utils/app-name';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';

type MetaDataProps = {
  searchParams: Promise<{ q: string }>;
};

export async function generateMetadata({ searchParams }: MetaDataProps) {
  const { q } = await searchParams;
  return {
    title: `${q ? `${q} - ` : ''}${urlSegmentToLabel('sok')} - ${appName()}`,
  };
}

export default async function Page() {
  const props = await getStandardPageProps('/utbildningar/sok');
  return <Sok {...props} />;
}
