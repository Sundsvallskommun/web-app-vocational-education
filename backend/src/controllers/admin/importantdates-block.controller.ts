import prisma from '@/utils/prisma';
import { Prisma, UserRole } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminImportantDatesBlockController {
  @All('/admin/importantDatesBlock')
  @OpenAPI({ summary: 'Handle ImportantDatesBlock' })
  @UseBefore(hasRolesForMethods([UserRole.ADMIN], ['delete', 'create']))
  async importantDatesBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.ImportantDatesBlockFindUniqueArgs>(req.body, prisma.importantDatesBlock);
      case 'getMany':
        return await getManyHandler<Prisma.ImportantDatesBlockFindManyArgs>(req.body, prisma.importantDatesBlock);
      case 'getList':
        return await getListHandler<Prisma.ImportantDatesBlockFindManyArgs>(req.body, prisma.importantDatesBlock);
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
