import { Module } from '@nestjs/common';

import { AuthModule } from '@/presentation/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
