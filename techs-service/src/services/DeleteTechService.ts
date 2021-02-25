import { NotFoundError } from '../errors/NotFoundError';
import { IService } from '../protocols/IService';
import { IDeleteTechRepository } from '../repositories/protocols/IDeleteTechRepository';
import { IFindTechByIdRepository } from '../repositories/protocols/IFindTechByIdRepository';

export class DeleteTechService implements IService<string, void> {
  constructor(
    private readonly findTechByIdRepository: IFindTechByIdRepository,
    private readonly deleteTechRepository: IDeleteTechRepository
  ) {}

  async execute(id: string): Promise<void> {
    const tech = await this.findTechByIdRepository.findById(id);

    if(!tech) {
      throw new NotFoundError('Tech not found');
    }

    return this.deleteTechRepository.delete(id);
  }
}