import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import LoginInputDTO from '@/domain/dtos/input/login.input.dto';
import AuthUseCase from '@/domain/usecases/auth.usecase';
import UsersRepositoryImpl from '@/infrastructure/repositories/users.repository.impl';
import UsersDataSourceDBImpl from '@/infrastructure/datasources/user.datasource.db';
import RegisterInputDTO from '@/domain/dtos/input/register.input.dto';
import { AuthGuard } from '@/presentation/auth/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
  private readonly authUseCase: AuthUseCase = new AuthUseCase(
    new UsersRepositoryImpl(new UsersDataSourceDBImpl()),
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
  @UseGuards(AuthGuard)
  @Get('test')
  test() {
    return { message: 'Auth controller is working!' };
  }
}
