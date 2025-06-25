import axios from 'axios';

import env from '@/config/environment';
import LocationDataSource from '@/domain/datasources/location.datasource';
import CityEntity from '@/domain/entities/city.entity';
import LocationEntity from '@/domain/entities/location.entity';
import LocationMapper, {
  GeocodeResponse,
} from '@/infrastructure/mappers/location.mapper';

export default class LocationDataSourceGooglePlacesImpl
  implements LocationDataSource
{
  async getLocationByCity(city: CityEntity): Promise<LocationEntity> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city.name}&key=${env.GOOGLE_API_KEY}`;

    console.log(`Fetching location for city: ${city.name}`);

    const response = await axios.get<GeocodeResponse>(url);

    return LocationMapper.locationEntityFromGoogleGeocodeResponse(
      response.data,
    );
  }
}
