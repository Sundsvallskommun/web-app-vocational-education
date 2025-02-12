import {
  Course,
  EducationFilterOptions,
  GetEducationFilters,
  GetEducationFiltersResponseData,
  PagedCoursesResponse,
  PagingMetaData,
} from '@interfaces/education';
import { ValueOf } from '@utils/types';
import { serializeURL } from '@utils/url';
import dayjs from 'dayjs';
import { ApiResponse, apiService } from '../api-service';
import { getFormattedLabelFromValue } from '@utils/labels';
import { XMLParser } from 'fast-xml-parser';
import SanitizeHTML, { Transformer } from 'sanitize-html';
import { getObjectDifference } from '@utils/object';
import { sortFilter } from '@components/form/defaults';

export const emptyEducationFilterOptions: EducationFilterOptions = {
  page: 1,
  size: 10,
  q: '',
  sortFunction: sortFilter[0].value,
  category: [],
  level: [],
  studyLocation: [],
  distance: '',
  latestApplicationDate: '',
  startDate: '',
  scope: [],
};

export const typeReferenceEducationFilterOptions: EducationFilterOptions = {
  page: 1,
  size: 10,
  q: '',
  sortFunction: sortFilter[0].value,
  category: [''],
  level: [''],
  studyLocation: [''],
  distance: '',
  latestApplicationDate: '',
  startDate: '',
  scope: [''],
};

export const defaultEducationFilterOptions = {
  page: 1,
  size: 10,
  q: '',
  sortFunction: sortFilter[0].value,
  category: [],
  level: [],
  studyLocation: [],
  distance: '',
  latestApplicationDate: dayjs(new Date()).format('YYYY-MM-DD'),
  startDate: '',
  scope: [],
};

export const emptyDefaultDiff = () => {
  return getObjectDifference(emptyEducationFilterOptions, defaultEducationFilterOptions);
};

export const educationFilterTagLabels = {
  sortFunction: 'Sortera',
  category: 'Utbildningskategori',
  level: 'Utbildningsform',
  studyLocation: 'Plats',
  distance: 'Distansutbildning',
  latestApplicationDate: 'Sista ansökningsdatum',
  startDate: 'Start från',
  scope: 'Studietakt',
  q: 'Sökord',
  size: 'Resultat per sida',
  page: 'Sida',
  cost: 'Kostnad',
};

export const getEducationFilterValueString = (filter: keyof EducationFilterOptions, value: unknown) => {
  switch (filter) {
    case 'sortFunction':
      return sortFilter.find((choice) => choice.value === value)?.label;
    case 'category':
      return Array.isArray(value) ? value?.map((x) => getFormattedLabelFromValue(x)).join(' | ') : value;
    case 'level':
      return Array.isArray(value) ? value?.map((x) => getFormattedLabelFromValue(x)).join(' | ') : value;
    case 'studyLocation':
      return Array.isArray(value) ? value?.map((x) => getFormattedLabelFromValue(x)).join(' | ') : value;
    case 'distance':
      return value === 'true' ? 'Ja' : 'Nej';
    case 'latestApplicationDate':
      return value;
    case 'startDate':
      return value;
    case 'scope':
      return Array.isArray(value) ? value?.map((x) => x.replace('.0', '%')).join(' | ') : value;
    case 'q':
      return value;
    case 'size':
      return value;
    case 'page':
      return value;
    case 'cost':
      return value;
    default:
      return '';
  }
};

export const getFilterOptionString = (filter: keyof EducationFilterOptions, value: unknown) => {
  return value ? `${educationFilterTagLabels[filter]}: ${getEducationFilterValueString(filter, value)}` : '';
};

export const getValidValue = <TFallback = null>(
  key: string,
  value: null | undefined | string | string[],
  fallback: TFallback
) => {
  const validValues = {
    sortFunction: sortFilter.map((x) => x.value).includes(value as string) ? value : fallback,
    category: Array.isArray(value) && value[0] ? value : fallback,
    level: Array.isArray(value) && value[0] ? value : fallback,
    studyLocation: Array.isArray(value) && value[0] ? value : fallback,
    distance: ['true', 'false'].includes(value as string) ? value : fallback,
    latestApplicationDate: value ? value : fallback,
    startDate: value ? value : fallback,
    scope: Array.isArray(value) && value[0] ? value : fallback,
  };
  return value && key in validValues ? validValues[key as keyof typeof validValues] : fallback;
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
    level: getValidValue('level', filterData.level, fallback),
    studyLocation: getValidValue('studyLocation', filterData.studyLocation, fallback),
    distance: getValidValue('distance', filterData.distance, fallback),
    latestApplicationDate: getValidValue('latestApplicationDate', filterData.latestApplicationDate, fallback),
    startDate: getValidValue('startDate', filterData.startDate, fallback),
    scope: getValidValue('scope', filterData.scope, fallback),
  });
  return filterDataStrings;
};

export const getSearchParamsFromEducationSearchFilters = (filterData: EducationFilterOptions): string => {
  return serializeURL(getFilterDataStrings(filterData, ''));
};

export interface GetEducationEvents {
  courses: Course[];
  _meta?: PagingMetaData;
  error?: unknown;
}
export const getEducationEvents: (filterData: EducationFilterOptions) => Promise<GetEducationEvents> = (filterData) => {
  return apiService
    .get<ApiResponse<PagedCoursesResponse>>(`education-events`, {
      params: { filter: getFilterDataStrings(filterData, null) },
    })
    .then((res) => ({
      courses: res?.data?.data?.courses || [],
      _meta: res?.data?.data?._meta,
    }))
    .catch((e) => ({
      courses: [],
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

export const getEducationEvent: (id: string) => Promise<{ data?: Course; error?: unknown }> = (id) => {
  return apiService
    .get<ApiResponse<Course>>(`education-events/event/${id}`)
    .then((res) => ({
      data: res?.data?.data,
    }))
    .catch((e) => ({
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

export const getEducationEventsFilters: (
  filters: GetEducationFilters
) => Promise<{ data?: GetEducationFiltersResponseData; error?: unknown }> = (filters) => {
  return apiService
    .get<ApiResponse<GetEducationFiltersResponseData>>(`education-events/filters`, {
      params: { filters: filters },
    })
    .then((res) => ({ data: res.data.data }))
    .catch((e) => ({
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

export const getEducationLengthString: (start: string, end: string) => string | null = (start, end) => {
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

const parser = new XMLParser();
const cardInformationSanitizeOptions = {
  allowedTags: [
    'p',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'del',
    'div',
    'sup',
    'sub',
    'span',
    'br',
  ],
  allowedAttributes: {
    a: ['class'],
    p: ['class'],
    br: ['class'],
  },
  transformTags: {
    a: function () {
      return {
        tagName: 'span',
      };
    } as unknown as Transformer,
    p: function () {
      return {
        tagName: 'p',
        attribs: {
          class: 'my-0',
        },
      };
    } as unknown as Transformer,
    br: function () {
      return {
        tagName: 'br',
        attribs: {
          class: 'block mt-[.4rem]',
        },
      };
    } as unknown as Transformer,
  },
};
export const getSanitizedInformation = (
  information: NonNullable<Course['information']>,
  informationSanitizeOptions = cardInformationSanitizeOptions
) => {
  if (information?.includes('CDATA')) {
    const xmlParsedInformation = parser.parse(information);
    information = xmlParsedInformation ? xmlParsedInformation['#text'] : '';
  }
  return SanitizeHTML(information, informationSanitizeOptions);
};
