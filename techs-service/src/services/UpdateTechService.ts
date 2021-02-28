import { IService } from "../protocols/IService";
import { IFindTechByIdRepository } from "../repositories/protocols/IFindTechByIdRepository";
import { IUpdateTechRepository } from "../repositories/protocols/IUpdateTechRepository";
import { NotFoundError } from '../errors/NotFoundError';

type UpdateRequest = {
  id: string;
  name: string;
}

export class UpdateTechService implements IService<UpdateRequest, void> {
  constructor(
    private readonly findTechByIdRepository: IFindTechByIdRepository,
    private readonly updateTechRepository: IUpdateTechRepository
  ){}

  async execute({ id, name }: UpdateRequest): Promise<void> {
    const tech = await this.findTechByIdRepository.findById(id);

    if(!tech) {
      throw new NotFoundError('Tech not found');
    }

    return this.updateTechRepository.update(id, { name });
  }
}