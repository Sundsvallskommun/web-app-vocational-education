import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminPromotionsBlockPromotionsController {
  @All('/admin/promotionsBlockPromotions')
  @OpenAPI({ summary: 'Handle PromotionsBlockPromotions' })
  @UseBefore(checkPageRoles())
  async promotionsBlockPromotions(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        break;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
