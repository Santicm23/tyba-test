import { Module } from '@nestjs/common';

import { AuthModule } from '@/presentation/auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [AuthModule, RestaurantModule],
})
export class AppModule {}
