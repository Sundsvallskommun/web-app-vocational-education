import { User, Permissions } from '@interfaces/user';
import { ApiResponse } from '@services/api-service';
import dayjs from 'dayjs';

export const defaultPermissions: Permissions = {
  adminEdit: false,
  adminRegistrate: false,
  userSaveSearches: false,
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

export const emptyUserSavedInterest = {
  studyLocation: [],
  category: '',
  level: '',
  timeInterval: '12',
  timeIntervalFrom: dayjs(new Date()).format('YYYY-MM-DD'),
};
