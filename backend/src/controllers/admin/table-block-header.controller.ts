import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles } from './utils';

@Controller()
export class AdminTableBlockHeaderController {
  @All('/admin/tableBlockHeader')
  @OpenAPI({ summary: 'Handle TableBlockHeader' })
  @UseBefore(checkPageRoles())
  async tableBlockHeader(@Req() req): Promise<any> {
    switch (req.body.method) {
      default:
        return await defaultHandler(req.body, prisma, {
          update: {
            allowNestedUpdate: { cells: true },
            allowNestedUpsert: { cells: true },
          },
        });
    }
  }
}
