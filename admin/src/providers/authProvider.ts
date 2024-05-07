import { AuthProvider } from 'react-admin';
import { User } from '../interfaces/user';
import { loginURL, logoutURL } from '../utils/api-url';
import { ApiResponse, ServiceResponse, apiService } from './apiProvider';

const handleSetUserResponse: (res: ApiResponse<User>) => User = (res) => ({
  id: res.data.id ?? 'null',
  fullName: res.data.username, // for react-admin Identity
  username: res.data.username,
  role: res.data.role,
  permissions: res.data.permissions,
});

const getMe: () => Promise<ServiceResponse<User>> = () => {
  return apiService
    .get<ApiResponse<User>>('me')
    .then((res) => ({ data: handleSetUserResponse(res.data) }))
    .catch((err) => ({
      error: true,
      message: err?.response?.data?.message,
    }));
};

const userDefaults: User = {
  id: 'null',
  username: '',
  role: 'USER',
  permissions: {
    adminEdit: false,
    adminRegistrate: false,
    adminEditAccounts: false,
  },
};

export const authProvider: AuthProvider = {
  login: async () => {
    window.location.href = loginURL();
    return Promise.resolve();
  },
  logout: (error) => {
    window.location.href = logoutURL();
    return Promise.reject();
  },
  checkError: (error) => {
    return Promise.resolve();
  },
  checkAuth: async () => {
    return Promise.resolve();
  },
  getPermissions: async (): Promise<User['permissions']> => {
    const res = await getMe();
    if (res.data) {
      if (res.data.role === 'USER') {
        window.location.href = `${loginURL()}&failMessage=MISSING_PERMISSIONS`;
      }
      return Promise.resolve(res.data.permissions);
    } else {
      return Promise.resolve(userDefaults.permissions);
    }
  },
  getIdentity: async (): Promise<User> => {
    const res = await getMe();
    if (res.data) {
      if (res.data.role === 'USER') {
        window.location.href = `${loginURL()}&failMessage=MISSING_PERMISSIONS`;
      }
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve(userDefaults);
    }
  },
};

export default authProvider;
