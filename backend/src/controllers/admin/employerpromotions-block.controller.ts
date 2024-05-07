import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminEmployerPromotionsBlockController {
  @All('/admin/employerPromotionsBlock')
  @OpenAPI({ summary: 'Handle EmployerPromotionsBlock' })
  async employerPromotionsBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.EmployerPromotionsBlockFindUniqueArgs>(req.body, prisma.employerPromotionsBlock);
      case 'getMany':
        return await getManyHandler<Prisma.EmployerPromotionsBlockFindManyArgs>(req.body, prisma.employerPromotionsBlock);
      case 'getList':
        return await getListHandler<Prisma.EmployerPromotionsBlockFindManyArgs>(req.body, prisma.employerPromotionsBlock);
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
