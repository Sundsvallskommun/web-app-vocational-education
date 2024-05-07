import prisma from '@/utils/prisma';
import { defaultHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

const addIncludes = (includes, options) =>
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

@Controller()
export class AdminTableBlockRowController {
  @All('/admin/tableBlockRow')
  @OpenAPI({ summary: 'Handle TableBlockRow' })
  async tableBlockRow(@Req() req): Promise<any> {
    switch (req.body.method) {
      default:
        return await defaultHandler(
          req.body,
          prisma,
          addIncludes(
            {
              cells: true,
            },
            {
              update: {
                allowNestedUpdate: { cells: true },
                allowNestedUpsert: { cells: true },
              },
            },
          ),
        );
    }
  }
}
