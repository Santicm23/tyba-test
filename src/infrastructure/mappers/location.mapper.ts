import LocationEntity from '@/domain/entities/location.entity';

export interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

export default class LocationMapper {
  static locationEntityFromGoogleGeocodeResponse(
    response: GeocodeResponse,
  ): LocationEntity {
    const location = response.results[0]?.geometry.location;

    const locationEntity = new LocationEntity();
    locationEntity.latitude = location?.lat;
    locationEntity.longitude = location?.lng;

    return locationEntity;
  }
}
