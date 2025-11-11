import { UserRole, UserRoleEnum, User as _PrismaUser } from '@prisma/client';

export interface Permissions {
  adminEdit: boolean;
  adminRegistrate: boolean;
  adminEditAccounts: boolean;
  userSaveSearches: boolean;
  userSaveInterests: boolean;
}

export type RolesMap = Map<UserRoleEnum, Partial<Permissions>>;

export interface PrismaUser extends _PrismaUser {
  roles: UserRole[];
}

export interface User {
  id: number;
  username: string;
  roles: UserRoleEnum[];
  permissions: Permissions;
  email: string;
}
export interface ClientUser {
  id: number;
  username: string;
  roles: UserRoleEnum[];
  permissions: Permissions;
}

export interface SessionUser extends Omit<PrismaUser, 'roles' | 'password'> {
  roles: UserRoleEnum[];
  permissions: Permissions;
}
