import { deleteImage, imageUploadOptions } from '@/utils/files/imageUploadOptions';
import prisma from '@/utils/prisma';
import { setReqBodyIfMultiPartForm } from '@/utils/util';
import { Prisma, UserRoleEnum } from '@prisma/client';
import { createHandler, defaultHandler, getListHandler, getManyHandler, getOneHandler, updateHandler } from 'ra-data-simple-prisma';
import { All, Controller, Req, UploadedFile, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { checkPageRoles, hasRolesForMethods } from './utils';

@Controller()
export class AdminLogosBlockLogosController {
  @All('/admin/logosBlockLogos')
  @OpenAPI({ summary: 'Handle LogosBlockLogos' })
  @UseBefore(checkPageRoles())
  async logosBlockLogos(
    @Req() req,
    @UploadedFile('image', { options: imageUploadOptions, required: false }) image?: Express.Multer.File,
  ): Promise<any> {
    if (image) {
      setReqBodyIfMultiPartForm(req, {
        params: {
          data: {
            filename: image.filename,
          },
        },
      });
    } else {
      setReqBodyIfMultiPartForm(req);
    }
    switch (req.body.method) {
      case 'create':
        return await createHandler<Prisma.LogosBlockLogosCreateArgs>(req.body, prisma.logosBlockLogos, {
          connect: { logosBlock: 'id' },
        });
      case 'update':
        // Remove existing file if any
        if (req.body.params.previousData.filename) {
          deleteImage(req.body.params.previousData.filename);
        }

        return await updateHandler<Prisma.LogosBlockLogosUpdateArgs>(req.body, prisma.logosBlockLogos, {
          skipFields: {
            id: true,
            blockId: true,
            pageName: true,
            logosBlock: true,
            image: true,
          },
        });
      default:
        return await defaultHandler(req.body, prisma);
    }
  }
}
