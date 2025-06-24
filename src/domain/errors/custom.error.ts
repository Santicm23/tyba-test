export default class CustomError extends Error {
  public static name = 'CustomError';

  constructor(message: string = 'An error occurred') {
    super(message);
    this.name = CustomError.name;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
