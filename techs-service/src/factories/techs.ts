import { DynamoDbTechRepository } from "../repositories/dynamo/DynamoDbTechRepository";
import { CreateTechService } from "../services/CreateTechService"
import { DeleteTechService } from "../services/DeleteTechService";
import { FindTechByIdService } from "../services/FindTechByIdService";
import { FindTechsService } from "../services/FindTechsService";
import { UpdateTechService } from "../services/UpdateTechService";

export const makeCreateTechService = (): CreateTechService => {
  const techRepository = new DynamoDbTechRepository();

  return new CreateTechService(techRepository);
}

export const makeFindTechsService = (): FindTechsService => {
  const techRepository = new DynamoDbTechRepository();

  return new FindTechsService(techRepository);
}

export const makeDeleteTechService = (): DeleteTechService => {
  const techRepository = new DynamoDbTechRepository();
  
  return new DeleteTechService(techRepository, techRepository);
}

export const makeFindTechByIdService = (): FindTechByIdService => {
  const techRepository = new DynamoDbTechRepository();
  
  return new FindTechByIdService(techRepository);
}

export const makeUpdateTechService = (): UpdateTechService => {
  const techRepository = new DynamoDbTechRepository();

  return new UpdateTechService(techRepository, techRepository);
}