import { HttpException } from '@/exceptions/HttpException';
import { omit } from '@/utils/object';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { createHandler, defaultHandler, deleteHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminUserController {
  @All('/admin/user')
  @OpenAPI({ summary: 'Handle user' })
  async user(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        if (req.body.params.id === req.user.id || req.user.role === 'ADMIN') {
          const getOneHandlerRes = await getOneHandler<Prisma.UserFindUniqueArgs>(req.body, prisma.user);
          return Object.assign(omit(getOneHandlerRes, ['data']), { data: omit(getOneHandlerRes.data, ['password']) });
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'getMany':
        if (req.user.role === 'ADMIN') {
          const getManyHandlerRes = await getManyHandler<Prisma.UserFindManyArgs>(req.body, prisma.user);
          const getManyHandlerResData = { data: getManyHandlerRes.data.map(x => omit(x, ['password'])) };
          return Object.assign(omit(getManyHandlerRes, ['data']), getManyHandlerResData);
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'getList':
        if (req.user.role === 'ADMIN') {
          const getListHandlerRes = await getListHandler<Prisma.UserFindManyArgs>(req.body, prisma.user);
          const getListHandlerResData = { data: getListHandlerRes.data.map(x => omit(x, ['password'])) };
          return Object.assign(omit(getListHandlerRes, ['data']), getListHandlerResData);
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'create':
        if (req.user.role === 'ADMIN') {
          const createHandlerRes = await createHandler<Prisma.UserCreateArgs>(req.body, prisma.user);
          return Object.assign(omit(createHandlerRes, ['data']), { data: omit(createHandlerRes.data, ['password']) });
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'update':
        if (req.body.params.id === req.user.id || req.user.role === 'ADMIN') {
          const updateHandlerRes = await updateHandler<Prisma.UserUpdateArgs>(req.body, prisma.user);
          return Object.assign(omit(updateHandlerRes, ['data']), { data: omit(updateHandlerRes.data, ['password']) });
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'delete':
        if (req.user.role === 'ADMIN') {
          const deleteHandlerRes = await deleteHandler<Prisma.UserDeleteArgs>(req.body, prisma.user);
          return Object.assign(omit(deleteHandlerRes, ['data']), { data: omit(deleteHandlerRes.data, ['password']) });
        } else {
          throw new HttpException(403, 'MISSING_PERMISSIONS');
        }
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
