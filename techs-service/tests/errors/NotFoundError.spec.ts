import { NotFoundError } from "../../src/errors/NotFoundError"

describe('NotFoundError Tests', () => {
  it('should return NotFoundError new instance', () => {
    const message = 'anymessage';
    const error = new NotFoundError(message);

    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.message).toBe(message);
    expect(error.name).toBe('NotFoundError')
  })
})