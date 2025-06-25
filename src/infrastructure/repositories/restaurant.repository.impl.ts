import LocationEntity from '@/domain/entities/location.entity';
import RestaurantEntity from '@/domain/entities/restaurant.entity';
import RestaurantRepository from '@/domain/repositories/restaurant.repository';
import RestaurantDataSource from '@/domain/datasources/restaurant.datasource';

export default class RestaurantRepositoryImpl implements RestaurantRepository {
  constructor(private readonly restaurantDataSource: RestaurantDataSource) {}

  async getRestaurantsByLocation(
    location: LocationEntity,
  ): Promise<RestaurantEntity[]> {
    return await this.restaurantDataSource.getRestaurantsByLocation(location);
  }
}
