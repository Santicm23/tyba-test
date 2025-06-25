import UserDataSourceDBImpl from './user.datasource.db';
import prismaClient from '@/config/db/prisma';
import EncryptAdapter from '@/config/security/encrypt';
import UserMapper from '@/infrastructure/mappers/user.mapper';
import DuplicatedError from '@/domain/errors/duplicated.error';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials.error';

jest.mock('@/config/db/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  blacklistToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));
jest.mock('@/config/security/encrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));
jest.mock('@/infrastructure/mappers/user.mapper', () => ({
  userEntityFromDB: jest.fn(),
}));

const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedPassword',
  name: 'Test User',
};

const mockUserEntity = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
};

describe('UserDataSourceDBImpl', () => {
  let dataSource: UserDataSourceDBImpl;

  beforeEach(() => {
    dataSource = new UserDataSourceDBImpl();
    jest.clearAllMocks();
    (UserMapper.userEntityFromDB as jest.Mock).mockReturnValue(mockUserEntity);
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (EncryptAdapter.compare as jest.Mock).mockReturnValue(true);

      const result = await dataSource.login({
        username: 'test@example.com',
        password: 'password',
      });

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: { id: true, email: true, password: true, name: true },
      });
      expect(EncryptAdapter.compare).toHaveBeenCalledWith(
        'password',
        'hashedPassword',
      );
      expect(UserMapper.userEntityFromDB).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUserEntity);
    });

    it('should throw InvalidCredentialsError if user not found', async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        dataSource.login({
          username: 'notfound@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError if password does not match', async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (EncryptAdapter.compare as jest.Mock).mockReturnValue(false);

      await expect(
        dataSource.login({ username: 'test@example.com', password: 'wrong' }),
      ).rejects.toThrow(InvalidCredentialsError);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);
      (EncryptAdapter.hash as jest.Mock).mockReturnValue('hashedPassword');
      (prismaClient.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await dataSource.register({
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
        name: 'Test User',
      });

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(EncryptAdapter.hash).toHaveBeenCalledWith('password');
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashedPassword',
          name: 'Test User',
        },
        select: { id: true, email: true, name: true, password: true },
      });
      expect(UserMapper.userEntityFromDB).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUserEntity);
    });

    it('should throw DuplicatedError if user already exists', async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        dataSource.register({
          email: 'test@example.com',
          password: 'password',
          confirmPassword: 'password',
          name: 'Test User',
        }),
      ).rejects.toThrow(DuplicatedError);
    });
  });

  describe('logout', () => {
    it('should add token to blacklist', async () => {
      (prismaClient.blacklistToken.create as jest.Mock).mockResolvedValue(
        undefined,
      );

      await dataSource.logout('1', 'token123');

      expect(prismaClient.blacklistToken.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          token: 'token123',
        },
      });
    });
  });

  describe('validToken', () => {
    it('should return true if token is not blacklisted', async () => {
      (prismaClient.blacklistToken.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await dataSource.validToken('1', 'token123');

      expect(prismaClient.blacklistToken.findUnique).toHaveBeenCalledWith({
        where: {
          userId: '1',
          token: 'token123',
        },
      });
      expect(result).toBe(true);
    });

    it('should return false if token is blacklisted', async () => {
      (prismaClient.blacklistToken.findUnique as jest.Mock).mockResolvedValue(
        {},
      );

      const result = await dataSource.validToken('1', 'token123');

      expect(result).toBe(false);
    });
  });
});
