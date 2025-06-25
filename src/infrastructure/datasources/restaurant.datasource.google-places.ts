import axios from 'axios';

import env from '@/config/environment';
import RestaurantDataSource from '@/domain/datasources/restaurant.datasource';
import LocationEntity from '@/domain/entities/location.entity';
import RestaurantEntity from '@/domain/entities/restaurant.entity';
import RestaurantMapper, {
  GooglePlacesResponse,
} from '@/infrastructure/mappers/restaurant.mapper';

export default class RestaurantDataSourceGooglePlacesImpl
  implements RestaurantDataSource
{
  async getRestaurantsByLocation(
    location: LocationEntity,
  ): Promise<RestaurantEntity[]> {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=1500&type=restaurant&key=${env.GOOGLE_API_KEY}`;

    const response = await axios.get<GooglePlacesResponse>(url);

    const restaurants =
      RestaurantMapper.restaurantEntityFromGooglePlacesResponse(response.data);

    return restaurants;
  }
}
