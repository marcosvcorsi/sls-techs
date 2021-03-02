import { NotFoundError } from '../../src/errors/NotFoundError';
import { UpdateTechService } from '../../src/services/UpdateTechService';
import { mockFindTechByIdRepository, mockUpdateTechRepository } from '../mocks/techs';

const makeSut = () => {
  const findTechByIdRepositoryStub = mockFindTechByIdRepository();
  const updateTechRepositoryStub = mockUpdateTechRepository();

  const sut = new UpdateTechService(findTechByIdRepositoryStub, updateTechRepositoryStub);

  return {
    findTechByIdRepositoryStub,
    updateTechRepositoryStub,
    sut
  }
}

describe('UpdateTechService Tests', () => {
  it('should call FindTechByIdRepository with correct values', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findTechByIdRepositoryStub, 'findById');

    const params = {
      id: 'anyid',
      name: 'anyname'
    }

    await sut.execute(params);

    expect(findSpy).toHaveBeenCalledWith(params.id);
  });

  it('should throw if FindTechByIdRepository throws', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    jest.spyOn(findTechByIdRepositoryStub, 'findById').mockRejectedValueOnce(new Error());

    const params = {
      id: 'anyid',
      name: 'anyname'
    }

    expect(sut.execute(params)).rejects.toThrow();
  })

  it('should throw if FindTechByIdRepository returns null', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    jest.spyOn(findTechByIdRepositoryStub, 'findById').mockResolvedValueOnce(null);

    const params = {
      id: 'anyid',
      name: 'anyname'
    }

    expect(sut.execute(params)).rejects.toBeInstanceOf(NotFoundError);
  })

  it('should call UpdateTechRepository with correct values', async () => {
    const { sut, updateTechRepositoryStub } = makeSut();

    const updateSpy = jest.spyOn(updateTechRepositoryStub, 'update');

    const params = {
      id: 'anyid',
      name: 'anyname'
    }

    await sut.execute(params);

    expect(updateSpy).toHaveBeenCalledWith(params.id, { name: params.name });
  });

  it('should throw if UpdateTechRepository throws', async () => {
    const { sut, updateTechRepositoryStub } = makeSut();

    jest.spyOn(updateTechRepositoryStub, 'update').mockRejectedValueOnce(new Error());

    const params = {
      id: 'anyid',
      name: 'anyname'
    }

    expect(sut.execute(params)).rejects.toThrow();
  });
})