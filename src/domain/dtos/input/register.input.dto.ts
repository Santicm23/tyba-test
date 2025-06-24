import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as RegisterInputDTO;
    return confirmPassword === object.password;
  }

  defaultMessage() {
    return 'Passwords do not match';
  }
}

export default class RegisterInputDTO {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  @IsStrongPassword()
  public password: string;

  @IsString()
  @IsStrongPassword()
  @Validate(MatchPasswordsConstraint)
  public confirmPassword: string;
}
