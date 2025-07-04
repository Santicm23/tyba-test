import CityEntity from '@/domain/entities/city.entity';
import LocationEntity from '@/domain/entities/location.entity';

export default abstract class LocationRepository {
  abstract getLocationByCity(city: CityEntity): Promise<LocationEntity>;
}
