import LocationDataSource from '@/domain/datasources/location.datasource';
import CityEntity from '@/domain/entities/city.entity';
import LocationEntity from '@/domain/entities/location.entity';
import LocationRepository from '@/domain/repositories/location.repository';

export default class LocationRepositoryImpl implements LocationRepository {
  constructor(private readonly locationDataSource: LocationDataSource) {}

  async getLocationByCity(city: CityEntity): Promise<LocationEntity> {
    return this.locationDataSource.getLocationByCity(city);
  }
}
