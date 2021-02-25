import { NotFoundError } from "../errors/NotFoundError";
import { Tech } from "../models/Tech";
import { IService } from "../protocols/IService";
import { IFindTechByIdRepository } from "../repositories/protocols/IFindTechByIdRepository";

export class FindTechByIdService implements IService<string, Tech> {
  constructor(private readonly findTechByIdRepository: IFindTechByIdRepository) {}

  async execute(id: string): Promise<Tech> {
    const tech = await this.findTechByIdRepository.findById(id);

    if(!tech) {
      throw new NotFoundError('Tech not found');
    }

    return tech;
  }
}