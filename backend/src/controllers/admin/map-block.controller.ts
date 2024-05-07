import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminMapBlockController {
  @All('/admin/mapBlock')
  @OpenAPI({ summary: 'Handle MapBlock' })
  async mapBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.MapBlockFindUniqueArgs>(req.body, prisma.mapBlock);
      case 'getMany':
        return await getManyHandler<Prisma.MapBlockFindManyArgs>(req.body, prisma.mapBlock);
      case 'getList':
        return await getListHandler<Prisma.MapBlockFindManyArgs>(req.body, prisma.mapBlock);
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
