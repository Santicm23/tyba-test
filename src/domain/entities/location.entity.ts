import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export default class LocationEntity {
  @IsNumber()
  @IsLatitude()
  public latitude: number;

  @IsNumber()
  @IsLongitude()
  public longitude: number;
}
