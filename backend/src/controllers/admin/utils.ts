import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserRoleEnum } from '@prisma/client';
import { NextFunction } from 'express';

export const addIncludes = (includes, options) =>
  Object.assign(options, {
    getList: {
      include: includes,
    },
    getMany: {
      include: includes,
    },
    getManyReference: {
      include: includes,
    },
    getOne: {
      include: includes,
    },
  });

// Middlewares
export const hasRolesForMethods = (roles: UserRoleEnum[], methods: string[]) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (methods.includes(req.body.method)) {
    if (roles.some(role => req.user.roles.some(userRole => userRole === role))) {
      next();
    } else {
      next(new HttpException(403, 'MISSING_PERMISSIONS'));
    }
  } else {
    next();
  }
};
