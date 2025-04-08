import { MockServices } from '@/services/controller.service';
import {
  educationFilterFromRequest,
  mockedFilterCategories,
  mockedFilterScope,
  mockEducationEvent,
  mockEducationEvents,
  mockEducationStatistics,
} from './educations.mock';
import { getMockedPage, mockedImportantDatesPage, mockedMinimalPage } from './page.mock';
import { mockClientUser, mockUserSavedInterestPrisma, mockUserSavedSearchPrisma } from './user.mock';
import { ControllerEndpointMocks } from '@/utils/controller-mocks/types';

const mocks = {
  // userMocks
  '/me': {
    get: {
      req: {
        user: mockClientUser,
      },
    },
  },
  '/user/saved-searches': {
    get: {
      prisma: {
        user_SavedSearch: {
          findMany: async () => [
            {
              ...mockUserSavedSearchPrisma,
            },
            {
              ...mockUserSavedSearchPrisma,
              searchTerm: 'el2',
            },
            {
              ...mockUserSavedSearchPrisma,
              searchTerm: 'el3',
            },
            {
              ...mockUserSavedSearchPrisma,
              searchTerm: 'el4',
            },
            {
              ...mockUserSavedSearchPrisma,
              searchTerm: 'el5',
            },
          ],
        },
      },
    },
    post: {
      prisma: {
        user_SavedSearch: {
          create: async ({ data }) => data,
        },
      },
    },
  },
  '/user/saved-searches/:id': {
    delete: {
      prisma: {
        user_SavedSearch: {
          delete: async () => mockUserSavedSearchPrisma,
        },
      },
    },
  },
  '/user/saved-interests': {
    get: {
      prisma: {
        user_SavedInterest: {
          findMany: async () => [mockUserSavedInterestPrisma],
        },
      },
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
    post: {
      prisma: {
        user_SavedInterest: {
          create: async ({ data }) => data,
        },
      },
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
  '/user/saved-interests/:id': {
    patch: {
      prisma: {
        user_SavedInterest: {
          update: async ({ data }) => data,
        },
      },
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
    delete: {
      prisma: {
        user_SavedInterest: {
          delete: async () => mockUserSavedInterestPrisma,
        },
      },
    },
  },

  // pageMocks
  '/page': {
    get: ({ req }) => ({
      prisma: {
        page: {
          findUnique: async ({ where }) => {
            if (where.pageName === 'test-important-dates') {
              return mockedImportantDatesPage;
            } else if (where.url === '/minimal') {
              return mockedMinimalPage;
            } else {
              return getMockedPage({ req });
            }
          },
        },
      },
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses')) {
            const filter = educationFilterFromRequest(req);
            return {
              data: mockEducationEvents(filter),
              message: 'success',
            };
          }
        },
      },
    }),
  },
  '/pages': {
    get: ({ req }) => ({
      prisma: {
        page: {
          findMany: async () => [
            getMockedPage({ req }),
            getMockedPage({ req: { query: { url: '/404' } } }),
            getMockedPage({ req: { query: { url: '/login' } } }),
            getMockedPage({ req: { query: { url: '/utbildningar/sok' } } }),
            getMockedPage({ req: { query: { url: '/utbildningsanordnare' } } }),
            getMockedPage({ req: { query: { url: '/minimal' } } }),
          ],
        },
      },
    }),
  },

  // educationsMocks
  '/education-events': {
    get: ({ req }) => ({
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses')) {
            const filter = educationFilterFromRequest(req);
            return {
              data: mockEducationEvents(filter),
              message: 'success',
            };
          }
        },
      },
    }),
  },
  '/education-events/event/:id': {
    get: ({ req }) => ({
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses/')) {
            return {
              data: mockEducationEvent(req),
              message: 'success',
            };
          }
        },
      },
    }),
  },
  '/education-events/filters': {
    get: {
      apiService: {
        get: async ({ url }) => {
          if (url.startsWith('/education-finder/3.0/2281/courses/filters/category/values')) {
            return {
              data: mockedFilterCategories,
              message: 'success',
            };
          } else if (url.startsWith('/education-finder/3.0/2281/courses/filters/scope/values')) {
            return {
              data: mockedFilterScope,
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

export default mocks;
