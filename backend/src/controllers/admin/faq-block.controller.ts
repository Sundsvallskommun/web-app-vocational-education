import prisma from '@/utils/prisma';
import { UserRoleEnum } from '@prisma/client';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles, hasRolesForMethods, addIncludes, skipFields } from './utils';

@Controller()
export class AdminFAQBlockController {
  @All('/admin/faqBlock')
  @OpenAPI({ summary: 'Handle FAQBlock' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']), checkPageRoles())
  async faqBlock(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma, { ...addIncludes({ questions: true }), ...skipFields({ questions: true }) });
    }
  }
}
