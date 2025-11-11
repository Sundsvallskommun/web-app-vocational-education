import { ClientUser, SessionUser } from '@/interfaces/users.interface';

// export const getUser = (user: PrismaUser): InternalUser => ({
//   id: user.id,
//   username: user.username,
//   roles: getRoles(user.roles),
//   email: user.email,
//   permissions: getPermissions(user.roles, true),
// });

export const getClientUser = (user: SessionUser): ClientUser => ({
  id: user.id,
  username: user.username,
  roles: user.roles,
  permissions: user.permissions,
});
