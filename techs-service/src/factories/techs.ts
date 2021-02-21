import { TechRepository } from "../repositories/TechRepository";
import { CreateTechService } from "../services/CreateTechService"
import { FindTechsService } from "../services/FindTechsService";

export const makeCreateTechService = (): CreateTechService => {
  const techRepository = new TechRepository();
  const createTechService = new CreateTechService(techRepository);

  return createTechService;
}

export const makeFindTechsService = (): FindTechsService => {
  const techRepository = new TechRepository();
  const findTechsService = new FindTechsService(techRepository);

  return findTechsService;
}