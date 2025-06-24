export default abstract class LocationDataSource {
  abstract getLocationByCity(): Promise<any[]>;
}
