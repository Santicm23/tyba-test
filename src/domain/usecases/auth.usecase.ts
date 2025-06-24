import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UsersRepository from '@/domain/repositories/users.repository';
import AuthTokenOutputDTO from '../dtos/output/auth-token.output.dto';
import JWTAdapter from '../../config/security/jwt';

export default class AuthUseCase {
  constructor(private UsersRepository: UsersRepository) {}

  async login(loginDTO: LoginInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.UsersRepository.login(loginDTO);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }

  async register(registerDTO: RegisterInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.UsersRepository.register(registerDTO);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }
}
