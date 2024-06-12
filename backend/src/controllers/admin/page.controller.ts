import prisma from '@/utils/prisma';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminPageController {
  @All('/admin/page')
  @OpenAPI({ summary: 'Handle Page' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']))
  async page(@Req() req): Promise<any> {
    const includes = {
      promotionsBlock: true,
      mapBlock: true,
      employerPromotionsBlock: true,
      importantDatesBlock: true,
      faqBlock: true,
      logosBlock: true,
      tableBlock: true,
    };
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.PageFindUniqueArgs>(req.body, prisma.page, {
          include: includes,
        });
      case 'getMany':
        return await getManyHandler<Prisma.PageFindManyArgs>(req.body, prisma.page, {
          include: includes,
        });
      case 'getList':
        return await getListHandler<Prisma.PageFindManyArgs>(req.body, prisma.page, {
          include: includes,
        });
      case 'update':
        return await updateHandler<Prisma.PageUpdateArgs>(req.body, prisma.page, {
          skipFields: includes,
        });
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
