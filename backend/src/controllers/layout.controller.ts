import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import prisma from '@/utils/prisma';

@Controller()
export class LayoutController {
  @Get('/layout')
  @OpenAPI({ summary: 'Return layout data' })
  async getLayoutData(): Promise<any> {
    const footer = await prisma.footer.findUnique({
      where: {
        id: 1,
      },
    });
    delete footer?.id;

    return {
      data: {
        footer: footer,
      },
      message: 'success',
    };
  }
}
