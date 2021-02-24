import { IService } from '../protocols/IService';
import { IDeleteTechRepository } from '../repositories/protocols/IDeleteTechRepository';

export class DeleteTechService implements IService<string, void> {
  constructor(private readonly deleteTechRepository: IDeleteTechRepository) {}

  async execute(id: string): Promise<void> {
    return this.deleteTechRepository.delete(id);
  }
}