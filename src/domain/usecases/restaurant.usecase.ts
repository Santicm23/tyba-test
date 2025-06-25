import RestaurantRepository from '@/domain/repositories/restaurant.repository';
import LocationRepository from '@/domain/repositories/location.repository';
import RestaurantEntity from '@/domain/entities/restaurant.entity';
import LocationEntity from '@/domain/entities/location.entity';
import CityEntity from '@/domain/entities/city.entity';
import TransactionRepository from '@/domain/repositories/transaction.repository';
import UserEntity from '../entities/user.entity';
import TransactionEntity from '../entities/transaction.entity';

export default class RestaurantUseCase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private locationRepository: LocationRepository,
    private transactionRepository: TransactionRepository,
  ) {}

  async getRestaurantsByLocation(
    location: LocationEntity,
    user: UserEntity,
  ): Promise<RestaurantEntity[]> {
    const transaction = new TransactionEntity();
    transaction.operation = 'getRestaurantsByLocation';
    transaction.date = new Date();
    transaction.description = `User ${user.id} requested restaurants in location ${location.latitude}, ${location.longitude}`;

    await this.transactionRepository.registerTransaction(transaction, user.id!);

    return await this.restaurantRepository.getRestaurantsByLocation(location);
  }

  async getRestaurantsByCity(
    city: CityEntity,
    user: UserEntity,
  ): Promise<RestaurantEntity[]> {
    const transaction = new TransactionEntity();
    transaction.operation = 'getRestaurantsByCity';
    transaction.date = new Date();
    transaction.description = `User ${user.id} requested restaurants in city ${city.name}`;

    await this.transactionRepository.registerTransaction(transaction, user.id!);

    const location = await this.locationRepository.getLocationByCity(city);
    return await this.restaurantRepository.getRestaurantsByLocation(location);
  }
}
