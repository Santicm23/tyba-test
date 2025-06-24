import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export default class UserEntity {
  @IsString()
  @IsUUID()
  @Expose()
  public id?: string;

  @IsString()
  @IsEmail()
  @Expose()
  public email: string;

  @IsString()
  @Expose()
  public name: string;
}
