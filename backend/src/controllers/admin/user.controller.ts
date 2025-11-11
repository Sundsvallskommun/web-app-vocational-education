import { HttpException } from '@/exceptions/HttpException';
import { omit } from '@/utils/object';
import prisma from '@/utils/prisma';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { defaultHandler, deleteHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { hasRolesForMethods } from './utils';

@Controller()
export class AdminUserController {
  @All('/admin/user')
  @OpenAPI({ summary: 'Handle user' })
  @UseBefore(hasRolesForMethods([UserRoleEnum.ADMIN], ['getMeny', 'getList', 'create', 'delete']))
  async user(@Req() req): Promise<any> {
    const include = {
      roles: true,
    };
    switch (req.body.method) {
      case 'getOne':
        if (req.body.params.id === req.user.id || req.user.roles.includes('ADMIN')) {
          const getOneHandlerRes = await getOneHandler<Prisma.UserFindUniqueArgs>(req.body, prisma.user, { include });
          return Object.assign(omit(getOneHandlerRes, ['data']), { data: omit(getOneHandlerRes.data, ['password']) });
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'getMany':
        const getManyHandlerRes = await getManyHandler<Prisma.UserFindManyArgs>(req.body, prisma.user, { include });
        const getManyHandlerResData = { data: getManyHandlerRes.data.map(x => omit(x, ['password'])) };
        return Object.assign(omit(getManyHandlerRes, ['data']), getManyHandlerResData);
      case 'getList':
        const getListHandlerRes = await getListHandler<Prisma.UserFindManyArgs>(req.body, prisma.user, { include });
        const getListHandlerResData = { data: getListHandlerRes.data.map(x => omit(x, ['password'])) };
        return Object.assign(omit(getListHandlerRes, ['data']), getListHandlerResData);
      case 'create':
        const user = await prisma.user.create({
          data: Object.assign(req.body.params.data, {
            roles: {
              createMany: {
                data: req.body.params.data.roles.map(role => ({
                  role: role.role,
                })),
              },
            },
          }),
          include: {
            roles: true,
          },
        });
        return {
          data: omit(user, ['password']),
        };
      case 'update':
        if (req.body.params.id === req.user.id || req.user.roles.includes('ADMIN')) {
          const rolesToDisconnect = req.body.params.previousData.roles.filter(
            prevRole => !req.body.params.data.roles.some(newRole => prevRole.role === newRole.role),
          );

          const user = await prisma.user.update({
            where: {
              id: req.body.params.id,
            },
            data: Object.assign(req.body.params.data, {
              roles: {
                deleteMany: rolesToDisconnect.map(role => ({
                  username: req.body.params.data.username,
                  role: role.role,
                })),
                upsert: req.body.params.data.roles.map(role => ({
                  where: {
                    username_role: {
                      username: req.body.params.data.username,
                      role: role.role,
                    },
                  },
                  create: {
                    role: role.role,
                  },
                  update: {
                    role: role.role,
                  },
                })),
              },
            }),
            include: {
              roles: true,
            },
          });
          return {
            data: omit(user, ['password']),
          };
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'delete':
        const deleteHandlerRes = await deleteHandler<Prisma.UserDeleteArgs>(req.body, prisma.user);
        return Object.assign(omit(deleteHandlerRes, ['data']), { data: omit(deleteHandlerRes.data, ['password']) });
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
