import * as techs from '../../src/factories/techs';
import { CreateTechService } from '../../src/services/CreateTechService';
import { DeleteTechService } from '../../src/services/DeleteTechService';
import { FindTechByIdService } from '../../src/services/FindTechByIdService';
import { FindTechsService } from '../../src/services/FindTechsService';
import { UpdateTechService } from '../../src/services/UpdateTechService';

jest.mock('../../src/repositories/dynamo/DynamoDbTechRepository')

describe('TechFactory Tests', () => {
  it('should return CreateTechService instance from makeCreateTechService', () => {
    const response = techs.makeCreateTechService();

    expect(response).toBeInstanceOf(CreateTechService);
  })

  it('should return FindTechService instance from makeFindTechsService', () => {
    const response = techs.makeFindTechsService();

    expect(response).toBeInstanceOf(FindTechsService);
  })

  it('should return DeleteTechService instance from makeDeleteTechsService', () => {
    const response = techs.makeDeleteTechService();

    expect(response).toBeInstanceOf(DeleteTechService);
  })

  it('should return FindTechByIdService instance from makeFindTechByIdService', () => {
    const response = techs.makeFindTechByIdService();

    expect(response).toBeInstanceOf(FindTechByIdService);
  })

  it('should return UpdateTechService instance from makeUpdateTechService', () => {
    const response = techs.makeUpdateTechService();

    expect(response).toBeInstanceOf(UpdateTechService);
  })
})