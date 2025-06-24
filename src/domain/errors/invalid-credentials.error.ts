import CustomError from '@/domain/errors/custom.error';

export default class InvalidCredentialsError extends CustomError {
  public static name = 'InvalidCredentialsError';

  constructor(message: string = 'Invalid credentials provided') {
    super(message);
    this.name = InvalidCredentialsError.name;
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
