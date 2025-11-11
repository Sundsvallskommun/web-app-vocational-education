import { User } from '@interfaces/users.interface';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  export interface Request extends Request {
    user: SessionUser;
  }
}
