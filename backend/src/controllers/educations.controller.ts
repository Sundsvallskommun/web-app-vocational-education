import { MUNICIPALITY_ID } from '@/config';
import { Course, PagedCoursesResponse, Statistics } from '@/data-contracts/education-finder/data-contracts';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import DataResponse from '@/interfaces/dataResponse.interface';
import { GetEducationFilter, GetEducationFiltersResponseData } from '@/interfaces/educations.interface';
import cs from '@/services/controller.service';
import { IsNullable } from '@/utils/custom-validation-classes';
import { IsArray, IsBooleanString, IsOptional, IsString } from 'class-validator';
import hpp from 'hpp';
import { Controller, Get, Param, QueryParam, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

export class EducationFilterOptions {
  // Pagination-parameters
  @IsOptional()
  @IsString()
  page?: string;
  @IsOptional()
  @IsString()
  size?: string;
  @IsOptional()
  @IsNullable()
  @IsString()
  sortFunction?: string;

  // Filter-parameters
  @IsOptional()
  @IsNullable()
  @IsString()
  q?: string;
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  category?: string[];
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  level?: string[];
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  studyLocation?: string[];
  @IsOptional()
  @IsNullable()
  @IsBooleanString()
  distance?: boolean;
  @IsOptional()
  @IsNullable()
  @IsBooleanString()
  cost?: boolean;
  @IsOptional()
  @IsNullable()
  @IsString()
  latestApplicationDate?: string;
  @IsOptional()
  @IsNullable()
  @IsString()
  startDate?: string;
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  scope?: string[];
}

class EducationStatisticsFilterOptions {
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  categories?: string[];
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  levels?: string[];
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  studyLocations?: string[];
  @IsOptional()
  @IsNullable()
  @IsString()
  startDate?: string;
  @IsOptional()
  @IsNullable()
  @IsString()
  endDate?: string;
}

export const defaultStudyLocations = ['Härnösand', 'Kramfors', 'Sollefteå', 'Sundsvall', 'Timrå', 'Ånge', 'Örnsköldsvik'];
export const defaultLevels = [
  'AUB',
  'grundläggande vuxenutbildning',
  'gymnasial vuxenutbildning',
  'gymnasieskola',
  'högskoleutbildning',
  'Kommunal vuxenutbildning som anpassad utbildning på grundläggande nivå',
  'Kommunal vuxenutbildning som anpassad utbildning på gymnasial nivå',
  'yrkeshögskoleutbildning',
];

@Controller()
export class EducationsController {
  getFilter = async (req: RequestWithUser, filter: GetEducationFilter) => {
    try {
      const url = `/education-finder/3.0/${MUNICIPALITY_ID}/courses/filters/${filter}/values`;
      const res = await cs.use(req).apiService.get<string[]>({ url });

      if (Array.isArray(res.data) && res.data.length < 1) {
        throw new HttpException(404, 'Not Found');
      }

      return res.data;
    } catch (err) {
      throw new HttpException(500, `Failed to fetch ${filter}: ${err}`);
    }
  };

  getSortProperties(input: string): string[] {
    return input.split(';')?.map(pair => pair.split(',')[0]);
  }

  getSortDirection(input: string): string {
    if (!input) return 'ASC';
    const [firstPair] = input.split(';');
    const [, direction] = firstPair.split(',');
    return direction?.toUpperCase() ?? 'ASC';
  }

  @Get('/education-events')
  @OpenAPI({ summary: 'Return education events' })
  async getEducationEvents(
    @Req() req: RequestWithUser,
    @QueryParam('filter') filter?: EducationFilterOptions,
  ): Promise<DataResponse<PagedCoursesResponse>> {
    const url = `/education-finder/3.0/${MUNICIPALITY_ID}/courses`;
    const params = {
      // Pagination parameters
      page: filter?.page !== undefined ? parseInt(filter.page) : undefined,
      limit: filter?.size ?? undefined,
      sortBy: filter?.sortFunction ? this.getSortProperties(filter?.sortFunction) : undefined,
      sortDirection: this.getSortDirection(filter?.sortFunction),

      // Filter parameters
      searchString: filter?.q ?? undefined,
      categories: filter?.category ?? undefined,
      levels: filter?.level ?? defaultLevels,
      studyLocations: filter?.studyLocation ?? undefined,
      distance: filter?.distance ?? undefined,
      latestApplicationAfter: filter?.latestApplicationDate ?? undefined,
      startAfter: filter?.startDate ?? undefined,
      scopes: filter?.scope ?? undefined,
    };

    const res = await cs.use(req).apiService.get<PagedCoursesResponse>({ url, params });

    if (Array.isArray(res.data) && res.data.length < 1) {
      throw new HttpException(404, 'Not Found');
    }

    return { data: res.data, message: 'success' };
  }

  @Get('/education-events/event/:id')
  @OpenAPI({ summary: 'Return education events' })
  async getEducationEvent(@Param('id') id: string, @Req() req: RequestWithUser): Promise<DataResponse<Course>> {
    const url = `/education-finder/3.0/${MUNICIPALITY_ID}/courses/${id}`;

    const res = await cs.use(req).apiService.get<Course>({ url });

    return { data: res.data, message: 'success' };
  }

  @Get('/education-events/filters')
  @OpenAPI({ summary: 'Return education events filters' })
  @UseBefore(hpp({ whitelist: ['filters'] }))
  async getEducationEventsFilters(
    @QueryParam('filters', { isArray: true }) filters: GetEducationFilter[],
    @Req() req: RequestWithUser,
  ): Promise<DataResponse<GetEducationFiltersResponseData>> {
    let data: GetEducationFiltersResponseData = {};
    await Promise.all(
      filters.map(async filter => {
        if (filter === 'studyLocation') {
          data[filter] = defaultStudyLocations;
        } else if (filter === 'level') {
          data[filter] = defaultLevels;
        } else {
          data[filter] = await this.getFilter(req, filter);
        }
      }),
    );

    return { data: data, message: 'success' };
  }

  @Get('/education-events/statistics')
  @OpenAPI({ summary: 'Return education events' })
  async getEducationEventsStatistics(
    @Req() req: RequestWithUser,
    @QueryParam('filter') filter?: EducationStatisticsFilterOptions,
  ): Promise<DataResponse<Statistics>> {
    const url = `/education-finder/3.0/${MUNICIPALITY_ID}/statistics`;

    const params = {
      // Filter parameters
      levels: filter?.levels.join(', ') ?? undefined,
      studyLocations: filter?.studyLocations.join(', ') ?? undefined,
      categories: filter?.categories.join(', ') ?? undefined,
      startDate: filter?.startDate ?? undefined,
      endDate: filter?.endDate ?? undefined,
    };

    const res = await cs.use(req).apiService.get<Statistics>({ url, params });

    if (Array.isArray(res.data) && res.data.length < 1) {
      throw new HttpException(404, 'Not Found');
    }

    return { data: res.data, message: 'success' };
  }
}
