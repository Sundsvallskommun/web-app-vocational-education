import { User, UserSavedInterest, UserSavedSearch, UserSavedSearchResponse } from '@interfaces/user';
import { ApiResponse } from '@services/api-service';
import { emptyEducationFilterOptions } from '@services/education-service/education-service';
import { createObjectFromQueryString } from '@utils/url';
import { omit } from '@sk-web-gui/react';

export const handleSetUserResponse: (res: ApiResponse<User>) => User = (res) => ({
  id: res.data.id,
  username: res.data.username,
  role: res.data.role,
  permissions: res.data.permissions,
});

// Saved searches
export const handleGetUserSavedSearchResponse: (data: UserSavedSearchResponse) => UserSavedSearch = (data) => ({
  id: data.id,
  searchTerm: data.searchTerm,
  parameters: data.parameters,
  educationFilterOptions: createObjectFromQueryString(data.parameters, {
    objectReference: omit(emptyEducationFilterOptions, ['q']),
    objectReferenceOnly: true,
  }),
});

export const handleGetUserSavedSearchesResponse: (res: ApiResponse<UserSavedSearchResponse[]>) => UserSavedSearch[] = (
  res
) => res.data.map((x) => handleGetUserSavedSearchResponse(x));

// Saved interests
export const handleGetUserSavedInterestResponse: (data: UserSavedInterest) => UserSavedInterest = (data) => ({
  id: data.id,
  category: data.category,
  level: data.level,
  studyLocation: data.studyLocation,
  timeInterval: data.timeInterval,
  timeIntervalFrom: data.timeIntervalFrom,
  timeIntervalTo: data.timeIntervalTo,
  ongoing: data.ongoing,
  capacity: data.capacity,
  planned: data.planned,
  available: data.available,
  ended: data.ended,
  freetext: data.freetext,
  updatedAt: data.updatedAt,
});

export const handleGetUserSavedInterestsResponse: (res: ApiResponse<UserSavedInterest[]>) => UserSavedInterest[] = (
  res
) => res.data.map((x) => handleGetUserSavedInterestResponse(x));
