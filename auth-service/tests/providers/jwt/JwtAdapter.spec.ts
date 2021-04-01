import * as jwt from 'jsonwebtoken';
import { JwtAdapter } from '../../../src/providers/jwt/JwtAdapter';

jest.mock('jsonwebtoken');

const makeSut = () => {
  const secret = 'secret';

  const sut = new JwtAdapter(secret);

  return { sut, secret };
}

describe('JwtAdapter Tests', () => {
  describe('generate()', () => {
    it('should call jwt sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign');

      const { sut , secret } = makeSut();

      const value = 'anyvalue';

      await sut.generate(value);

      expect(signSpy).toHaveBeenCalledWith(value, secret, {
        algorithm: 'RS256',
        expiresIn: '1d'
      })
    })

    it('should throw if jwt sign throws', async () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      })

      const { sut } = makeSut();

      const value = 'anyvalue';

      await expect(sut.generate(value)).rejects.toThrow();
    })

    it('should return token on success', async () => {
      const expectedToken = 'anytoken';

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => expectedToken);

      const { sut } = makeSut();

      const value = 'anyvalue';

      const response = await sut.generate(value);

      expect(response).toBe(expectedToken);
    })
  })
})