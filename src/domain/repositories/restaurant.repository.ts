import LocationEntity from '@/domain/entities/location.entity';
import RestaurantEntity from '@/domain/entities/restaurant.entity';

export default abstract class RestaurantRepository {
  abstract getRestaurantsByLocation(
    location: LocationEntity,
  ): Promise<RestaurantEntity[]>;
}
