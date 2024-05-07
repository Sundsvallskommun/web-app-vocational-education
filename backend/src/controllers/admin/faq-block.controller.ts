import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminFAQBlockController {
  @All('/admin/faqBlock')
  @OpenAPI({ summary: 'Handle FAQBlock' })
  async faqBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.FaqBlockFindUniqueArgs>(req.body, prisma.faqBlock);
      case 'getMany':
        return await getManyHandler<Prisma.FaqBlockFindManyArgs>(req.body, prisma.faqBlock);
      case 'getList':
        return await getListHandler<Prisma.FaqBlockFindManyArgs>(req.body, prisma.faqBlock);
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
