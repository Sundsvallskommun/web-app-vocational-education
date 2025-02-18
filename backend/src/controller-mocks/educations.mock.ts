import { PagedCoursesResponse, Statistics } from '@/data-contracts/education-finder/data-contracts';
import { MockServices } from '@/services/controller.service';
import { ControllerEndpointMocks } from './types';

export const mockEducationStatistics: Statistics = {
  onGoingCourses: 1,
  totalCapacity: 2,
  plannedCourses: 3,
  availableSeats: 4,
  finishedCourses: 5,
};

export const mockEducationEvents: PagedCoursesResponse = {
  courses: [
    {
      id: 28912,
      code: 'TEST123',
      name: 'Test Course',
      provider: 'Test University',
      providerUrl: 'https://www.test.se/',
      level: 'test level',
      url: 'test_url',
      credits: 13.5,
      scope: 100,
      studyLocation: 'Test Location',
      subjectCode: '123',
      category: 'Test Category',
      subcategory: 'Test Subcategory',
      languageOfInstruction: 'test',
      start: '2025-02-17',
      end: '2025-04-20',
      latestApplication: '2024-10-15',
      information: '<p>Test Information</p>',
    },
  ],
  _meta: {
    page: 0,
    limit: 6,
    count: 6,
    totalRecords: 15021,
    totalPages: 2504,
  },
};

export const educationsMocks = {
  '/education-events': {
    get: {
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses')) {
            return {
              data: mockEducationEvents,
              message: 'success',
            };
          }
        },
      },
    },
  },
  '/education-events/filters': {
    get: {
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses/filters/category/values')) {
            return {
              data: [
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
              ],
              message: 'success',
            };
          } else if (url.startsWith('/education-finder/3.0/2281/courses/filters/scope/values')) {
            return {
              data: ['25', '50', '75', '100'],
              message: 'success',
            };
          }
        },
      },
    },
  },
  '/education-events/statistics': {
    get: {
      apiService: {
        get: async ({ url }) => {
          if (url === '/education-finder/3.0/2281/statistics') {
            return {
              data: mockEducationStatistics,
              message: 'success',
            };
          }
        },
      },
    },
  },
} satisfies ControllerEndpointMocks<MockServices>;
