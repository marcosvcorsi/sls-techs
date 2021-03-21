import { CustomError } from '../../src/errors/CustomError';
import { LoginService } from '../../src/services/LoginService';
import { mockHashComparer } from '../mocks/hash';
import { mockTokenGenerator } from '../mocks/token';
import { mockFindUserByEmailRepository, mockLoginDto, mockUserModel } from '../mocks/user';

const makeSut = () => {
  const findUserByEmailRepositoryStub = mockFindUserByEmailRepository();
  const hashComparerStub = mockHashComparer();
  const tokenGeneratorStub = mockTokenGenerator();

  const sut = new LoginService(
    findUserByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
  );

  return {
    findUserByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    sut
  }
}

describe('LoginService Tests', () => {
  it('should call FindUserByEmailRepository with correct value', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail');

    const mockParams = mockLoginDto()

    await sut.execute(mockParams);

    expect(findSpy).toHaveBeenCalledWith(mockParams.email);
  })

  it('should throw if FindUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockRejectedValueOnce(new Error());

    const mockParams = mockLoginDto()

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should throw if FindUserByEmailRepository returns null', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockResolvedValueOnce(null);

    const mockParams = mockLoginDto()

    await expect(sut.execute(mockParams)).rejects.toThrow(CustomError);
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();

    const hashSpy = jest.spyOn(hashComparerStub, 'compare');

    const mockParams = mockLoginDto()

    await sut.execute(mockParams);

    expect(hashSpy).toHaveBeenCalledWith(mockParams.password, 'anypassword');
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error());

    const mockParams = mockLoginDto()

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should throw if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false);

    const mockParams = mockLoginDto()

    await expect(sut.execute(mockParams)).rejects.toThrow(CustomError);
  })

  it('should call TokenGenerator with correct values', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    const tokenSpy = jest.spyOn(tokenGeneratorStub, 'generate');

    const expectedUser = mockUserModel();

    const mockParams = mockLoginDto();

    await sut.execute(mockParams);

    expect(tokenSpy).toHaveBeenCalledWith({ id: expectedUser.id });
  })

  it('should throw if TokenGenerator throws ', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    jest.spyOn(tokenGeneratorStub, 'generate').mockRejectedValueOnce(new Error());

    const mockParams = mockLoginDto();

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should return token on success', async () => {
    const { sut } = makeSut();

    const mockParams = mockLoginDto();

    const response = await sut.execute(mockParams);

    expect(response).toBe('anytoken');
  })
})