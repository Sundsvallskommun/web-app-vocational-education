import { ServiceResponse } from '@interfaces/service';
import {
  LoginCredentials,
  User,
  UserSavedInterest,
  UserSavedSearch,
  UserSavedInterestDto,
  UserSavedSearchDto,
} from '@interfaces/user';
import { __DEV__ } from '@sk-web-gui/react';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { emptyUser } from './defaults';
import {
  deleteUserSavedInterest,
  deleteUserSavedSearch,
  editUserSavedInterest,
  getMe,
  getUserSavedInterests,
  getUserSavedSearches,
  login,
  logout,
  newUserSavedInterest,
  newUserSavedSearch,
  verify2FA,
} from './api-calls';

interface State {
  user: User;
  userSavedSearches: UserSavedSearch[];
  userSavedInterests: UserSavedInterest[];
}
interface Actions {
  setUser: (user: User) => void;
  getMe: () => Promise<ServiceResponse<User>>;
  getSavedSearches: () => Promise<ServiceResponse<UserSavedSearch[]>>;
  newSavedSearch: (UserSavedSearchDto: UserSavedSearchDto) => Promise<ServiceResponse<UserSavedSearch>>;
  deleteSavedSearch: (id: number) => Promise<ServiceResponse<boolean>>;
  getSavedInterests: () => Promise<ServiceResponse<UserSavedInterest[]>>;
  newSavedInterest: (UserSavedInterestDto: UserSavedInterestDto) => Promise<ServiceResponse<UserSavedInterest>>;
  editSavedInterest: (
    id: number,
    UserSavedInterestDto: UserSavedInterestDto
  ) => Promise<ServiceResponse<UserSavedInterest>>;
  deleteSavedInterest: (id: number) => Promise<ServiceResponse<boolean>>;
  login: (credentials: LoginCredentials) => Promise<ServiceResponse<boolean, string>>;
  verify2FA: (twoFactorCode: string) => Promise<ServiceResponse<User, string>>;
  logout: () => Promise<ServiceResponse<boolean>>;
  reset: () => void;
}

const initialState: State = {
  user: emptyUser,
  userSavedSearches: [],
  userSavedInterests: [],
};

export const useUserStore = createWithEqualityFn<State & Actions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      setUser: (user) => set(() => ({ user })),
      getMe: getMe,
      getSavedSearches: async () => {
        const res = await getUserSavedSearches();
        const data = (!res.error && res.data) || initialState.userSavedSearches;
        set(() => ({ userSavedSearches: data }));
        return { data, error: res.error };
      },
      newSavedSearch: async (body) => {
        const res = await newUserSavedSearch(body);
        if (!res.error) {
          await get().getSavedSearches();
        }
        return res;
      },
      deleteSavedSearch: async (id) => {
        const res = await deleteUserSavedSearch(id);
        if (!res.error) {
          await get().getSavedSearches();
        }
        return res;
      },
      getSavedInterests: async () => {
        const res = await getUserSavedInterests();
        const data = (!res.error && res.data) || initialState.userSavedInterests;
        set(() => ({ userSavedInterests: data }));
        return { data, error: res.error };
      },
      newSavedInterest: async (body) => {
        const res = await newUserSavedInterest(body);
        if (!res.error) {
          await get().getSavedInterests();
        }
        return res;
      },
      editSavedInterest: async (id, body) => {
        const res = await editUserSavedInterest(id, body);
        if (!res.error) {
          await get().getSavedInterests();
        }
        return res;
      },
      deleteSavedInterest: async (id) => {
        const res = await deleteUserSavedInterest(id);
        if (!res.error) {
          await get().getSavedInterests();
        }
        return res;
      },
      login: login,
      verify2FA: verify2FA,
      logout: logout,
      reset: () => {
        set(initialState);
      },
    }),

    { name: 'user-store', enabled: __DEV__ }
  )
);
