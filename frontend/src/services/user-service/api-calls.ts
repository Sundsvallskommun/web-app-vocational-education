import { ServiceResponse } from '@interfaces/service';
import {
  User,
  UserSavedSearch,
  UserSavedSearchDto,
  UserSavedInterestDto,
  UserSavedSearchResponse,
  LoginCredentials,
  UserSavedInterest,
} from '@interfaces/user';
import { apiService, ApiResponse } from '@services/api-service';
import {
  handleSetUserResponse,
  handleGetUserSavedSearchResponse,
  handleGetUserSavedSearchesResponse,
  handleGetUserSavedInterestResponse,
  handleGetUserSavedInterestsResponse,
} from './data-handlers';

export const getMe: () => Promise<ServiceResponse<User>> = () => {
  return apiService
    .get<ApiResponse<User>>('me')
    .then((res) => ({ data: handleSetUserResponse(res.data) }))
    .catch((err) => {
      return Promise.reject(err.response?.data?.message);
    });
};

export const newUserSavedSearch: (
  UserSavedSearchDto: UserSavedSearchDto
) => Promise<ServiceResponse<UserSavedSearch>> = (UserSavedSearchDto) => {
  return apiService
    .post<ApiResponse<UserSavedSearchResponse>>('/user/saved-searches', UserSavedSearchDto)
    .then((res) => ({ data: handleGetUserSavedSearchResponse(res.data.data) }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const getUserSavedSearches: () => Promise<ServiceResponse<UserSavedSearch[]>> = () => {
  return apiService
    .get<ApiResponse<UserSavedSearchResponse[]>>('/user/saved-searches')
    .then((res) => ({ data: handleGetUserSavedSearchesResponse(res.data) }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const deleteUserSavedSearch: (id: number) => Promise<ServiceResponse<boolean>> = (id) => {
  return apiService
    .delete<ApiResponse<boolean>>(`/user/saved-searches/${id}`)
    .then(() => ({ data: true }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const newUserSavedInterest: (
  UserSavedInterestDto: UserSavedInterestDto
) => Promise<ServiceResponse<UserSavedInterest>> = (UserSavedInterestDto) => {
  return apiService
    .post<ApiResponse<UserSavedInterest>>('/user/saved-interests', UserSavedInterestDto)
    .then((res) => ({ data: handleGetUserSavedInterestResponse(res.data.data) }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const editUserSavedInterest: (
  id: number,
  UserSavedInterestDto: UserSavedInterestDto
) => Promise<ServiceResponse<UserSavedInterest>> = (id, UserSavedInterestDto) => {
  return apiService
    .patch<ApiResponse<UserSavedInterest>>(`/user/saved-interests/${id}`, UserSavedInterestDto)
    .then((res) => ({ data: handleGetUserSavedInterestResponse(res.data.data) }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const getUserSavedInterests: () => Promise<ServiceResponse<UserSavedInterest[]>> = () => {
  return apiService
    .get<ApiResponse<UserSavedInterest[]>>('/user/saved-interests')
    .then((res) => ({ data: handleGetUserSavedInterestsResponse(res.data) }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const deleteUserSavedInterest: (id: number) => Promise<ServiceResponse<boolean>> = (id) => {
  return apiService
    .delete<ApiResponse<boolean>>(`/user/saved-interests/${id}`)
    .then(() => ({ data: true }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const login: (credentials: LoginCredentials) => Promise<ServiceResponse<boolean, string>> = (credentials) => {
  return apiService
    .post<ApiResponse<boolean>>('/login', credentials)
    .then(() => ({ data: true, message: 'success' }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const verify2FA: (twoFactorCode: string) => Promise<ServiceResponse<User, string>> = (twoFactorCode) => {
  return apiService
    .post<ApiResponse<User>>('/verify-2fa', { code: twoFactorCode })
    .then((res) => ({ data: handleSetUserResponse(res.data), message: 'success' }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};

export const logout: () => Promise<ServiceResponse<boolean>> = () => {
  return apiService
    .post<ApiResponse<string>>('/logout', {})
    .then(() => ({ data: true, message: 'success' }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};
