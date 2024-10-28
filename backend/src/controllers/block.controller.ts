import { HttpException } from '@/exceptions/HttpException';
import prisma from '@/utils/prisma';
import { Controller, Get, QueryParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

const getIncludes = (block: string) => {
  if (block === 'employerPromotionsBlock') {
    return {
      employerPromotions: true,
    };
  }
  return undefined;
};

@Controller()
export class BlockController {
  @Get('/block')
  @OpenAPI({ summary: 'Return block data' })
  async getBlockData(@QueryParam('block') block: string): Promise<unknown | null> {
    let data = null;
    switch (block) {
      case 'employerPromotionsBlock':
        data = await prisma[block].findFirst({
          include: getIncludes(block),
        });
        break;
      default:
        throw new HttpException(400, 'Invalid block');
    }

    return { data: data, message: 'success' };
  }
}
