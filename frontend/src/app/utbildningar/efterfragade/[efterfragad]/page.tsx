import { EmployerPromotionsBlock, EmployerPromotionsBlockPromotions } from '@interfaces/admin-data';
import Efterfragade from '@layouts/page-layout/utbildningar-efterfragade-efterfragad';
import { getBlock } from '@services/block-service';
import { appName } from '@utils/app-name';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';

export async function generateMetadata({ params }: { params: Promise<{ efterfragad: string }> }) {
  const { efterfragad } = await params;
  const routeSlug = '/utbildningar/efterfragade/[efterfragad]';
  const title = routeDynamicSlugFormatExtract({
    slug: routeSlug,
    formattedString: efterfragad,
  }).title;
  return {
    title: `${title} - ${urlSegmentToLabel('utbildningar')} - ${appName()}`,
  };
}

async function getPageProps(efterfragad: string) {
  const routeSlug = '/utbildningar/efterfragade/[efterfragad]';
  const educationTitle = routeDynamicSlugFormatExtract({
    slug: routeSlug,
    formattedString: efterfragad,
  }).title;
  const blockData = await getBlock<EmployerPromotionsBlock>('employerPromotionsBlock');
  const educationData = blockData?.props?.employerPromotionsBlock?.employerPromotions.find(
    (x) => x.title === educationTitle
  );
  return {
    ...(await getStandardPageProps(routeSlug)),
    educationData: educationData,
    routeSlug: routeSlug,
  };
}

export default async function Page({ params }: { params: Promise<{ efterfragad: string }> }) {
  const ctx = await params;
  const { efterfragad } = ctx;
  const props = await getPageProps(efterfragad);
  if (!props || props.pageData === undefined || props.layoutData === undefined || !props.educationData) {
    return null;
  }
  return (
    <Efterfragade
      {...props}
      pageData={props.pageData}
      educationData={props.educationData as EmployerPromotionsBlockPromotions}
      layoutData={props.layoutData}
    />
  );
}
