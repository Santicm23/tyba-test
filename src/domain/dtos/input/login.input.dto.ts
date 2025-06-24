import { IsEmail, IsString } from 'class-validator';

export default class LoginInputDTO {
  @IsString()
  @IsEmail()
  public username: string;

  @IsString()
  public password: string;
}
