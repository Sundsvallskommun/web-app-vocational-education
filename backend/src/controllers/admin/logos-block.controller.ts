import prisma from '@/utils/prisma';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminLogosBlockController {
  @All('/admin/logosBlock')
  @OpenAPI({ summary: 'Handle LogosBlock' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']))
  async logosBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.LogosBlockFindUniqueArgs>(req.body, prisma.logosBlock);
      case 'getMany':
        return await getManyHandler<Prisma.LogosBlockFindManyArgs>(req.body, prisma.logosBlock);
      case 'getList':
        return await getListHandler<Prisma.LogosBlockFindManyArgs>(req.body, prisma.logosBlock);
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
