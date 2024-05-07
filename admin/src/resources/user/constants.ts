import { UserRoles } from '../../interfaces/user';

export const userRolesArray: UserRoles[] = ['USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN'];
export const userRolesChoices: { id: number; name: UserRoles }[] = userRolesArray.map((x, i) => ({ id: i, name: x }));
