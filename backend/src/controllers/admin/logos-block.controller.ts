import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminLogosBlockController {
  @All('/admin/logosBlock')
  @OpenAPI({ summary: 'Handle LogosBlock' })
  async logosBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.LogosBlockFindUniqueArgs>(req.body, prisma.logosBlock);
      case 'getMany':
        return await getManyHandler<Prisma.LogosBlockFindManyArgs>(req.body, prisma.logosBlock);
      case 'getList':
        return await getListHandler<Prisma.LogosBlockFindManyArgs>(req.body, prisma.logosBlock);
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
