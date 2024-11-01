import { EmployerPromotionsBlock, EmployerPromotionsBlockPromotions } from '@interfaces/admin-data';
import { getBlock } from '@services/block-service';
import {
  emptyEducationFilterOptions,
  getEducationEvents,
  GetEducationEvents,
} from '@services/education-service/education-service';
import { appURL, routeDynamicSlugFormat } from '@utils/app-url';
import { getPages } from '@utils/file-tree';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import path from 'path';

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
      return {
        loc: appURL(page),
        changefreq: 'daily' as ISitemapField['changefreq'],
        priority: 0.7,
      };
    }),
    ...dynamic['/utbildningar/[utbildning]'].map((utbildning) => {
      return {
        loc: appURL(
          `/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: utbildning })}`
        ),
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as ISitemapField['changefreq'],
        priority: 0.7,
      };
    }),
    ...dynamic['/utbildningar/efterfragade/[efterfragad]'].map((efterfragad) => {
      return {
        loc: appURL(
          `/utbildningar/efterfragade/${routeDynamicSlugFormat({ slug: '/utbildningar/efterfragade/[efterfragad]', data: efterfragad })}`
        ),
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as ISitemapField['changefreq'],
        priority: 0.7,
      };
    }),
  ];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = (await getPages(path.join('src', 'pages'))).filter((x) => !x.includes('sitemap') && !x.includes('['));
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
