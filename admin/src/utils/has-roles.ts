import { UserIdentity } from 'react-admin';
import { User } from '../interfaces/user';

type HasRolesFn = (user: UserIdentity | undefined, roles: User['roles'], variant?: 'some' | 'every') => boolean;
export const hasRoles: HasRolesFn = (user, roles, variant = 'some') =>
  user ? roles[variant as 'some' | 'every']((role) => user.roles.includes(role)) : false;
