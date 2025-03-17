import { defaultLevels, defaultStudyLocations, EducationFilterOptions } from '@/controllers/educations.controller';
import { PagedCoursesResponse, Statistics } from '@/data-contracts/education-finder/data-contracts';
import { appURL } from '@/utils/app-url';
import { Request } from 'express';

export const educationFilterFromRequest = (req?: Request): Record<string, any> => {
  if (!req) return undefined;
  const filter: Record<string, string> = Object.fromEntries(new URL(appURL(req?.url)).searchParams);
  const transformedFilter: Record<string, any> = {};
  for (const key in filter) {
    if (key.startsWith('filter[')) {
      let newKey = key.replace('filter[', '').replace(']', '');
      if (newKey.includes('[')) {
        const parts = newKey.split('[');
        newKey = parts[0];
        if (!transformedFilter[newKey]) {
          transformedFilter[newKey] = [];
        }
        transformedFilter[newKey].push(filter[key]);
      } else {
        transformedFilter[newKey] = filter[key];
      }
    }
  }
  return transformedFilter;
};

export const mockedFilterCategories = [
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

export const mockedFilterScope = ['25', '50', '75', '100'];

export const mockEducationStatistics: Statistics = {
  onGoingCourses: 1,
  totalCapacity: 2,
  plannedCourses: 3,
  availableSeats: 4,
  finishedCourses: 5,
};

export const mockEducationEvent = (req?: Request) => ({
  id: req?.params?.id ?? 28912,
  code: 'TEST123',
  name: req?.params?.id ? `Test Course ${parseInt(req.params.id as string) + 1}` : 'Test Course',
  provider: 'Test University',
  providerUrl: 'https://www.test.se/',
  level: defaultLevels[0],
  url: 'test_url',
  credits: 13.5,
  scope: parseInt(mockedFilterScope[0]),
  studyLocation: defaultStudyLocations[0],
  subjectCode: '123',
  category: mockedFilterCategories[0],
  subcategory: 'Test Subcategory',
  languageOfInstruction: 'test',
  start: '2025-02-17',
  end: '2025-04-20',
  latestApplication: '2024-10-15',
  information: '<p>Test Information</p>',
});

const totalRecords = 11;
export const mockEducationEvents = (filter?: EducationFilterOptions): PagedCoursesResponse => {
  const page = filter?.page ? parseInt(filter.page) : 1;
  const size = filter?.size ? parseInt(filter.size) : 20;
  const start = (page - 1) * size;
  const educationEvent = mockEducationEvent();

  return {
    courses: Array.from({ length: Math.min(size, totalRecords - start) }, (_, i) => ({
      ...educationEvent,
      id: start + i,
      name: `Test Course ${start + i + 1}`,
    })),
    _meta: {
      page: page,
      limit: size,
      count: Math.min(size, totalRecords - start),
      totalRecords: totalRecords,
      totalPages: Math.ceil(totalRecords / size),
    },
  };
};
