import { checkPageRoles, hasRolesForMethods } from '@/controllers/admin/utils';
import prisma from '@/utils/prisma';
import { UserRoleEnum } from '@prisma/client';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class EditRolesOnPageController {
  @All('/admin/editRolesOnPage')
  @OpenAPI({ summary: 'Handle EditRolesOnPage' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['edit']), checkPageRoles())
  async editRolesOnPage(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        break;
      default:
        const request = Object.assign(req.body, {
          params: {
            sort: {
              field: 'pageName',
            },
          },
        });
        return await defaultHandler(request, prisma);
    }
  }
}
