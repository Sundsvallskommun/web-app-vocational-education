import { EducationFilterOptions } from './education';

export interface Permissions {
  adminEdit: boolean;
  adminRegistrate: boolean;
  userSaveSearches: boolean;
}

export interface User {
  id: number;
  username: string;
  role: string;
  permissions: Permissions;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserSavedSearchResponse {
  id: number;
  searchTerm: string;
  parameters: string;
}

export interface UserSavedSearch {
  id: number;
  searchTerm: string;
  parameters: string;
  educationFilterOptions: Partial<EducationFilterOptions>;
}

export interface UserSavedSearchDto {
  searchTerm: string;
  parameters: string;
}

interface UserSavedInterestResponse {
  id: number;
  category: string;
  type: string;
  location: string[];
  timeInterval: string;
  timeIntervalTo?: string;
  timeIntervalFrom?: string;
  updatedAt: string;
}

export interface UserSavedInterest extends UserSavedInterestResponse {
  ongoing: number;
  capacity: number;
  planned: number;
  available: number;
  ended: number;
  freetext: string;
}

export interface UserSavedInterestDto {
  category: string;
  type: string;
  location: string[];
  timeInterval: string;
  timeIntervalTo?: string;
  timeIntervalFrom?: string;
}
