import prisma from '@/utils/prisma';
import { EditRolesOnPage, Prisma, UserRoleEnum } from '@prisma/client';
import _ from 'lodash';
import { defaultHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestWithUser } from '../../interfaces/auth.interface';
import { filterByDataRoles, hasRolesForMethods } from './utils';
import { omit } from '@/utils/object';

@Controller()
export class AdminPageController {
  @All('/admin/page')
  @OpenAPI({ summary: 'Handle Page' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['delete', 'create']))
  async page(@Req() req: RequestWithUser): Promise<any> {
    const includes = {
      promotionsBlock: true,
      mapBlock: true,
      employerPromotionsBlock: true,
      importantDatesBlock: true,
      faqBlock: true,
      logosBlock: true,
      tableBlock: true,
      editRoles: true,
    };
    switch (req.body.method) {
      case 'update':
        if (!_.isEqual(req.body.params.previousData.editRoles, req.body.params.data.editRoles)) {
          const rolesToDisconnect: EditRolesOnPage[] = req.body.params.previousData.editRoles.filter(
            prevRole => !req.body.params.data.editRoles.some(newRole => prevRole.role === newRole.role),
          );
          if (rolesToDisconnect.length > 0) {
            await prisma.editRolesOnPage.deleteMany({
              where: {
                OR: rolesToDisconnect.map(role => ({
                  pageName: req.body.params.data.pageName,
                  pageId: req.body.params.data.id,
                  role: role.role,
                })),
              },
            });
          }

          await prisma.editRolesOnPage.createMany({
            data: req.body.params.data.editRoles
              .filter(newRole => !req.body.params.previousData.editRoles.some(oldRole => oldRole.role === newRole.role))
              .map(role => ({
                pageName: req.body.params.data.pageName,
                pageId: req.body.params.data.id,
                role: role.role,
              })),
          });
        }

        return filterByDataRoles(
          await updateHandler<Prisma.PageUpdateArgs>(
            {
              method: req.body.method,
              params: {
                ...req.body.params,
                data: omit(req.body.params.data, ['id']),
              },
              resource: req.body.resource,
            },
            prisma.page,
            {
              skipFields: includes,
              include: includes,
            },
          ),
          req,
          'editRoles',
        );

      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return filterByDataRoles(
          await defaultHandler(req.body, prisma, {
            getOne: {
              include: includes,
            },
            getMany: {
              include: includes,
            },
            getList: {
              include: includes,
            },
          }),
          req,
          'editRoles',
        );
    }
  }
}
