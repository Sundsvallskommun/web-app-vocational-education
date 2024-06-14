import { HttpException } from '@/exceptions/HttpException';
import prisma from '@/utils/prisma';
import { UserRoleEnum } from '@prisma/client';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { addIncludes, checkPageRoles, hasRolesForMethods } from './utils';

@Controller()
export class AdminTableBlockController {
  @All('/admin/tableBlock')
  @OpenAPI({ summary: 'Handle TableBlock' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']), checkPageRoles())
  async tableBlock(@Req() req): Promise<any> {
    const includes = {
      headers: true,
      rows: {
        include: {
          cells: true,
        },
      },
      cells: true,
    };
    switch (req.body.method) {
      case 'deleteMany':
        // disable these
        throw new HttpException(405, 'Method Not Allowed');
      default:
        return await defaultHandler(
          req.body,
          prisma,
          addIncludes(includes, {
            update: {
              include: includes,
              allowNestedUpdate: { headers: true, rows: { cells: true }, cells: true },
              allowNestedUpsert: { headers: true, rows: { cells: true }, cells: true },
            },
          }),
        );
    }
  }
}
