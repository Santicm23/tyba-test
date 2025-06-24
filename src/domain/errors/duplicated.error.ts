import CustomError from '@/domain/errors/custom.error';

export default class DuplicatedError extends CustomError {
  public static name = 'DuplicatedError';

  constructor(message: string = 'Resource already exists') {
    super(message);
    this.name = DuplicatedError.name;
    Object.setPrototypeOf(this, DuplicatedError.prototype);
  }
}
