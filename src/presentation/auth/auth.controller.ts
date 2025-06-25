import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import AuthUseCase from '@/domain/usecases/auth.usecase';
import UserRepositoryImpl from '@/infrastructure/repositories/user.repository.impl';
import UserDataSourceDBImpl from '@/infrastructure/datasources/user.datasource.db';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import TransactionRepositoryImpl from '@/infrastructure/repositories/transaction.repository.impl';
import TransactionDataSourceDBImpl from '@/infrastructure/datasources/transaction.datasource.db';

@Controller('auth')
export class AuthController {
  private readonly authUseCase: AuthUseCase = new AuthUseCase(
    new UserRepositoryImpl(new UserDataSourceDBImpl()),
    new TransactionRepositoryImpl(new TransactionDataSourceDBImpl()),
  );

  @Post('login')
  @HttpCode(200)
  login(@Body() loginInputDTO: LoginInputDTO) {
    return this.authUseCase.login(loginInputDTO);
  }

  @Post('register')
  register(@Body() registerInputDTO: RegisterInputDTO) {
    return this.authUseCase.register(registerInputDTO);
  }
}
