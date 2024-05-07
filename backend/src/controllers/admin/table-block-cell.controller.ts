import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { defaultHandler, getListHandler, getManyHandler, getOneHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class AdminTableBlockCellController {
  @All('/admin/tableBlockCell')
  @OpenAPI({ summary: 'Handle TableBlockCell' })
  async tableBlockCell(@Req() req): Promise<any> {
    switch (req.body.method) {
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
