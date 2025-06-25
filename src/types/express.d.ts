import { Request } from 'express';

import UserEntity from '@/domain/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity; // The '?' makes it optional
    }
  }
}
