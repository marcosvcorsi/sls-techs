import { NotFoundError } from '../../src/errors/NotFoundError';
import { DeleteTechService } from '../../src/services/DeleteTechService';
import { mockDeleteTechRepository, mockFindTechByIdRepository } from '../mocks/techs';

const makeSut = () => {
  const findTechByIdRepositoryStub = mockFindTechByIdRepository();
  const deleteTechRepositoryStub = mockDeleteTechRepository();

  const sut = new DeleteTechService(
    findTechByIdRepositoryStub,
    deleteTechRepositoryStub
  );

  return {
    sut,
    findTechByIdRepositoryStub,
    deleteTechRepositoryStub
  }
}

describe('DeleteTechService Tests', () => {
  it('should call FindTechByIdRepository with correct values', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findTechByIdRepositoryStub, 'findById');

    const mockId = 'anyid';

    await sut.execute(mockId);

    expect(findSpy).toHaveBeenCalledWith(mockId);
  })

  it('should throw if FindTechByIdRepository throws', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    jest.spyOn(findTechByIdRepositoryStub, 'findById').mockRejectedValueOnce(new Error());

    const mockId = 'anyid';

    expect(sut.execute(mockId)).rejects.toThrow();
  })

  it('should throw if FindTechByIdRepository returns null', async () => {
    const { sut, findTechByIdRepositoryStub } = makeSut();

    jest.spyOn(findTechByIdRepositoryStub, 'findById').mockResolvedValueOnce(null);

    const mockId = 'anyid';
    
    expect(sut.execute(mockId)).rejects.toBeInstanceOf(NotFoundError);
  })

  it('should call DeleteTechRepository with correct values', async () => {
    const { sut, deleteTechRepositoryStub } = makeSut();

    const deleteSpy = jest.spyOn(deleteTechRepositoryStub, 'delete');

    const mockId = 'anyid';

    await sut.execute(mockId);

    expect(deleteSpy).toHaveBeenCalledWith(mockId);
  })

  it('should throw if DeleteTechRepository throws', async () => {
    const { sut, deleteTechRepositoryStub } = makeSut();

    jest.spyOn(deleteTechRepositoryStub, 'delete').mockRejectedValueOnce(new Error());

    const mockId = 'anyid';

    expect(sut.execute(mockId)).rejects.toThrow();
  })
})