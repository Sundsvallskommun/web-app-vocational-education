import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminImportantDatesBlockController {
  @All('/admin/importantDatesBlock')
  @OpenAPI({ summary: 'Handle ImportantDatesBlock' })
  async importantDatesBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.ImportantDatesBlockFindUniqueArgs>(req.body, prisma.importantDatesBlock);
      case 'getMany':
        return await getManyHandler<Prisma.ImportantDatesBlockFindManyArgs>(req.body, prisma.importantDatesBlock);
      case 'getList':
        return await getListHandler<Prisma.ImportantDatesBlockFindManyArgs>(req.body, prisma.importantDatesBlock);
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
