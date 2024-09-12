import { SavedInterestDto, SavedSearchDto } from '@/dtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ClientUser } from '@/interfaces/users.interface';
import { hasPermissions } from '@/middlewares/permissions.middleware';
import { getClientUser } from '@/services/user.service';
import prisma from '@/utils/prisma';
import authMiddleware from '@middlewares/auth.middleware';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

const dbInterestToData = dbData => ({ ...dbData, studyLocation: dbData.studyLocation.split(',') });

const getStatisticsData = parametersList =>
  parametersList.map(() => ({
    ongoing: 12,
    capacity: 70,
    planned: 65,
    available: 300,
    ended: 11,
    freetext:
      'Obs: Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  }));

@Controller()
export class UserController {
  @Get('/me')
  @OpenAPI({ summary: 'Return current user' })
  @UseBefore(authMiddleware)
  async getUser(@Req() req: RequestWithUser, @Res() response: any): Promise<ClientUser> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const userData: ClientUser = getClientUser(req.user);

    return response.send({ data: userData, message: 'success' });
  }

  @Get('/user/saved-searches')
  @OpenAPI({ summary: 'Return saved searches for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveSearches']))
  async getSavedSearches(@Req() req: RequestWithUser, @Res() response: any): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const searches = await prisma.user_SavedSearch.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return response.send({ data: searches, message: 'success' });
  }

  @Post('/user/saved-searches')
  @OpenAPI({ summary: 'Create saved search for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveSearches']))
  async newSavedSearch(@Req() req: RequestWithUser, @Res() response: any, @Body() body: SavedSearchDto): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const search = await prisma.user_SavedSearch.create({
      data: {
        ...body,
        userId: req.user.id,
      },
    });

    return response.send({ data: search, message: 'success' });
  }

  @Delete('/user/saved-searches/:id')
  @OpenAPI({ summary: 'Delete saved search for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveSearches']))
  async deleteSavedSearch(@Req() req: RequestWithUser, @Res() response: any, @Param('id') id: number): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const search = await prisma.user_SavedSearch.delete({
      where: {
        userId: req.user.id,
        id: id,
      },
    });

    return response.send({ data: search, message: 'success' });
  }

  @Get('/user/saved-interests')
  @OpenAPI({ summary: 'Return saved interests for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveInterests']))
  async getSavedInterests(@Req() req: RequestWithUser, @Res() response: any): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const interests = await prisma.user_SavedInterest.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const statisticsData = getStatisticsData(interests);

    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    const withStatisticsData = interests.map((x, i) =>
      dbInterestToData({
        ...x,
        ...statisticsData[i],
      }),
    );

    return response.send({ data: withStatisticsData, message: 'success' });
  }

  @Post('/user/saved-interests')
  @OpenAPI({ summary: 'Create saved interest for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveInterests']))
  async newSavedInterest(@Req() req: RequestWithUser, @Res() response: any, @Body() body: SavedInterestDto): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const interest = await prisma.user_SavedInterest.create({
      data: {
        ...body,
        studyLocation: body.studyLocation.join(','),
        userId: req.user.id,
      },
    });

    const statisticsData = getStatisticsData([interest]);

    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    const withStatisticsData = {
      ...dbInterestToData(interest),
      ...statisticsData[0],
    };

    return response.send({ data: withStatisticsData, message: 'success' });
  }

  @Patch('/user/saved-interests/:id')
  @OpenAPI({ summary: 'Edit saved interest for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveInterests']))
  async editSavedInterest(@Req() req: RequestWithUser, @Res() response: any, @Body() body: SavedInterestDto, @Param('id') id: number): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const interest = await prisma.user_SavedInterest.update({
      where: {
        userId: req.user.id,
        id: id,
      },
      data: {
        ...body,
        studyLocation: body.studyLocation.join(','),
      },
    });

    const statisticsData = getStatisticsData([interest]);

    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    const withStatisticsData = {
      ...dbInterestToData(interest),
      ...statisticsData[0],
    };

    return response.send({ data: withStatisticsData, message: 'success' });
  }

  @Delete('/user/saved-interests/:id')
  @OpenAPI({ summary: 'Delete saved interest for user' })
  @UseBefore(authMiddleware, hasPermissions(['userSaveInterests']))
  async deleteSavedInterest(@Req() req: RequestWithUser, @Res() response: any, @Param('id') id: number): Promise<any> {
    if (!req.user.username) {
      throw new HttpException(400, 'Bad Request');
    }

    const interest = await prisma.user_SavedInterest.delete({
      where: {
        userId: req.user.id,
        id: id,
      },
    });

    return response.send({ data: dbInterestToData(interest), message: 'success' });
  }
}
