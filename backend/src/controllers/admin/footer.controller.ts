import prisma from '@/utils/prisma';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminFooterController {
  @All('/admin/footer')
  @OpenAPI({ summary: 'Handle Footer' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']))
  async footer(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.FooterFindUniqueArgs>(req.body, prisma.footer);
      case 'getMany':
        return await getManyHandler<Prisma.FooterFindManyArgs>(req.body, prisma.footer);
      case 'getList':
        return await getListHandler<Prisma.FooterFindManyArgs>(req.body, prisma.footer);
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
