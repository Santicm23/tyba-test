import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserEntity from '@/domain/entities/user.entity';
import UsersRepository from '@/domain/repositories/users.repository';
import UsersDataSource from '../../domain/datasources/users.datasource';

export default class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly usersDataSource: UsersDataSource) {}

  async login(loginDTO: LoginInputDTO): Promise<UserEntity> {
    return this.usersDataSource.login(loginDTO);
  }

  async register(registerDTO: RegisterInputDTO): Promise<UserEntity> {
    return this.usersDataSource.register(registerDTO);
  }
}
