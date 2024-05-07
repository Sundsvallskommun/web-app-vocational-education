import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminFooterController {
  @All('/admin/footer')
  @OpenAPI({ summary: 'Handle Footer' })
  async footer(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.FooterFindUniqueArgs>(req.body, prisma.footer);
      case 'getMany':
        return await getManyHandler<Prisma.FooterFindManyArgs>(req.body, prisma.footer);
      case 'getList':
        return await getListHandler<Prisma.FooterFindManyArgs>(req.body, prisma.footer);
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
