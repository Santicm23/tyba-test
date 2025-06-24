import { IsObject, IsOptional, IsString } from 'class-validator';

import LocationEntity from '@/domain/entities/location.entity';

export default class CityEntity {
  @IsString()
  public name: string;

  @IsOptional()
  @IsObject()
  public location?: LocationEntity;
}
