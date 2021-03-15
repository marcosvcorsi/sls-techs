export class CustomError extends Error {
  statusCode: number;
  
  constructor(message, statusCode = 400) {
    super(message);

    this.name = 'CustomError';
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
