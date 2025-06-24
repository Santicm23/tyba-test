import prismaClient from '@/config/db/prisma';
import { EncryptAdapter } from '@/config/security/encrypt';
import UsersDataSource from '@/domain/datasources/users.datasource';
import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserEntity from '@/domain/entities/user.entity';
import DuplicatedError from '@/domain/errors/duplicated.error';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials.error';
import UserMapper from '@/infrastructure/mappers/user.mapper';

export default class UsersDataSourceDBImpl implements UsersDataSource {
  async login(loginDTO: LoginInputDTO): Promise<UserEntity> {
    const user = await prismaClient.user.findUnique({
      where: { email: loginDTO.username },
      select: { id: true, email: true, password: true, name: true },
    });

    if (!user || !EncryptAdapter.compare(loginDTO.password, user.password)) {
      throw new InvalidCredentialsError('Invalid email or password');
    }

    return UserMapper.userEntityFromObject(user);
  }

  async register(registerDTO: RegisterInputDTO): Promise<UserEntity> {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: registerDTO.email },
    });

    if (existingUser) {
      throw new DuplicatedError('User already exists');
    }

    const hashedPassword = EncryptAdapter.hash(registerDTO.password);

    const newUser = await prismaClient.user.create({
      data: {
        email: registerDTO.email,
        password: hashedPassword,
        name: registerDTO.name,
      },
      select: { id: true, email: true, name: true },
    });

    return UserMapper.userEntityFromObject(
      UserMapper.userEntityFromObject(newUser),
    );
  }
}
