import LocationEntity from '@/domain/entities/location.entity';
import RestaurantEntity from '@/domain/entities/restaurant.entity';

export interface GooglePlacesResponse {
  results: {
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    vicinity: string;
  }[];
}

export default class RestaurantMapper {
  static restaurantEntityFromGooglePlacesResponse(
    response: GooglePlacesResponse,
  ): RestaurantEntity[] {
    return response.results.map((result) => {
      const restaurant = new RestaurantEntity();
      restaurant.name = result.name;
      restaurant.location = new LocationEntity();
      restaurant.location.latitude = result.geometry.location.lat;
      restaurant.location.longitude = result.geometry.location.lng;
      restaurant.address = result.vicinity;

      return restaurant;
    });
  }
}
