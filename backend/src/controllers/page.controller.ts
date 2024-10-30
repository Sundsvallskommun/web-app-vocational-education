import prisma from '@/utils/prisma';
import { Controller, Get, QueryParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class PageController {
  @Get('/page')
  @OpenAPI({ summary: 'Return page data' })
  async getPageData(@QueryParam('url') url: string): Promise<any> {
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

    return { data: page, message: 'success' };
  }
}
