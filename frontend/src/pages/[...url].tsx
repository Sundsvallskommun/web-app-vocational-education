import { EmployerPromotionsBlock } from '@interfaces/admin-data';
import StandardPage from '@layouts/page-layout/standard-page.component';
import Efterfragade from '@layouts/page-layout/utbildningar-efterfragade-efterfragad';
import Utbildning from '@layouts/page-layout/utbildningar-utbildning.component';
import { getBlock } from '@services/block-service';
import { getEducationEvent, getEducationEvents } from '@services/education-service/education-service';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import { getStandardPageProps } from '@utils/page-types';
import dayjs from 'dayjs';

export async function getServerSideProps(context) {
  const path = context.resolvedUrl;

  if (/^\/utbildningar\/\d+-\w+/.test(path)) {
    const routeSlug = '/utbildningar/[utbildning]';
    const id = routeDynamicSlugFormatExtract({
      slug: routeSlug,
      formattedString: context.params.url[context.params.url.length - 1],
    }).id;
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
      props: {
        ...(await getStandardPageProps(context, { pathname: routeSlug })).props,
        educationData: !educationEventRes.error ? educationEventRes.data : null,
        relatedEducationData:
          relatedEducationEventRes && !relatedEducationEventRes.error ? relatedEducationEventRes.courses : null,
        routeSlug: routeSlug,
      },
    };
  } else if (/^\/utbildningar\/efterfragade\/\w+/.test(path)) {
    const routeSlug = '/utbildningar/efterfragade/[efterfragad]';
    const educationTitle = routeDynamicSlugFormatExtract({
      slug: routeSlug,
      formattedString: context.params.url[context.params.url.length - 1],
    }).title;
    const blockData = await getBlock<EmployerPromotionsBlock>('employerPromotionsBlock');
    const educationData = blockData?.props?.employerPromotionsBlock?.employerPromotions.find(
      (x) => x.title === educationTitle
    );
    return {
      props: {
        ...(await getStandardPageProps(context, { pathname: routeSlug })).props,
        educationData: educationData,
        routeSlug: routeSlug,
      },
    };
  }

  return await getStandardPageProps(context); // Return standard props if no match
}

export const Index = (props) => {
  const { routeSlug } = props;

  if (routeSlug === '/utbildningar/[utbildning]') {
    return <Utbildning {...props} />;
  } else if (routeSlug === '/utbildningar/efterfragade/[efterfragad]') {
    return <Efterfragade {...props} />;
  } else {
    return <StandardPage {...props} />;
  }
};

export default Index;
