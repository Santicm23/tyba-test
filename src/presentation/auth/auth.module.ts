import { Module } from '@nestjs/common';

import { AuthController } from '@/presentation/auth/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
