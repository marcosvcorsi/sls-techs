import { Tech } from "../../src/models/Tech";
import { IFindTechsRepository } from "../../src/repositories/protocols/IFindTechsRepository";
import { ICreateTechRepository } from "../../src/repositories/protocols/ICreateTechRepository";
import { IFindTechByIdRepository } from "../../src/repositories/protocols/IFindTechByIdRepository";
import { IDeleteTechRepository } from "../../src/repositories/protocols/IDeleteTechRepository";
import { IUpdateTechRepository } from "../../src/repositories/protocols/IUpdateTechRepository";


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

export const mockFindTechByIdRepository = () => {
  class FindTechByIdRepositoryStub implements IFindTechByIdRepository {
    async findById(id: string): Promise<Tech> {
      return Promise.resolve(mockTechModel());
    }
  }

  return new FindTechByIdRepositoryStub();
}

export const mockCreateTechRepository = () => {
  class CreateTechRepositoryStub implements ICreateTechRepository {
    async create(): Promise<Tech> {
      return Promise.resolve(mockTechModel());
    }
  }

  return new CreateTechRepositoryStub();
}

export const mockDeleteTechRepository = () => {
  class DeleteTechRepositoryStub implements IDeleteTechRepository {
    async delete(id: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new DeleteTechRepositoryStub();
}

export const mockUpdateTechRepository = () => {
  class UpdateTechRepositoryStub implements IUpdateTechRepository {
    async update(id: string, data: Partial<Tech>): Promise<void> {
      return Promise.resolve();
    }
  } 

  return new UpdateTechRepositoryStub();
}