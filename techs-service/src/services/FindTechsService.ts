import { IService } from '../protocols/IService';
import { Tech } from "../models/Tech";
import { IFindTechsRepository } from '../repositories/protocols/IFindTechsRepository';

export class FindTechsService implements IService<null, Tech[]> {
  constructor(private readonly findTechsRepository: IFindTechsRepository) {}

  async execute(): Promise<Tech[]> {
    return this.findTechsRepository.find();
  }
}