import JWTAdapter from '@/config/security/jwt';
import UserEntity from '@/domain/entities/user.entity';
import UserRepository from '@/domain/repositories/user.repository';
import UserDataSourceDBImpl from '@/infrastructure/datasources/user.datasource.db';
import UserRepositoryImpl from '@/infrastructure/repositories/user.repository.impl';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly userRepository: UserRepository = new UserRepositoryImpl(
    new UserDataSourceDBImpl(),
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    if (!JWTAdapter.verifyToken(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    request.token = token;
    request.user = JWTAdapter.decodeToken<UserEntity>(token);

    if (!(await this.userRepository.validToken(request.user!.id!, token))) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
