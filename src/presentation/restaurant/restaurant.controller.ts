import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import RestaurantUseCase from '@/domain/usecases/restaurant.usecase';
import RestaurantDataSourceGooglePlacesImpl from '@/infrastructure/datasources/restaurant.datasource.google-places';
import RestaurantRepositoryImpl from '@/infrastructure/repositories/restaurant.repository.impl';
import LocationRepositoryImpl from '@/infrastructure/repositories/location.repository.impl';
import LocationDataSourceGooglePlacesImpl from '@/infrastructure/datasources/location.datasource.google-places';
import LocationEntity from '@/domain/entities/location.entity';
import { AuthGuard } from '@/presentation/auth/guards/auth/auth.guard';
import CityEntity from '@/domain/entities/city.entity';

@UseGuards(AuthGuard)
@Controller('restaurants')
export class RestaurantController {
  private readonly restaurantUseCase: RestaurantUseCase = new RestaurantUseCase(
    new RestaurantRepositoryImpl(new RestaurantDataSourceGooglePlacesImpl()),
    new LocationRepositoryImpl(new LocationDataSourceGooglePlacesImpl()),
  );

  @Get('by-location')
  async getRestaurantsByLocation(
    @Query('lat') latitude: number,
    @Query('lng') longitude: number,
  ) {
    const locationEntity = new LocationEntity();

    locationEntity.latitude = latitude;
    locationEntity.longitude = longitude;

    return this.restaurantUseCase.getRestaurantsByLocation(locationEntity);
  }

  @Get('by-city')
  async getRestaurantsByCity(@Query('city') city: string) {
    const cityEntity = new CityEntity();

    cityEntity.name = city;

    return this.restaurantUseCase.getRestaurantsByCity(cityEntity);
  }
}
