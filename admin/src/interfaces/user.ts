import { Identifier } from 'react-admin';

export interface Permissions {
  adminEdit: boolean;
  adminRegistrate: boolean;
  adminEditAccounts: boolean;
}

export interface User {
  id: Identifier;
  username: string;
  role: string;
  permissions: Permissions;
}

export type UserRoles = 'USER' | 'EDUCATIONCOORDINATOR' | 'EDITOR' | 'ADMIN';
