import prisma from '@/utils/prisma';
import { UserRoleEnum } from '@prisma/client';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminFooterController {
  @All('/admin/footer')
  @OpenAPI({ summary: 'Handle Footer' })
  @UseBefore(
    hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']),
    hasRolesForMethods([UserRoleEnum.ADMIN, UserRoleEnum.EDITOR], ['getOne', 'getMany', 'getList', 'getReference', 'update']),
  )
  async footer(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
