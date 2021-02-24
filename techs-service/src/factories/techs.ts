import { TechRepository } from "../repositories/TechRepository";
import { CreateTechService } from "../services/CreateTechService"
import { DeleteTechService } from "../services/DeleteTechService";
import { FindTechsService } from "../services/FindTechsService";

export const makeCreateTechService = (): CreateTechService => {
  const techRepository = new TechRepository();

  return new CreateTechService(techRepository);
}

export const makeFindTechsService = (): FindTechsService => {
  const techRepository = new TechRepository();

  return new FindTechsService(techRepository);
}

export const makeDeleteTechService = (): DeleteTechService => {
  const techRepository = new TechRepository();
  
  return new DeleteTechService(techRepository);
}