import StandardPage from '@layouts/page-layout/standard-page.component';
import Utbildning from '@layouts/page-layout/utbildningar-utbildning.component';
import { getEducationEvent, getEducationEvents } from '@services/education-service/education-service';
import { appName } from '@utils/app-name';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import { getStandardPageProps } from '@utils/page-types';
import { urlSegmentToLabel } from '@utils/url';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';

export async function generateMetadata({ params }: { params: Promise<{ utbildning: string }> }) {
  const { utbildning } = await params;
  const routeSlug = '/utbildningar/[utbildning]';
  const { title } = routeDynamicSlugFormatExtract({
    slug: routeSlug,
    formattedString: utbildning,
  });
  return {
    title: `${title ? title : capitalize(utbildning)} - ${urlSegmentToLabel('utbildningar')} - ${appName()}`,
  };
}

async function getPageProps(utbildning: string) {
  const routeSlug = '/utbildningar/[utbildning]';
  const { id, title } = routeDynamicSlugFormatExtract({
    slug: routeSlug,
    formattedString: utbildning,
  });

  if (title && id !== undefined) {
    const educationEventRes = await getEducationEvent(id);
    const relatedEducationEventRes =
      educationEventRes.data?.category ?
        await getEducationEvents({
          category: [educationEventRes.data?.category],
          size: 3,
          latestApplicationDate: dayjs(new Date()).format('YYYY-MM-DD'),
        })
      : null;

    return {
      ...(await getStandardPageProps(routeSlug)),
      educationData: !educationEventRes.error ? educationEventRes.data : null,
      relatedEducationData:
        relatedEducationEventRes && !relatedEducationEventRes.error ? relatedEducationEventRes.courses : null,
      routeSlug: routeSlug,
    };
  } else {
    return await getStandardPageProps(`/utbildningar/${utbildning}`); // Return standard props if no match
  }
}

export default async function Page({ params }: { params: Promise<{ utbildning: string }> }) {
  const ctx = await params;
  const { utbildning } = ctx;
  const props = await getPageProps(utbildning);
  if (!props || props.pageData === undefined || props.layoutData === undefined) {
    return null;
  }

  if ('educationData' in props && props.educationData) {
    return (
      <Utbildning
        {...props}
        pageData={props.pageData}
        educationData={props.educationData}
        relatedEducationData={props.relatedEducationData ?? null}
        layoutData={props.layoutData}
      />
    );
  } else {
    return <StandardPage {...props} pageData={props.pageData} layoutData={props.layoutData} />;
  }
}
