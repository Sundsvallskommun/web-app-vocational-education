import { defaultLevels, defaultStudyLocations } from '@/controllers/educations.controller';
import { ClientUser, SessionUser } from '@/interfaces/users.interface';
import { User_SavedInterest, User_SavedSearch } from '@prisma/client';
import { mockedFilterCategories } from './educations.mock';
import dayjs from 'dayjs';
import _ from 'lodash';

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

export const mockLoggedInUser = ({ req }) => ({
  req: _.merge(req, {
    isAuthenticated: function () {
      return true;
    },
    session: {
      user: mockSessionUser,
      twoFactorAuthenticated: true,
    },
    user: mockClientUser,
  }),
});

export const mockUserSavedInterestPrisma: User_SavedInterest = {
  id: 1,
  userId: 1,
  category: mockedFilterCategories[0],
  studyLocation: defaultStudyLocations[0],
  level: defaultLevels[0],
  timeInterval: '12',
  timeIntervalFrom: dayjs('2024-12-12').format('YYYY-MM-DD'),
  timeIntervalTo: dayjs('2024-12-12').format('YYYY-MM-DD'),
  createdAt: dayjs('2024-12-12').toDate(),
  updatedAt: dayjs('2024-12-12').toDate(),
};

export const mockUserSavedSearchPrisma: User_SavedSearch = {
  id: 1,
  userId: 1,
  searchTerm: 'el',
  parameters: 'latestApplicationDate=2025-02-13&page=1&size=10&sortFunction=latestApplication%2Casc%3Bname%2Casc',
  createdAt: new Date(),
  updatedAt: new Date(),
};
