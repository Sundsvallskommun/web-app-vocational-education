import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import DataResponse from '@/interfaces/dataResponse.interface';
import ApiService from '@/services/api.service';
import { IsNullable } from '@/utils/custom-validation-classes';
import { IsArray, IsBooleanString, IsOptional, IsString } from 'class-validator';
import hpp from 'hpp';
import { Controller, Get, QueryParam, Req, UseBefore } from 'routing-controllers';
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
  latestApplicationDate?: Date;
  @IsOptional()
  @IsNullable()
  @IsString()
  startDate?: Date;
  @IsOptional()
  @IsNullable()
  @IsArray()
  @IsString({ each: true }) // https://github.com/typestack/routing-controllers/issues/123
  scope?: string[];
}

type GetEducationFilter = 'level' | 'scope' | 'studyLocation' | 'category';
type GetEducationFilters = GetEducationFilter[];
type GetEducationFiltersResponseData = {
  [key in GetEducationFilter]?: string[];
};

const defaultStudyLocations = ['Härnösand', 'Kramfors', 'Sollefteå', 'Sundsvall', 'Timrå', 'Ånge', 'Örnsköldsvik'];

@Controller()
export class EducationsController {
  private apiService = new ApiService();

  getFilter = async (filter: GetEducationFilter) => {
    try {
      const url = `/education-finder/1.1/courses/filters/${filter}/values`;
      const res = await this.apiService.get<string[]>({ url });

      if (Array.isArray(res.data) && res.data.length < 1) {
        throw new HttpException(404, 'Not Found');
      }

      return res.data;
    } catch {
      throw new HttpException(500, `Failed to fetch ${filter}`);
    }
  };

  @Get('/education-events')
  @OpenAPI({ summary: 'Return education events' })
  async getEducationEvents(@QueryParam('filter') filter?: EducationFilterOptions): Promise<DataResponse<any[]>> {
    const url = `/education-finder/1.1/courses`;
    console.log('filter', filter);
    const params = {
      // Pagination parameters
      page: filter?.page !== undefined ? parseInt(filter.page) - 1 : undefined,
      size: filter?.size ?? undefined,
      sort: filter?.sortFunction ? filter?.sortFunction.split(';') : undefined,

      // Filter parameters
      searchString: filter?.q ?? undefined,
      level: filter?.level ?? undefined,
      scope: filter?.scope ?? undefined,
      studyLocation: filter?.studyLocation ?? defaultStudyLocations,
      latestApplicationBefore: filter?.latestApplicationDate ?? undefined,
      startAfter: filter?.startDate ?? undefined,

      category: filter?.category ?? undefined,
      // distance: filter?.distance ? filter.distance : undefined,
    };

    const res = await this.apiService.get<any>({ url, params });

    if (Array.isArray(res.data) && res.data.length < 1) {
      throw new HttpException(404, 'Not Found');
    }

    return { data: res.data, message: 'success' };
  }

  @Get('/education-events/filters')
  @OpenAPI({ summary: 'Return education events filters' })
  @UseBefore(hpp({ whitelist: ['filters'] }))
  async getEducationEventsFilters(
    @QueryParam('filters', { isArray: true }) filters: GetEducationFilter[],
  ): Promise<DataResponse<GetEducationFiltersResponseData>> {
    let data: GetEducationFiltersResponseData = {};
    await Promise.all(
      filters.map(async filter => {
        if (filter === 'studyLocation') {
          data[filter] = defaultStudyLocations;
        } else if (filter === 'category') {
          data[filter] = [
            'BYGG OCH ANLÄGGNING',
            'DATA OCH IT',
            'EKONOMI, MARKNADSFÖRING OCH ADMINISTRATION',
            'FRISK- OCH SKÖNHETSVÅRD',
            'FÖRBEREDANDE UTBILDNINGAR',
            'HANTVERK',
            'HOTELL, RESTAURANG OCH TURISM',
            'INFORMATION OCH MEDIA',
            'KONSTNÄRLIGA UTBILDNINGAR',
            'KULTUR OCH HUMANISTISKA ÄMNEN',
            'MEDICIN OCH VÅRD',
            'NATURBRUK',
            'NATURVETENSKAP',
            'SAMHÄLLSVETENSKAP OCH JURIDIK',
            'SPRÅK',
            'SÄKERHET, FÖRSVAR OCH RÄDDNINGSTJÄNST',
            'TEKNIK',
            'TILLVERKNING OCH UNDERHÅLL',
            'TRANSPORT',
            'UNDERVISNING OCH IDROTT',
            'ÖVRIGA KURSER OCH TVÄRVETENSKAP',
          ];
        } else {
          data[filter] = await this.getFilter(filter);
        }
      }),
    );

    return { data: data, message: 'success' };
  }
}
