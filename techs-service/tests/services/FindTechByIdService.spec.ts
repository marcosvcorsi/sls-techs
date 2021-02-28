import { NotFoundError } from '../../src/errors/NotFoundError';
import { FindTechByIdService } from '../../src/services/FindTechByIdService';
import { mockFindTechByIdRepository, mockTechModel } from '../mocks/techs';

const makeSut = () => {
  const findTechByIdRepositoryStub = mockFindTechByIdRepository();

  const sut = new FindTechByIdService(findTechByIdRepositoryStub);

  return {
    sut,
    findTechByIdRepositoryStub
  }
}

describe('FindTechByIdService Tests', () => {
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

  it('should return tech on success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute('anyid');

    expect(response).toEqual(mockTechModel());
  })
})