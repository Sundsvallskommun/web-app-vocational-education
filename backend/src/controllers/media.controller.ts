import { MediaDto, NewMediaDto } from '@/dtos/media.dto';
import { HttpException } from '@/exceptions/HttpException';
import authMiddleware from '@/middlewares/auth.middleware';
import { hasRoles } from '@/middlewares/permissions.middleware';
import { imageUploadOptions } from '@/utils/files/imageUploadOptions';
import { imageUploadSettings } from '@/utils/files/imageUploadSettings';
import prisma from '@/utils/prisma';
import { dataDir } from '@/utils/util';
import fs from 'fs';
import path from 'path';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class MediaController {
  @Post('/media')
  @UseBefore(authMiddleware, hasRoles(['EDITOR']))
  @OpenAPI({ summary: 'Save media' })
  async saveMedia(
    @UploadedFile('media', { options: imageUploadOptions, required: true }) media: Express.Multer.File,
    @Body({ validate: true }) body: NewMediaDto,
  ) {
    if (!media) {
      throw new HttpException(400, 'Bad Request - Missing Valid File');
    }

    const data = await prisma.media.create({
      data: {
        ...body,
        filename: media.filename,
        src: path.join(imageUploadSettings.SERVE_PATH, media.filename),
      },
    });

    return { data: data, message: 'success' };
  }

  @Put('/media/:id')
  @UseBefore(authMiddleware, hasRoles(['EDITOR']))
  @OpenAPI({ summary: 'Edit media' })
  async editMedia(@Body({ validate: true }) body: MediaDto, @Param('id') id: number) {
    const data = await prisma.media.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        alt: body.alt,
      },
    });

    return { data: data, message: 'success' };
  }

  @Get('/media/all')
  @UseBefore(authMiddleware, hasRoles(['EDITOR']))
  @OpenAPI({ summary: 'Return all media' })
  async getAllMedia(): Promise<any> {
    const media = await prisma.media.findMany();
    return { data: media, message: 'success' };
  }

  @Delete('/media/:id')
  @UseBefore(authMiddleware, hasRoles(['EDITOR']))
  @OpenAPI({ summary: 'Delete media' })
  async deleteMedia(@Param('id') id: number): Promise<any> {
    const media = await prisma.media.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.media.delete({
      where: {
        id: id,
      },
    });

    const file = dataDir(path.join(imageUploadSettings.UPLOAD_FOLDER, media.filename));
    await fs.unlink(file, err => {
      if (err) throw err;
      console.log(`${file} was deleted`);
    });

    return { data: {}, message: 'success' };
  }
}
