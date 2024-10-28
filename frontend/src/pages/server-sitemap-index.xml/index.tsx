import {
  emptyEducationFilterOptions,
  getEducationEvents,
  GetEducationEvents,
} from '@services/education-service/education-service';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import path from 'path';
import { getBlock } from '@services/block-service';
import { EmployerPromotionsBlock, EmployerPromotionsBlockPromotions } from '@interfaces/admin-data';
import dayjs from 'dayjs';
import { appURL, routeDynamicSlugFormat } from '@utils/app-url';
import { getPages } from '@utils/file-tree';

interface GenerateSiteMapProps {
  pages: string[];
  dynamic: {
    '/utbildningar/[utbildning]': GetEducationEvents['courses'];
    '/utbildningar/efterfragade/[efterfragad]': EmployerPromotionsBlockPromotions[];
  };
}

async function generateSiteMapFields({ pages, dynamic }: GenerateSiteMapProps): Promise<ISitemapField[]> {
  return [
    ...pages.map((page) => {
      const route = page === '' ? '/' : page;
      return { loc: appURL(route), lastmod: new Date().toISOString() };
    }),
    ...dynamic['/utbildningar/[utbildning]'].map((utbildning) => {
      return {
        loc: appURL(
          `/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: utbildning })}`
        ),
        lastmod: new Date().toISOString(),
      };
    }),
    ...dynamic['/utbildningar/efterfragade/[efterfragad]'].map((efterfragad) => {
      return {
        loc: appURL(
          `/utbildningar/efterfragade/${routeDynamicSlugFormat({ slug: '/utbildningar/efterfragade/[efterfragad]', data: efterfragad })}`
        ),
        lastmod: new Date().toISOString(),
      };
    }),
  ];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages: string[] = (await getPages(path.join('src', 'pages'))).filter((x) => !x.includes('['));

  const dynamic: GenerateSiteMapProps['dynamic'] = {
    '/utbildningar/[utbildning]':
      (
        await getEducationEvents({
          ...emptyEducationFilterOptions,
          size: 2000, // api-limit is 2000, current entries in db ~42000
          startDate: dayjs(new Date()).format('YYYY-MM-DD'),
          latestApplicationDate: dayjs(new Date()).add(12, 'month').format('YYYY-MM-DD'),
          sortFunction: 'startDate,asc',
        })
      ).courses ?? [],
    '/utbildningar/efterfragade/[efterfragad]':
      (await getBlock<EmployerPromotionsBlock>('employerPromotionsBlock')).props?.employerPromotionsBlock
        ?.employerPromotions ?? [],
  };

  const sitemapFields: ISitemapField[] = await generateSiteMapFields({ pages, dynamic });

  return getServerSideSitemapLegacy(ctx, sitemapFields);
};

export default function Sitemap() {}
