import { Permissions, RolesMap } from '@/interfaces/users.interface';
import { getPermissions } from '@/services/authorization.service';
import { HttpException } from '@exceptions/HttpException';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

export const hasPermissions = (permissions: Array<keyof Permissions>) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userPermissions = req.user.permissions;
  if (permissions.every(permission => userPermissions[permission])) {
    next();
  } else {
    next(new HttpException(403, 'MISSING_PERMISSIONS'));
  }
};

export const hasRoles = (roles: Array<KeyOfMap<RolesMap>>) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const endpointPermissions = getPermissions(roles, true);
  const userPermissions = req.user.permissions;
  if (
    Object.keys(endpointPermissions).every(
      permission => (endpointPermissions[permission] ? userPermissions[permission] : true) /* Return true for false values */,
    )
  ) {
    next();
  } else {
    next(new HttpException(403, 'MISSING_PERMISSIONS'));
  }
};
