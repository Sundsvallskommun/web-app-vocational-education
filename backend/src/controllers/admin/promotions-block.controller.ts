import prisma from '@/utils/prisma';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminPromotionsBlockController {
  @All('/admin/promotionsBlock')
  @OpenAPI({ summary: 'Handle PromotionsBlock' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']))
  async promotionsBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.PromotionsBlockFindUniqueArgs>(req.body, prisma.promotionsBlock);
      case 'getMany':
        return await getManyHandler<Prisma.PromotionsBlockFindManyArgs>(req.body, prisma.promotionsBlock);
      case 'getList':
        return await getListHandler<Prisma.PromotionsBlockFindManyArgs>(req.body, prisma.promotionsBlock);
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
