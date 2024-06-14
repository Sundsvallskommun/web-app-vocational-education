import { sortFilter } from '@components/form/sort-function.input.component';
import { Course, EducationFilterOptions, PagedCoursesResponse, PagingMetaData } from '@interfaces/education';
import { ValueOf } from '@utils/types';
import { objToQueryString } from '@utils/url';
import dayjs from 'dayjs';
import { ApiResponse, apiService } from '../api-service';

export const emptyEducationFilterOptions: EducationFilterOptions = {
  q: '',
  sortFunction: sortFilter[0].value,
  category: [],
  type: [],
  location: [],
  distance: '',
  latestApplicationDate: '',
  startDate: '',
  paceOfStudy: [],
};

export const defaultEducationFilterOptions: EducationFilterOptions = {
  page: 1,
  size: 10,
  q: '',
  sortFunction: sortFilter[0].value,
  category: [],
  type: [],
  location: [],
  distance: '',
  latestApplicationDate: '',
  startDate: dayjs(new Date()).format('YYYY-MM-DD'),
  paceOfStudy: [],
};

export const educationFilterTagLabels = {
  sortFunction: 'Sortera',
  category: 'Utbildningskategori',
  type: 'Utbildningstyp',
  location: 'Plats',
  distance: 'Distansutbildning',
  latestApplicationDate: 'Sista ansökningsdatum',
  startDate: 'Startdatum',
  paceOfStudy: 'Studietakt',
};

export const getEducationFilterValueString = (filter, value) => {
  switch (filter) {
    case 'sortFunction':
      return sortFilter.find((choice) => choice.value === value).label;
    case 'category':
      return value.join(' | ');
    case 'type':
      return value.join(' | ');
    case 'location':
      return value.join(' | ');
    case 'distance':
      return value === 'true' ? 'Ja' : 'Nej';
    case 'latestApplicationDate':
      return value;
    case 'startDate':
      return value;
    case 'paceOfStudy':
      return value.map((x) => `${x}%`).join(' | ');
    default:
      return '';
  }
};

export const getFilterOptionString = (filter, value) => {
  return `${educationFilterTagLabels[filter]}: ${getEducationFilterValueString(filter, value)}`;
};

export const getValidValue = <TFallback = null>(
  key: string,
  value: string | string[],
  fallback: TFallback
): Record<string, TFallback> => {
  const validValues = {
    sortFunction: sortFilter.map((x) => x.value).includes(value as string) ? value : fallback,
    category: Array.isArray(value) && value[0] ? value : fallback,
    type: Array.isArray(value) && value[0] ? value : fallback,
    location: Array.isArray(value) && value[0] ? value : fallback,
    distance: ['true', 'false'].includes(value as string) ? value : fallback,
    latestApplicationDate: value ? value : fallback,
    startDate: value ? value : fallback,
    paceOfStudy: Array.isArray(value) && value[0] ? value : fallback,
  };
  return validValues[key];
};

export const getFilterDataStrings: {
  <TFallback = null>(
    filterData: Partial<EducationFilterOptions>,
    fallback: TFallback
  ): Partial<Record<keyof EducationFilterOptions, ValueOf<EducationFilterOptions> | TFallback>>;
} = (filterData, fallback) => {
  const filterDataStrings = Object.assign({}, filterData, {
    sortFunction: getValidValue('sortFunction', filterData.sortFunction, fallback),
    category: getValidValue('category', filterData.category, fallback),
    type: getValidValue('type', filterData.type, fallback),
    location: getValidValue('location', filterData.location, fallback),
    distance: getValidValue('distance', filterData.distance, fallback),
    latestApplicationDate: getValidValue('latestApplicationDate', filterData.latestApplicationDate, fallback),
    startDate: getValidValue('startDate', filterData.startDate, fallback),
    paceOfStudy: getValidValue('paceOfStudy', filterData.paceOfStudy, fallback),
  });
  return filterDataStrings;
};

export const getSearchParamsFromEducationSearchFilters = (filterData: EducationFilterOptions): string => {
  return objToQueryString(getFilterDataStrings(filterData, ''));
};

export const handleGetEducationEvents: (courses: Course[]) => Course[] = (courses) =>
  courses.map((course, index) => ({
    id: index, // FIXME: CRITICAL: Should be id from endpoint, this is temporary fix
    code: course.code,
    name: course.name,
    provider: course.provider,
    providerUrl: course.providerUrl,
    level: course.level,
    url: course.url,
    credits: course.credits,
    scope: course.scope,
    studyLocation: course.studyLocation,
    subjectCode: course.subjectCode,
    numberOfSeats: course.numberOfSeats,
    start: course.start,
    end: course.end,
    earliestApplication: course.earliestApplication,
    latestApplication: course.latestApplication,
    information: course.information,
  }));

export const handleGetEducationEventsMeta: (_meta: PagingMetaData) => PagingMetaData = (_meta) => ({
  page: _meta.page,
  limit: _meta.limit,
  count: _meta.count,
  totalRecords: _meta.totalRecords,
  totalPages: _meta.totalPages,
});

export const getEducationEvents: (
  filterData: EducationFilterOptions
) => Promise<{ courses: Course[]; _meta?: PagingMetaData; error?: unknown }> = (filterData) => {
  return apiService
    .get<ApiResponse<PagedCoursesResponse>>(`education-events`, {
      params: { filter: getFilterDataStrings(filterData, null) },
    })
    .then((res) => {
      console.log('getEducationEvents', res);
      return res;
    })
    .then((res) => ({
      courses: handleGetEducationEvents(res?.data?.data?.courses),
      _meta: handleGetEducationEventsMeta(res?.data?.data?._meta),
    }))
    .catch((e) => ({
      courses: [],
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

const langCodes = new Map([
  ['swe', 'Svenska'],
  ['eng', 'Engelska'],
]);

export const getLangString: (_langCodes: string[]) => string = (_langCodes) => {
  return _langCodes.map((code) => langCodes.get(code)).join(', ');
};

export const getEducationLengthString: (start: string, end: string) => string = (start, end) => {
  const days = Math.abs(dayjs(end).diff(start, 'day'));
  const weeks = Math.abs(dayjs(end).diff(start, 'week'));
  const years = Math.abs(dayjs(end).diff(start, 'year'));

  if (!start || !end) return null;

  if (weeks > 52 && years % 0.5 == 0) {
    return years + ' år';
  } else if (days > 7) {
    return Math.round(weeks) + ' veckor';
  } else {
    return days + ' dagar';
  }
};
