import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminPromotionsBlockController {
  @All('/admin/promotionsBlock')
  @OpenAPI({ summary: 'Handle PromotionsBlock' })
  async promotionsBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.PromotionsBlockFindUniqueArgs>(req.body, prisma.promotionsBlock);
      case 'getMany':
        return await getManyHandler<Prisma.PromotionsBlockFindManyArgs>(req.body, prisma.promotionsBlock);
      case 'getList':
        return await getListHandler<Prisma.PromotionsBlockFindManyArgs>(req.body, prisma.promotionsBlock);
      case 'create':
      case 'delete':
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
