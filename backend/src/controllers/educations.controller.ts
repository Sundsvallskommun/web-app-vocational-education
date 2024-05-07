import { HttpException } from '@/exceptions/HttpException';
import DataResponse from '@/interfaces/dataResponse.interface';
import ApiService from '@/services/api.service';
import { IsNullable } from '@/utils/custom-validation-classes';
import { IsArray, IsBooleanString, IsOptional, IsString } from 'class-validator';
import { Controller, Get, QueryParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

class EducationFilterOptions {
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
  category?: string;
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  type?: string[];
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  location?: string[];
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
  latestApplicationDate?: Date;
  @IsOptional()
  @IsNullable()
  @IsString()
  startDate?: Date;
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  paceOfStudy?: string[];
}

const defaultStudyLocations = ['Härnösand', 'Kramfors', 'Sollefteå', 'Sundsvall', 'Timrå', 'Ånge', 'Örnsköldsvik'];

@Controller()
export class EducationsController {
  private apiService = new ApiService();

  @Get('/education-events')
  @OpenAPI({ summary: 'Return education events' })
  async getEducationEvents(@QueryParam('filter') filter?: EducationFilterOptions): Promise<DataResponse<any[]>> {
    const url = `/education-finder/1.1/courses`;

    const params = {
      // Pagination parameters
      page: filter?.page !== undefined ? parseInt(filter.page) - 1 : undefined,
      size: filter?.size ?? undefined,
      sort: filter?.sortFunction ? filter?.sortFunction.split(';') : undefined,

      // Filter parameters
      searchString: filter?.q ?? undefined,
      level: filter?.type ?? undefined,
      scope: filter?.paceOfStudy ?? undefined,
      // Update to this when API is updated with multi for-> studyLocation: filter?.location ?? defaultStudyLocations,
      studyLocation: filter?.location?.join(',') ?? undefined,
      latestApplicationBefore: filter?.latestApplicationDate ?? undefined,
      startAfter: filter?.startDate ?? undefined,

      // category = areaIds parameter?
      // distance: filter?.distance ? filter.distance : undefined,
    };

    const res = await this.apiService.get<any>({ url, params });

    if (Array.isArray(res.data) && res.data.length < 1) {
      throw new HttpException(404, 'Not Found');
    }

    return { data: res.data, message: 'success' };
  }
}
