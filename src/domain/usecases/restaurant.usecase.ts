import RestaurantRepository from '@/domain/repositories/restaurant.repository';
import LocationRepository from '@/domain/repositories/location.repository';
import RestaurantEntity from '@/domain/entities/restaurant.entity';
import LocationEntity from '@/domain/entities/location.entity';
import CityEntity from '@/domain/entities/city.entity';

export default class RestaurantUseCase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private locationRepository: LocationRepository,
  ) {}

  async getRestaurantsByLocation(
    location: LocationEntity,
  ): Promise<RestaurantEntity[]> {
    return await this.restaurantRepository.getRestaurantsByLocation(location);
  }

  async getRestaurantsByCity(city: CityEntity): Promise<RestaurantEntity[]> {
    const location = await this.locationRepository.getLocationByCity(city);
    return await this.restaurantRepository.getRestaurantsByLocation(location);
  }
}
