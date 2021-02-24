import { CreateTechService } from '../../src/services/CreateTechService';
import { mockCreateTechDto, mockCreateTechRepository, mockTechModel } from '../mocks/techs';

const makeSut = () => {
  const createTechRepositoryStub = mockCreateTechRepository();

  const sut = new CreateTechService(createTechRepositoryStub);

  return {
    createTechRepositoryStub,
    sut
  }
}

describe('CreateTechService Tests', () => {
  it('should call CreateTechRepository with correct values', async () => {
    const { createTechRepositoryStub, sut } = makeSut();

    const createSpy = jest.spyOn(createTechRepositoryStub, 'create');

    const mockParam = mockCreateTechDto();

    await sut.execute(mockParam);

    expect(createSpy).toHaveBeenCalledWith(mockParam);
  });

  it('should throw if CreateTechRepository throws', async () => {
    const { createTechRepositoryStub, sut } = makeSut();

    jest.spyOn(createTechRepositoryStub, 'create').mockRejectedValueOnce(new Error());

    expect(sut.execute(mockCreateTechDto())).rejects.toThrow();
  });

  it('should return tech on success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(mockCreateTechDto());

    expect(response).toBeTruthy();
    expect(response).toEqual(mockTechModel());
  })
})