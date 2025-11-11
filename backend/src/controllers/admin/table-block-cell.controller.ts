import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminTableBlockCellController {
  @All('/admin/tableBlockCell')
  @OpenAPI({ summary: 'Handle TableBlockCell' })
  @UseBefore(checkPageRoles())
  async tableBlockCell(@Req() req): Promise<any> {
    switch (req.body.method) {
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
