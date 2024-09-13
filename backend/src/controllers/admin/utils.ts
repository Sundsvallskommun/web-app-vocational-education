import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { EditRolesOnPage, UserRoleEnum } from '@prisma/client';
import { NextFunction } from 'express';
import prisma from '../../utils/prisma';

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

const hasRolesForDataItem = (req: RequestWithUser, roleKey) => item =>
  req.user.roles.includes('ADMIN') ||
  (roleKey &&
    (item[roleKey] as EditRolesOnPage[]).some(editRole => req.user.roles.includes(Object.values(UserRoleEnum).find(role => role === editRole.role))));

export const filterByDataRoles = (res, req, roleKey = '') => ({
  ...res,
  data: Array.isArray(res.data) ? res.data.filter(hasRolesForDataItem(req, roleKey)) : hasRolesForDataItem(req, roleKey)(res.data) ? res.data : {},
});

export const checkPageRoles = () => async (req: RequestWithUser, res: Response, next) => {
  let pageName;
  let pageId;

  if (['getOne', 'update', 'delete'].includes(req.body.method)) {
    // @ts-expect-error adapter will always return resource
    const resource = await prisma[req.body.resource].findUnique({
      where: {
        id: req.body.params.id,
      },
    });
    pageName = resource.pageName;
    pageId = resource.pageId;
  }
  if (['getMany'].includes(req.body.method)) {
    // @ts-expect-error adapter will always return resource
    const resource = await prisma[req.body.resource].findFirst({
      where: {
        OR: req.body.params.ids.map(id => ({
          id,
        })),
      },
    });
    pageName = resource.pageName;
    pageId = resource.pageId;
  }
  if (['getList'].includes(req.body.method)) {
    pageId = req.body.params.filter.pageId;
    pageName = req.body.params.filter.pageName;
  }

  if (typeof pageId !== 'number' && typeof pageName !== 'string') {
    throw Error('Neither pageId or pageName present, which is needed for page role right access check.');
  }

  let page;
  if (pageName) {
    page = await prisma.page.findUnique({
      where: {
        pageName: pageName,
      },
      include: {
        editRoles: true,
      },
    });
  } else if (pageId) {
    page = await prisma.page.findUnique({
      where: {
        id: pageId,
      },
      include: {
        editRoles: true,
      },
    });
  }

  if (hasRolesForDataItem(req, 'editRoles')(page)) {
    next();
  } else {
    next(new HttpException(403, 'MISSING_PERMISSIONS'));
  }
};
