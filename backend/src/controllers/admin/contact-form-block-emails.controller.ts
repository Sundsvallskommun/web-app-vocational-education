import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminContactFormBlockEmailsController {
  @All('/admin/contactFormBlockEmails')
  @OpenAPI({ summary: 'Handle ContactFormBlockEmails' })
  @UseBefore(checkPageRoles())
  async contactFormBlockEmails(@Req() req): Promise<any> {
    switch (req.body.method) {
      case 'deleteMany':
        // Dont allow these
        return;
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
