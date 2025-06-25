import UserMapper from './user.mapper';
import UserEntity from '@/domain/entities/user.entity';
import { User } from '@prisma/client';

describe('UserMapper', () => {
  it('should map a User (from DB) to UserEntity', () => {
    const dbUser: User = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedpassword',
    };

    const entity = UserMapper.userEntityFromDB(dbUser);

    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.id).toBe(dbUser.id);
    expect(entity.email).toBe(dbUser.email);
    expect(entity.name).toBe(dbUser.name);
  });

  it('should handle missing optional fields gracefully', () => {
    const dbUser: Partial<User> = {
      id: '456',
      email: 'missing@example.com',
      password: 'pw',
    };

    const entity = UserMapper.userEntityFromDB(dbUser as User);

    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.id).toBe(dbUser.id);
    expect(entity.email).toBe(dbUser.email);
    expect(entity.name).toBeUndefined();
  });
});
