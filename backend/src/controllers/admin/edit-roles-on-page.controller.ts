import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class EditRolesOnPageController {
  @All('/admin/editRolesOnPage')
  @OpenAPI({ summary: 'Handle EditRolesOnPage' })
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
