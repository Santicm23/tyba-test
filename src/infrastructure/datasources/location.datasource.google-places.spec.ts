import axios from 'axios';
import LocationDataSourceGooglePlacesImpl from './location.datasource.google-places';
import env from '@/config/environment';
import LocationMapper from '@/infrastructure/mappers/location.mapper';
import CityEntity from '@/domain/entities/city.entity';

jest.mock('axios');
jest.mock('@/infrastructure/mappers/location.mapper');
jest.mock('@/config/environment', () => ({
  GOOGLE_API_KEY: 'fake-api-key',
}));

describe('LocationDataSourceGooglePlacesImpl', () => {
  const city: CityEntity = { name: 'Bogota' } as CityEntity;
  const fakeResponse = {
    data: { results: [{ geometry: { location: { lat: 1, lng: 2 } } }] },
  };
  const fakeLocationEntity = { lat: 1, lng: 2 };

  let dataSource: LocationDataSourceGooglePlacesImpl;

  beforeEach(() => {
    dataSource = new LocationDataSourceGooglePlacesImpl();
    (axios.get as jest.Mock).mockReset();
    (
      LocationMapper.locationEntityFromGoogleGeocodeResponse as jest.Mock
    ).mockReset();
  });

  it('should fetch location for a given city and map the response', async () => {
    (axios.get as jest.Mock).mockResolvedValue(fakeResponse);
    (
      LocationMapper.locationEntityFromGoogleGeocodeResponse as jest.Mock
    ).mockReturnValue(fakeLocationEntity);

    const result = await dataSource.getLocationByCity(city);

    expect(axios.get).toHaveBeenCalledWith(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city.name}&key=${env.GOOGLE_API_KEY}`,
    );
    expect(
      LocationMapper.locationEntityFromGoogleGeocodeResponse,
    ).toHaveBeenCalledWith(fakeResponse.data);
    expect(result).toBe(fakeLocationEntity);
  });

  it('should throw if axios.get fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(dataSource.getLocationByCity(city)).rejects.toThrow(
      'Network error',
    );
  });

  it('should log the city name', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (axios.get as jest.Mock).mockResolvedValue(fakeResponse);
    (
      LocationMapper.locationEntityFromGoogleGeocodeResponse as jest.Mock
    ).mockReturnValue(fakeLocationEntity);

    await dataSource.getLocationByCity(city);

    expect(logSpy).toHaveBeenCalledWith(
      `Fetching location for city: ${city.name}`,
    );
    logSpy.mockRestore();
  });
});
