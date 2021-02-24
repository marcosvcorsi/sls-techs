import { Tech } from "../../src/models/Tech";
import { IFindTechsRepository } from "../../src/repositories/protocols/IFindTechsRepository";
import { ICreateTechRepository } from "../../src/repositories/protocols/ICreateTechRepository";

export const mockCreateTechDto = () => ({
  name: 'anytech'
});

export const mockTechModel = () => ({
  id: 'anyid',
  name: 'anytech'
})

export const mockFindTechsRepository = () => {
  class FindTechsRepositoryStub implements IFindTechsRepository {
    async find(): Promise<Tech[]> {
      return Promise.resolve([
        mockTechModel()
      ])
    }
  }

  return new FindTechsRepositoryStub();
}

export const mockCreateTechRepository = () => {
  class CreateTechRepositoryStub implements ICreateTechRepository {
    async create(): Promise<Tech> {
      return Promise.resolve(mockTechModel());
    }
  }

  return new CreateTechRepositoryStub();
}