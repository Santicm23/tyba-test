import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserEntity from '@/domain/entities/user.entity';
import UserRepository from '@/domain/repositories/user.repository';
import UserDataSource from '@/domain/datasources/user.datasource';

export default class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async login(loginDTO: LoginInputDTO): Promise<UserEntity> {
    return await this.userDataSource.login(loginDTO);
  }

  async register(registerDTO: RegisterInputDTO): Promise<UserEntity> {
    return await this.userDataSource.register(registerDTO);
  }

  async logout(userId: string, token: string): Promise<void> {
    return await this.userDataSource.logout(userId, token);
  }

  async validToken(userId: string, token: string): Promise<boolean> {
    return await this.userDataSource.validToken(userId, token);
  }
}
