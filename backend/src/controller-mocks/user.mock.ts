import { ClientUser, SessionUser } from '@/interfaces/users.interface';
import { MockServices } from '@/services/controller.service';
import { User_SavedInterest, User_SavedSearch } from '@prisma/client';
import { mockEducationStatistics } from './educations.mock';
import { ControllerEndpointMocks } from './types';

export const mockClientUser: ClientUser = {
  id: 1,
  username: 'admin',
  roles: ['ADMIN', 'EDUCATIONCOORDINATOR'],
  permissions: {
    adminEdit: true,
    adminRegistrate: true,
    adminEditAccounts: true,
    userSaveSearches: true,
    userSaveInterests: true,
  },
};

export const mockSessionUser: SessionUser = {
  id: 1,
  username: 'admin',
  email: 'mail@example.com',
  roles: ['ADMIN', 'EDUCATIONCOORDINATOR'],
  permissions: { adminEdit: true, adminRegistrate: true, adminEditAccounts: true, userSaveSearches: true, userSaveInterests: true },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserSavedInterestPrisma: User_SavedInterest = {
  id: 1,
  userId: 1,
  category: 'category',
  studyLocation: 'studyLocation',
  level: 'level',
  timeInterval: '12',
  timeIntervalFrom: new Date().toDateString(),
  timeIntervalTo: new Date().toDateString(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserSavedSearchPrisma: User_SavedSearch = {
  id: 1,
  userId: 1,
  searchTerm: 'el',
  parameters: 'q=el&latestApplicationDate=2025-02-13&page=1&size=10&sortFunction=latestApplication%2Casc%3Bname%2Casc',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userMocks = {
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
          findMany: async () => [mockUserSavedSearchPrisma],
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
} satisfies ControllerEndpointMocks<MockServices>;
