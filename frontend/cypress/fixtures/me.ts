import { User } from '@interfaces/user';

export const meEducationCoordinator: User = {
  id: 1,
  username: 'John Doe',
  role: 'EDUCATIONCOORDINATOR',
  permissions: {
    adminEdit: false,
    adminRegistrate: true,
    adminEditAccounts: false,
    userSaveSearches: true,
    userSaveInterests: true,
  },
};
