import { EducationsController } from '@/controllers/educations.controller';
import DataResponse from '@/interfaces/dataResponse.interface';
import { PageResponse } from '@/interfaces/educations.interface';
import prisma from '@/utils/prisma';
import dayjs from 'dayjs';
import { Controller, Get, QueryParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class PageController {
  @Get('/page')
  @OpenAPI({ summary: 'Return page data' })
  async getPageData(@QueryParam('url') url: string): Promise<DataResponse<PageResponse>> {
    const page = await prisma.page.findUnique({
      include: {
        promotionsBlock: {
          include: {
            promotions: {
              include: {
                promotedPage: true,
              },
            },
          },
        },
        employerPromotionsBlock: {
          include: {
            employerPromotions: true,
          },
        },
        mapBlock: true,
        importantDatesBlock: {
          include: {
            dateCards: true,
          },
        },
        faqBlock: {
          include: {
            questions: true,
          },
        },
        contactFormBlock: {
          include: {
            emails: true,
          },
        },
        logosBlock: {
          include: {
            logos: true,
          },
        },
        tableBlock: {
          include: {
            rows: {
              include: {
                cells: true,
              },
            },
            headers: true,
            cells: true,
          },
        },
      },
      where: {
        url: url ? url : '/',
      },
    });
    if (page?.showEducationsStartingBlock) {
      const educationApi = new EducationsController();
      const res = await educationApi.getEducationEvents({
        size: '6',
        sortFunction: 'start,asc',
        startDate: dayjs(new Date()).format('YYYY-MM-DD'),
      });
      (page as PageResponse).educationsStartingBlock = res.data;
    }
    if (page?.importantDatesBlock) {
      page.importantDatesBlock = await Promise.all(
        page.importantDatesBlock.map(async block => {
          // if Referencing another importantDatesBlockCards
          let referenceBlock;
          if (block.referencedImportantDatesBlockPageName) {
            referenceBlock = await prisma.importantDatesBlock.findFirst({
              where: {
                pageName: block.referencedImportantDatesBlockPageName,
              },
              include: {
                dateCards: true,
              },
            });
          }

          return {
            ...block,
            dateCards: [...(referenceBlock ?? block).dateCards].sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()),
          };
        }),
      );
    }

    if (!page) {
      return this.getPageData('/404');
    }

    return { data: page, message: 'success' };
  }

  @Get('/pages')
  @OpenAPI({ summary: 'Return pages' })
  async getPages(): Promise<any> {
    const pages = await prisma.page.findMany();

    const data = pages.map(page => {
      return {
        url: page.url,
        title: page.title,
      };
    });

    return { data: data, message: 'success' };
  }
}
