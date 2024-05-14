import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminPromotionsBlockPromotionsController {
  @All('/admin/promotionsBlockPromotions')
  @OpenAPI({ summary: 'Handle PromotionsBlockPromotions' })
  async promotionsBlockPromotions(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.PromotionsBlockPromotionsFindUniqueArgs>(req.body, prisma.promotionsBlockPromotions);
      case 'getMany':
        return await getManyHandler<Prisma.PromotionsBlockPromotionsFindManyArgs>(req.body, prisma.promotionsBlockPromotions);
      case 'getList':
        return await getListHandler<Prisma.PromotionsBlockPromotionsFindManyArgs>(req.body, prisma.promotionsBlockPromotions);
      case 'deleteMany':
        // Dont allow these
        break;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
