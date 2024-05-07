import { UserRole } from '@prisma/client';

export interface Permissions {
  adminEdit: boolean;
  adminRegistrate: boolean;
  adminEditAccounts: boolean;
  userSaveSearches: boolean;
  userSaveInterests: boolean;
}

export type RolesMap = Map<UserRole, Partial<Permissions>>;

export interface User {
  id: number;
  username: string;
  role: UserRole;
  permissions: Permissions;
  email: string;
}
export interface ClientUser {
  id: number;
  username: string;
  role: UserRole;
  permissions: Permissions;
}
