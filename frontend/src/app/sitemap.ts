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
import { MetadataRoute } from 'next';
import path from 'path';

interface GenerateSiteMapProps {
  pages: string[];
  dynamic: {
    '/utbildningar/[utbildning]': GetEducationEvents['courses'];
    '/utbildningar/efterfragade/[efterfragad]': EmployerPromotionsBlockPromotions[];
  };
}

async function generateSiteMapFields({ pages, dynamic }: GenerateSiteMapProps): Promise<MetadataRoute.Sitemap> {
  return [
    ...pages.map((page) => {
      return {
        url: appURL(page),
        changeFrequency: 'daily' as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: 0.7,
      };
    }),
    ...dynamic['/utbildningar/[utbildning]'].map((utbildning) => {
      return {
        url: appURL(
          `/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: utbildning })}`
        ),
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: 0.7,
      };
    }),
    ...dynamic['/utbildningar/efterfragade/[efterfragad]'].map((efterfragad) => {
      return {
        url: appURL(
          `/utbildningar/efterfragade/${routeDynamicSlugFormat({ slug: '/utbildningar/efterfragade/[efterfragad]', data: efterfragad })}`
        ),
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: 0.7,
      };
    }),
  ];
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const excludedPages = ['admin', 'sitemap', 'logout', '['];
  const pages = (await getPages(path.join('src', 'app'))).filter(
    (x) => !excludedPages.some((exclusion) => x.includes(exclusion))
  );
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

  const sitemapFields = await generateSiteMapFields({ pages, dynamic });
  return sitemapFields;
}
