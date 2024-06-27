import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { createHandler, defaultHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminFAQBlockQuestionsController {
  @All('/admin/faqBlockQuestions')
  @OpenAPI({ summary: 'Handle FAQBlockQuestions' })
  @UseBefore(checkPageRoles())
  async faqBlockQuestions(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'getOne':
        return await getOneHandler<Prisma.FaqBlockQuestionsFindUniqueArgs>(req.body, prisma.faqBlockQuestions);
      case 'getMany':
        return await getManyHandler<Prisma.FaqBlockQuestionsFindManyArgs>(req.body, prisma.faqBlockQuestions);
      case 'getList':
        return await getListHandler<Prisma.FaqBlockQuestionsFindManyArgs>(req.body, prisma.faqBlockQuestions);
      case 'create':
        return await createHandler<Prisma.FaqBlockQuestionsCreateArgs>(req.body, prisma.faqBlockQuestions, { connect: { faqBlock: 'id' } });
      case 'update':
        return await updateHandler<Prisma.FaqBlockQuestionsUpdateArgs>(req.body, prisma.faqBlockQuestions, {
          skipFields: {
            id: true,
            blockId: true,
            pageName: true,
            faqBlock: true,
          },
        });
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
