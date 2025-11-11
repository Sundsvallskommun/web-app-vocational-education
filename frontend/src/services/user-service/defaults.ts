import { User, Permissions, UserSavedInterestDto } from '@interfaces/user';
import { ApiResponse } from '@services/api-service';
import dayjs from 'dayjs';

export const defaultPermissions: Permissions = {
  adminEdit: false,
  adminRegistrate: false,
  adminEditAccounts: false,
  userSaveSearches: false,
  userSaveInterests: false,
};

export const emptyUser: User = {
  id: null,
  username: '',
  role: 'USER',
  permissions: defaultPermissions,
};

export const emptyUserResponse: ApiResponse<User> = {
  data: emptyUser,
  message: 'none',
};

export const emptyUserSavedInterest: UserSavedInterestDto = {
  studyLocation: [],
  category: '',
  level: '',
  timeInterval: '12',
  timeIntervalFrom: dayjs(new Date()).format('YYYY-MM-DD'),
};
