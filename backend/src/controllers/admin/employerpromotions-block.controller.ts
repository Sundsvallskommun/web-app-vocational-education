import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { addIncludes, checkPageRoles, hasRolesForMethods, skipFields } from './utils';
import { UserRoleEnum } from '@prisma/client';

@Controller()
export class AdminEmployerPromotionsBlockController {
  @All('/admin/employerPromotionsBlock')
  @OpenAPI({ summary: 'Handle EmployerPromotionsBlock' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']), checkPageRoles())
  async employerPromotionsBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma, { ...addIncludes({ employerPromotions: true }), ...skipFields({ employerPromotions: true }) });
    }
  }
}
