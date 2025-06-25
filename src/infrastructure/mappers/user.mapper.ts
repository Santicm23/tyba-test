import { plainToClass } from 'class-transformer';

import UserEntity from '@/domain/entities/user.entity';
import { User } from '@prisma/client';

export default class UserMapper {
  static userEntityFromDB(user: User) {
    return plainToClass(UserEntity, user);
  }
}
