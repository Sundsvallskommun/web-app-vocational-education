import prisma from '@/utils/prisma';
import { Prisma, UserRole } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminMapBlockController {
  @All('/admin/mapBlock')
  @OpenAPI({ summary: 'Handle MapBlock' })
  @UseBefore(hasRolesForMethods([UserRole.ADMIN], ['delete', 'create']))
  async mapBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.MapBlockFindUniqueArgs>(req.body, prisma.mapBlock);
      case 'getMany':
        return await getManyHandler<Prisma.MapBlockFindManyArgs>(req.body, prisma.mapBlock);
      case 'getList':
        return await getListHandler<Prisma.MapBlockFindManyArgs>(req.body, prisma.mapBlock);
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
