export default abstract class RestaurantsDataSource {
  abstract getRestaurantsByLocation(): Promise<any[]>;
}
