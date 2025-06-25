import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import AuthUseCase from '@/domain/usecases/auth.usecase';
import UserRepositoryImpl from '@/infrastructure/repositories/user.repository.impl';
import UserDataSourceDBImpl from '@/infrastructure/datasources/user.datasource.db';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import TransactionRepositoryImpl from '@/infrastructure/repositories/transaction.repository.impl';
import TransactionDataSourceDBImpl from '@/infrastructure/datasources/transaction.datasource.db';
import { User } from '@/presentation/auth/decorators/user.decorator';
import UserEntity from '@/domain/entities/user.entity';
import { Token } from '@/presentation/auth/decorators/token.decorator';
import { AuthGuard } from '@/presentation/auth/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
  private readonly authUseCase: AuthUseCase = new AuthUseCase(
    new UserRepositoryImpl(new UserDataSourceDBImpl()),
    new TransactionRepositoryImpl(new TransactionDataSourceDBImpl()),
  );

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginInputDTO: LoginInputDTO) {
    return await this.authUseCase.login(loginInputDTO);
  }

  @Post('register')
  async register(@Body() registerInputDTO: RegisterInputDTO) {
    return await this.authUseCase.register(registerInputDTO);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(204)
  async logout(@User() user: UserEntity, @Token() token: string) {
    return await this.authUseCase.logout(user.id!, token);
  }
}
