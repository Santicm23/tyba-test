import { Module } from '@nestjs/common';

import { RestaurantController } from '@/presentation/restaurant/restaurant.controller';

@Module({
  controllers: [RestaurantController],
})
export class RestaurantModule {}
