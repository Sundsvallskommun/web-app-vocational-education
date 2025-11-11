import { UserRoleOnUser, UserRoles } from '../../interfaces/user';

export const userRolesArray: UserRoles[] = ['USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN'];
export const userRolesChoices: UserRoleOnUser[] = userRolesArray
  .filter((x) => x !== 'USER')
  .map((x, i) => ({ id: i, role: x }));
