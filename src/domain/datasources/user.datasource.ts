import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserEntity from '@/domain/entities/user.entity';

export default abstract class UserDataSource {
  abstract login(loginDTO: LoginInputDTO): Promise<UserEntity>;
  abstract register(registerDTO: RegisterInputDTO): Promise<UserEntity>;
}
