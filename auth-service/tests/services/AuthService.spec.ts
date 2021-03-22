import { AuthService } from '../../src/services/AuthService';
import { mockTokenDecoder } from '../mocks/token';

const makeSut = () => {
  const tokenDecoderStub = mockTokenDecoder();
  
  const sut = new AuthService(tokenDecoderStub);

  return {
    tokenDecoderStub,
    sut
  }
}

describe('AuthService Tests', () => {
  it('should call TokenDecoder with correct value', async () => {
    const { sut, tokenDecoderStub } = makeSut();

    const tokenSpy = jest.spyOn(tokenDecoderStub, 'decode');

    const token = 'anytoken';

    await sut.execute(token);

    expect(tokenSpy).toHaveBeenCalledWith(token);
  })

  it('should throw if TokenDecoder throws', async () => {
    const { sut, tokenDecoderStub } = makeSut();
    
    jest.spyOn(tokenDecoderStub, 'decode').mockRejectedValueOnce(new Error());

    const token = 'anytoken';

    await expect(sut.execute(token)).rejects.toThrow();
  })
})