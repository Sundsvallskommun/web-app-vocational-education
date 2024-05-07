import { ClientUser, User as InternalUser } from '@/interfaces/users.interface';
import { User } from '@prisma/client';
import { getPermissions } from './authorization.service';

export const getUser = (user: User): InternalUser => ({
  id: user.id,
  username: user.username,
  role: user.role,
  email: user.email,
  permissions: getPermissions([user.role], true),
});

export const getClientUser = (user: InternalUser): ClientUser => ({
  id: user.id,
  username: user.username,
  role: user.role,
  permissions: getPermissions([user.role], true),
});
