import { plainToClass } from 'class-transformer';

import UserEntity from '@/domain/entities/user.entity';

export default class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    return plainToClass(UserEntity, object, {
      excludeExtraneousValues: true,
    });
  }
}
