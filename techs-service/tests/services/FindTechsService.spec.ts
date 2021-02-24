import { mockFindTechsRepository, mockTechModel } from '../mocks/techs';
import { FindTechsService } from '../../src/services/FindTechsService';

const makeSut = () => {
  const findTechsRepositoryStub = mockFindTechsRepository()

  const sut = new FindTechsService(findTechsRepositoryStub);
  
  return {
    findTechsRepositoryStub,
    sut,
  } 
}

describe('FindTechsService Test', () => {
  it('should call FindTechsRepository find', async () => {
    const { sut, findTechsRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findTechsRepositoryStub, 'find');

    await sut.execute();

    expect(findSpy).toHaveBeenCalled();
  })

  it('should throw if FindTechsRepository find throws', async () => {
    const { sut, findTechsRepositoryStub } = makeSut();

    jest.spyOn(findTechsRepositoryStub, 'find').mockRejectedValueOnce(new Error());

    expect(sut.execute()).rejects.toThrow();
  })

  it('should return techs on success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute();

    expect(response).toBeTruthy();
    expect(response).toHaveLength(1);
    expect(response).toEqual(expect.arrayContaining([
      mockTechModel()
    ]))
  })
})