export class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}