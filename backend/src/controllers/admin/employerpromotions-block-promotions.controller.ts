import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { createHandler, defaultHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminEmployerPromotionsBlockPromotionsController {
  @All('/admin/employerPromotionsBlockPromotions')
  @OpenAPI({ summary: 'Handle EmployerPromotionsBlockPromotions' })
  @UseBefore(checkPageRoles())
  async employerPromotionsBlockPromotions(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'create':
        return await createHandler<Prisma.EmployerPromotionsBlockPromotionsCreateArgs>(req.body, prisma.employerPromotionsBlockPromotions, {
          connect: { employerPromotionsBlock: 'id' },
        });
      case 'update':
        return await updateHandler<Prisma.EmployerPromotionsBlockPromotionsUpdateArgs>(req.body, prisma.employerPromotionsBlockPromotions, {
          skipFields: {
            id: true,
            blockId: true,
            pageName: true,
            employerPromotionsBlock: true,
          },
        });
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
