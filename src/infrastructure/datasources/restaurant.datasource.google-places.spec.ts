import axios from 'axios';
import RestaurantDataSourceGooglePlacesImpl from './restaurant.datasource.google-places';
import RestaurantMapper from '@/infrastructure/mappers/restaurant.mapper';
import LocationEntity from '@/domain/entities/location.entity';

jest.mock('axios');
jest.mock('@/config/environment', () => ({
  GOOGLE_API_KEY: 'fake-api-key',
}));
jest.mock('@/infrastructure/mappers/restaurant.mapper', () => ({
  restaurantEntityFromGooglePlacesResponse: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedRestaurantMapper =
  RestaurantMapper.restaurantEntityFromGooglePlacesResponse as jest.Mock;

describe('RestaurantDataSourceGooglePlacesImpl', () => {
  let dataSource: RestaurantDataSourceGooglePlacesImpl;

  beforeEach(() => {
    dataSource = new RestaurantDataSourceGooglePlacesImpl();
    jest.clearAllMocks();
  });

  it('should fetch restaurants from Google Places API and map them', async () => {
    const location: LocationEntity = { latitude: 10, longitude: 20 };
    const fakeResponse = { data: { results: [{ name: 'Test Restaurant' }] } };
    const mappedRestaurants = [{ name: 'Mapped Restaurant' }];

    mockedAxios.get.mockResolvedValueOnce(fakeResponse as any);
    mockedRestaurantMapper.mockReturnValueOnce(mappedRestaurants);

    const result = await dataSource.getRestaurantsByLocation(location);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      ),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('location=10,20'),
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('key=fake-api-key'),
    );
    expect(mockedRestaurantMapper).toHaveBeenCalledWith(fakeResponse.data);
    expect(result).toBe(mappedRestaurants);
  });

  it('should throw if axios.get fails', async () => {
    const location: LocationEntity = { latitude: 1, longitude: 2 };
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(dataSource.getRestaurantsByLocation(location)).rejects.toThrow(
      'Network error',
    );
  });

  it('should return an empty array if mapper returns empty', async () => {
    const location: LocationEntity = { latitude: 5, longitude: 6 };
    const fakeResponse = { data: { results: [] } };

    mockedAxios.get.mockResolvedValueOnce(fakeResponse as any);
    mockedRestaurantMapper.mockReturnValueOnce([]);

    const result = await dataSource.getRestaurantsByLocation(location);

    expect(result).toEqual([]);
  });
});
