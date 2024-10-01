import { EducationsController } from '@/controllers/educations.controller';
import { SavedInterestDto, SavedSearchDto } from '@/dtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserSavedInterestStatistics } from '@/interfaces/educations.interface';
import { ClientUser } from '@/interfaces/users.interface';
import { hasPermissions } from '@/middlewares/permissions.middleware';
import { getClientUser } from '@/services/user.service';
import prisma from '@/utils/prisma';
import authMiddleware from '@middlewares/auth.middleware';
import { User_SavedInterest } from '@prisma/client';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class UserController {
  private educationsController = new EducationsController();

  dbInterestToData = dbData => ({ ...dbData, studyLocation: dbData.studyLocation.split(','), userId: undefined });

  getStatisticsData = async (parametersList: User_SavedInterest[]): Promise<UserSavedInterestStatistics[]> => {
    const statisticsData: UserSavedInterestStatistics[] = [];
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    for (const parameters of parametersList) {
      try {
        const res = await this.educationsController.getEducationEventsStatistics({
          categories: [parameters.category],
          studyLocations: parameters.studyLocation.split(','),
          levels: [parameters.level],
          startDate: parameters.timeInterval === '0' ? parameters.timeIntervalFrom : todayFormatted,
          endDate:
            parameters.timeInterval === '0'
              ? parameters.timeIntervalTo
              : new Date(today.setMonth(today.getMonth() + parseInt(parameters.timeInterval))).toISOString().split('T')[0],
        });
        if (res.data) {
          statisticsData.push({
            ongoing: res.data.onGoingCourses,
            capacity: res.data.totalCapacity,
            planned: res.data.plannedCourses,
            available: res.data.availableSeats,
            ended: res.data.finishedCourses,
            id: parameters.id,
            studyLocation: parameters.studyLocation.split(','),
            category: parameters.category,
            level: parameters.level,
            timeInterval: parameters.timeInterval,
            timeIntervalFrom: parameters.timeIntervalFrom,
            timeIntervalTo: parameters.timeIntervalTo,
            createdAt: parameters.createdAt,
            updatedAt: parameters.updatedAt,
          });
        }
      } catch (err) {
        throw new HttpException(500, `Could not fetch interest ${parameters.category}: ${err}`);
      }
    }
    return statisticsData;
  };

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
    console.log('interests', interests);
    const statisticsData = await this.getStatisticsData(interests);
    console.log('statisticsData', statisticsData);
    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    return response.send({ data: statisticsData, message: 'success' });
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

    const statisticsData = this.getStatisticsData([interest]);

    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    return response.send({ data: statisticsData, message: 'success' });
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

    const statisticsData = this.getStatisticsData([interest]);

    if (!statisticsData) {
      throw new HttpException(400, 'Missing statistics data');
    }

    return response.send({ data: statisticsData, message: 'success' });
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

    return response.send({ data: this.dbInterestToData(interest), message: 'success' });
  }
}
