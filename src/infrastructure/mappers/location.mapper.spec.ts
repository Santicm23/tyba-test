import LocationMapper, { GeocodeResponse } from './location.mapper';
import LocationEntity from '@/domain/entities/location.entity';

describe('LocationMapper', () => {
  describe('locationEntityFromGoogleGeocodeResponse', () => {
    it('should map lat/lng from a valid GeocodeResponse', () => {
      const response: GeocodeResponse = {
        results: [
          {
            geometry: {
              location: {
                lat: 12.34,
                lng: 56.78,
              },
            },
          },
        ],
      };

      const entity =
        LocationMapper.locationEntityFromGoogleGeocodeResponse(response);

      expect(entity).toBeInstanceOf(LocationEntity);
      expect(entity.latitude).toBe(12.34);
      expect(entity.longitude).toBe(56.78);
    });

    it('should set latitude and longitude as undefined if results array is empty', () => {
      const response: GeocodeResponse = {
        results: [],
      };

      const entity =
        LocationMapper.locationEntityFromGoogleGeocodeResponse(response);

      expect(entity.latitude).toBeUndefined();
      expect(entity.longitude).toBeUndefined();
    });

    it('should set latitude and longitude as undefined if geometry is missing', () => {
      const response: GeocodeResponse = {
        results: [
          // @ts-expect-error: testing missing geometry
          {},
        ],
      };

      const entity =
        LocationMapper.locationEntityFromGoogleGeocodeResponse(response);

      expect(entity.latitude).toBeUndefined();
      expect(entity.longitude).toBeUndefined();
    });

    it('should set latitude and longitude as undefined if location is missing', () => {
      const response: GeocodeResponse = {
        results: [
          {
            // @ts-expect-error: testing missing location
            geometry: {},
          },
        ],
      };

      const entity =
        LocationMapper.locationEntityFromGoogleGeocodeResponse(response);

      expect(entity.latitude).toBeUndefined();
      expect(entity.longitude).toBeUndefined();
    });
  });
});
