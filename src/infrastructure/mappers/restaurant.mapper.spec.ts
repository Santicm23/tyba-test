import RestaurantMapper, { GooglePlacesResponse } from './restaurant.mapper';
import RestaurantEntity from '@/domain/entities/restaurant.entity';
import LocationEntity from '@/domain/entities/location.entity';

describe('RestaurantMapper', () => {
  describe('restaurantEntityFromGooglePlacesResponse', () => {
    it('should map GooglePlacesResponse to RestaurantEntity array', () => {
      const response: GooglePlacesResponse = {
        results: [
          {
            name: 'place1',
            geometry: { location: { lat: 10.5, lng: -74.8 } },
            vicinity: 'address1',
          },
          {
            name: 'place2',
            geometry: { location: { lat: 11.1, lng: -75.2 } },
            vicinity: 'address2',
          },
        ],
      };

      const entities =
        RestaurantMapper.restaurantEntityFromGooglePlacesResponse(response);

      expect(entities).toHaveLength(2);

      expect(entities[0]).toBeInstanceOf(RestaurantEntity);
      expect(entities[0].name).toBe('place1');
      expect(entities[0].address).toBe('address1');
      expect(entities[0].location).toBeInstanceOf(LocationEntity);
      expect(entities[0].location.latitude).toBe(10.5);
      expect(entities[0].location.longitude).toBe(-74.8);

      expect(entities[1].name).toBe('place2');
      expect(entities[1].address).toBe('address2');
      expect(entities[1].location.latitude).toBe(11.1);
      expect(entities[1].location.longitude).toBe(-75.2);
    });

    it('should return an empty array if results is empty', () => {
      const response: GooglePlacesResponse = { results: [] };
      const entities =
        RestaurantMapper.restaurantEntityFromGooglePlacesResponse(response);
      expect(entities).toEqual([]);
    });

    it('should handle missing optional fields gracefully', () => {
      // Simulate a result with missing fields (should throw or handle gracefully)
      const response: GooglePlacesResponse = {
        results: [
          {
            name: 'place1',
            geometry: { location: { lat: 0, lng: 0 } },
            vicinity: 'address1',
          },
        ],
      };
      const entities =
        RestaurantMapper.restaurantEntityFromGooglePlacesResponse(response);
      expect(entities[0].name).toBe('place1');
      expect(entities[0].address).toBe('address1');
      expect(entities[0].location.latitude).toBe(0);
      expect(entities[0].location.longitude).toBe(0);
    });
  });
});
