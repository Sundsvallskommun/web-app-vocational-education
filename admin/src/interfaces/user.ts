import { Identifier } from 'react-admin';

export enum UserRoleEnum {
  USER,
  EDUCATIONCOORDINATOR,
  EDITOR,
  ADMIN,
}
export type UserRoles = 'USER' | 'EDUCATIONCOORDINATOR' | 'EDITOR' | 'ADMIN';
export type UserRole = { id: number; name: UserRoleEnum };

export interface Permissions {
  adminEdit: boolean;
  adminRegistrate: boolean;
  adminEditAccounts: boolean;
}

export interface User {
  id: Identifier;
  username: string;
  roles: UserRoles[];
  permissions: Permissions;
}

export interface UserRoleOnUser {
  id: number;
  role: UserRoles;
  username?: User['username'];
}
