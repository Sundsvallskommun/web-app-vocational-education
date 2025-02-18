import { mockControllerMiddleware } from '@/controller-mocks/middlewares/mock.middleware';
import { pageMocks } from '@/controller-mocks/page.mock';
import { EducationsController } from '@/controllers/educations.controller';
import DataResponse from '@/interfaces/dataResponse.interface';
import { PageResponse } from '@/interfaces/educations.interface';
import cs from '@/services/controller.service';
import dayjs from 'dayjs';
import { Controller, Get, QueryParam, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
@UseBefore(mockControllerMiddleware(pageMocks, { cs: cs }))
export class PageController {
  @Get('/page')
  @OpenAPI({ summary: 'Return page data' })
  async getPageData(@QueryParam('url') url: string): Promise<DataResponse<PageResponse>> {
    const page = await cs.prisma.page.findUnique({
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
          let referenceBlockPage;
          if (block.referencedImportantDatesBlockPageName) {
            referenceBlockPage = await cs.prisma.page.findUnique({
              include: {
                importantDatesBlock: {
                  include: {
                    dateCards: true,
                  },
                },
              },
              where: {
                pageName: block.referencedImportantDatesBlockPageName,
              },
            });
          }

          return {
            ...block,
            referencedImportantDatesBlockPageUrl: referenceBlockPage?.url ?? page.url,
            dateCards: [...(referenceBlockPage?.importantDatesBlock[0] ?? block).dateCards].sort(
              (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
            ),
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
    const pages = await cs.prisma.page.findMany();

    const data = pages.map(page => {
      return {
        url: page.url,
        title: page.title,
      };
    });

    return { data: data, message: 'success' };
  }
}
