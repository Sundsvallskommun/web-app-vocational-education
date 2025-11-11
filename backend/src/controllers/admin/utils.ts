import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { EditRolesOnPage, Page, UserRoleEnum } from '@prisma/client';
import { NextFunction } from 'express';
import prisma from '../../utils/prisma';

export const addIncludes = (includes, options = {}) =>
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

export const skipFields = (fields, options = {}) =>
  Object.assign(options, {
    update: {
      skipFields: fields,
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
      where: req.body.params.ids.map(id => ({ id: id.id ?? id }))[0],
    });
    pageName = resource.pageName;
    pageId = resource.pageId;
  }
  if (['getList', 'getManyReference'].includes(req.body.method)) {
    if (req.body.resource === 'page') {
      return next();
    }
    pageId = req.body.params.filter?.pageId || req.body.params.meta?.pageId;
    pageName = req.body.params.filter?.pageName || req.body.params.meta?.pageName;
  }

  if (['create'].includes(req.body.method)) {
    if (req.body.resource === 'page') {
      return next();
    }
    pageId = req.body.params.data?.pageId || req.body.params.meta?.pageId;
    delete req.body.params.data?.pageId || req.body.params.meta?.pageName;
  }

  if (['employerPromotionsBlock', 'employerPromotionsBlockPromotions'].includes(req.body.resource)) {
    pageName = 'utbildningar'; // there is only one employerPromotionsBlock but it exists on many places
  }

  let page;
  if (pageName && typeof pageName === 'string') {
    page = await prisma.page.findUnique({
      where: {
        pageName: pageName,
      },
      include: {
        editRoles: true,
      },
    });
  } else if (pageId && typeof pageId === 'number') {
    page = await prisma.page.findUnique({
      where: {
        id: pageId,
      },
      include: {
        editRoles: true,
      },
    });
  } else {
    next(new HttpException(403, 'MISSING_PERMISSIONS'));
  }

  if (hasRolesForDataItem(req, 'editRoles')(page)) {
    next();
  } else {
    next(new HttpException(403, 'MISSING_PERMISSIONS'));
  }
};

const toIdList = (blocks: { id: string }[]) => (blocks ? [...blocks].map(block => block.id) : []);

const transformPageDataBlocksToIds = page => ({
  ...page,
  // PromotionsBlock
  promotionsBlock: toIdList(page.promotionsBlock),
  promotedBy: toIdList(page.promotedBy),

  // MapBlock
  mapBlock: toIdList(page.mapBlock),

  // EmployerPromotionsBlock
  employerPromotionsBlock: page.promotionsBlock?.id,

  // ImportantDatesBlock
  importantDatesBlock: toIdList(page.importantDatesBlock),

  // FAQBlock
  faqBlock: toIdList(page.faqBlock),

  // LogosBlock
  logosBlock: toIdList(page.logosBlock),

  // TableBlock
  tableBlock: toIdList(page.tableBlock),

  // ContactFormBlock
  contactFormBlock: toIdList(page.contactFormBlock),
});

export function transformPageResultBlocksToIds(pageResult: { data: Page | Page[] }): {
  data: any;
} {
  if (Array.isArray(pageResult.data)) {
    return {
      ...pageResult,
      data: pageResult.data.map(transformPageDataBlocksToIds),
    };
  } else {
    return {
      ...pageResult,
      data: {
        ...transformPageDataBlocksToIds(pageResult.data),
      },
    };
  }
}
