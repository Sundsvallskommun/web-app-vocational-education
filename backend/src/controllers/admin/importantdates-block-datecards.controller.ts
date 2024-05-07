import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { createHandler, defaultHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminImportantDatesBlockDateCardsController {
  @All('/admin/importantDatesBlockDateCards')
  @OpenAPI({ summary: 'Handle ImportantDatesBlockDateCards' })
  async importantDatesBlockDateCards(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.ImportantDatesBlockDateCardsFindUniqueArgs>(req.body, prisma.importantDatesBlockDateCards);
      case 'getMany':
        return await getManyHandler<Prisma.ImportantDatesBlockDateCardsFindManyArgs>(req.body, prisma.importantDatesBlockDateCards);
      case 'getList':
        return await getListHandler<Prisma.ImportantDatesBlockDateCardsFindManyArgs>(req.body, prisma.importantDatesBlockDateCards);
      case 'create':
        return await createHandler<Prisma.ImportantDatesBlockDateCardsCreateArgs>(req.body, prisma.importantDatesBlockDateCards, {
          connect: { importantDatesBlock: 'id' },
        });
      case 'update':
        return await updateHandler<Prisma.ImportantDatesBlockDateCardsUpdateArgs>(req.body, prisma.importantDatesBlockDateCards, {
          skipFields: {
            id: true,
            blockId: true,
            pageName: true,
            importantDatesBlock: true,
          },
        });
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
