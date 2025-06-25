import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import UserRepository from '@/domain/repositories/user.repository';
import AuthTokenOutputDTO from '@/domain/dtos/output/auth-token.output.dto';
import JWTAdapter from '@/config/security/jwt';
import TransactionRepository from '@/domain/repositories/transaction.repository';
import TransactionEntity from '../entities/transaction.entity';

export default class AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private transactionRepository: TransactionRepository,
  ) {}

  async login(loginDTO: LoginInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.userRepository.login(loginDTO);

    const transaction = new TransactionEntity();
    transaction.operation = 'login';
    transaction.date = new Date();
    transaction.description = `User ${user.id} logged in`;

    await this.transactionRepository.registerTransaction(transaction, user.id!);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }

  async register(registerDTO: RegisterInputDTO): Promise<AuthTokenOutputDTO> {
    const user = await this.userRepository.register(registerDTO);

    const transaction = new TransactionEntity();
    transaction.operation = 'register';
    transaction.date = new Date();
    transaction.description = `User ${user.id} registered`;

    await this.transactionRepository.registerTransaction(transaction, user.id!);

    const accessToken = JWTAdapter.generateToken(user, '4h');

    return {
      accessToken,
      user,
    };
  }

  async logout(userId: string, token: string): Promise<void> {
    await this.userRepository.logout(userId, token);

    const transaction = new TransactionEntity();
    transaction.operation = 'logout';
    transaction.date = new Date();
    transaction.description = `User ${userId} logged out`;

    await this.transactionRepository.registerTransaction(transaction, userId);
  }
}
