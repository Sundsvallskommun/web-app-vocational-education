import {
  EmployerPromotionsBlock,
  EmployerPromotionsBlockPromotions,
  LayoutData,
  PageData,
} from '@interfaces/admin-data';
import { Course } from '@interfaces/education';
import StandardPage from '@layouts/page-layout/standard-page.component';
import Efterfragade from '@layouts/page-layout/utbildningar-efterfragade-efterfragad';
import Utbildning from '@layouts/page-layout/utbildningar-utbildning.component';
import { getBlock } from '@services/block-service';
import { getEducationEvent, getEducationEvents } from '@services/education-service/education-service';
import { LayoutResponse } from '@services/layout-service';
import { PageResponse } from '@services/page-service';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import { getStandardPageProps } from '@utils/page-types';
import dayjs from 'dayjs';
import { GetServerSidePropsContext } from 'next';

type UrlProps =
  | (LayoutResponse & PageResponse)
  | {
      props: {
        educationData: Course | null | undefined;
        relatedEducationData: Course[] | null;
        routeSlug: string;
        layoutData?: LayoutData | undefined;
        pageData?: PageData;
      };
    }
  | {
      props: {
        educationData: EmployerPromotionsBlockPromotions | undefined;
        routeSlug: string;
        layoutData?: LayoutData | undefined;
        pageData?: PageData;
      };
    };

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<UrlProps> {
  const path = context.resolvedUrl;

  if (/^\/utbildningar\/\d+-\w+/.test(path)) {
    const routeSlug = '/utbildningar/[utbildning]';
    const id = routeDynamicSlugFormatExtract({
      slug: routeSlug,
      formattedString: context.params?.url ? context.params?.url[context.params.url.length - 1] : '',
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
      formattedString: context.params?.url ? context.params?.url[context.params.url.length - 1] : '',
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

export const Index = (props: UrlProps['props']) => {
  if (!props || props.pageData === undefined || props.layoutData === undefined) {
    return null;
  }
  const routeSlug = 'routeSlug' in props ? props.routeSlug : undefined;

  if (routeSlug === '/utbildningar/[utbildning]') {
    return 'educationData' in props && props.educationData && 'relatedEducationData' in props ?
        <Utbildning
          {...props}
          pageData={props.pageData}
          educationData={props.educationData}
          relatedEducationData={props.relatedEducationData ?? null}
          layoutData={props.layoutData}
        />
      : null;
  } else if (routeSlug === '/utbildningar/efterfragade/[efterfragad]') {
    return 'educationData' in props && typeof props.educationData !== 'undefined' ?
        <Efterfragade
          {...props}
          pageData={props.pageData}
          educationData={props.educationData as EmployerPromotionsBlockPromotions}
          layoutData={props.layoutData}
        />
      : null;
  } else {
    return props.pageData && props.layoutData ?
        <StandardPage {...props} pageData={props.pageData} layoutData={props.layoutData} />
      : null;
  }
};

export default Index;
