import { CustomError } from '../../src/errors/CustomError';
import { CreateUserService} from '../../src/services/CreateUserService'
import { mockHashGenerator } from '../mocks/hash';
import { mockCreateUserDto, mockCreateUsersRepository, mockFindUserByEmailRepository, mockUserModel } from '../mocks/user';

const makeSut = () => {
  const findUserByEmailRepositoryStub = mockFindUserByEmailRepository();
  const hashGeneratorStub = mockHashGenerator();
  const createUserRepositoryStub = mockCreateUsersRepository();

  jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockResolvedValue(null);

  const sut = new CreateUserService(
    findUserByEmailRepositoryStub,
    hashGeneratorStub,
    createUserRepositoryStub
  );

  return {
    findUserByEmailRepositoryStub,
    hashGeneratorStub,
    createUserRepositoryStub,
    sut
  }
}

describe('CreateUserService Tests', () => {
  it('should call FindUserByEmailRepository with correct values', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail');

    const mockParams = mockCreateUserDto();

    await sut.execute(mockParams);

    expect(findSpy).toHaveBeenCalledWith(mockParams.email);
  })

  it('should throw if FindUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockRejectedValueOnce(new Error());

    const mockParams = mockCreateUserDto();

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should throw if FindUserByEmailRepository return an user', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();

    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockResolvedValueOnce(mockUserModel());

    const mockParams = mockCreateUserDto();

    await expect(sut.execute(mockParams)).rejects.toThrow(CustomError);
  })

  it('should call HashGenerator with correct value', async () => {
    const { sut, hashGeneratorStub } = makeSut();

    const hashSpy = jest.spyOn(hashGeneratorStub, 'generate');

    const mockParams = mockCreateUserDto();

    await sut.execute(mockParams);

    expect(hashSpy).toHaveBeenCalledWith(mockParams.password);
  })

  it('should throw if HashGenerator throws', async () => {
    const { sut, hashGeneratorStub } = makeSut();

    jest.spyOn(hashGeneratorStub, 'generate').mockRejectedValueOnce(new Error());

    const mockParams = mockCreateUserDto();

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should call CreateUserRepository create with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
  
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create');

    const mockParams = mockCreateUserDto();

    await sut.execute(mockParams);

    expect(createSpy).toHaveBeenCalledWith({
      ...mockParams,
      password: 'anyhashvalue'
    })
  })

  it('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
  
    jest.spyOn(createUserRepositoryStub, 'create').mockRejectedValueOnce(new Error());

    const mockParams = mockCreateUserDto();

    await expect(sut.execute(mockParams)).rejects.toThrow();
  })

  it('should return user on success', async () => {
    const { sut } = makeSut();

    const expectedUser = mockUserModel();

    const mockParams = mockCreateUserDto();

    const response = await sut.execute(mockParams);

    expect(response).toEqual(expectedUser);
  })
})