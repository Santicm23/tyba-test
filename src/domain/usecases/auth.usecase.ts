import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserRepository from '@/domain/repositories/user.repository';
import AuthTokenOutputDTO from '@/domain/dtos/output/auth-token.output.dto';
import JWTAdapter from '@/config/security/jwt';

export default class AuthUseCase {
  constructor(private userRepository: UserRepository) {}

  async login(loginDTO: LoginInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.userRepository.login(loginDTO);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }

  async register(registerDTO: RegisterInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.userRepository.register(registerDTO);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }
}
