import { Module } from '@nestjs/common';

import { AuthModule } from '@/presentation/auth/auth.module';
import { RestaurantModule } from '@/presentation/restaurant/restaurant.module';
import { TransactionModule } from '@/presentation/transaction/transaction.module';

@Module({
  imports: [AuthModule, RestaurantModule, TransactionModule],
})
export class AppModule {}
