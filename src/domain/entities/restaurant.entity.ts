import { IsObject, IsOptional, IsString } from 'class-validator';
import LocationEntity from '@/domain/entities/location.entity';

export default class RestaurantEntity {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsObject()
  public location: LocationEntity;
}
