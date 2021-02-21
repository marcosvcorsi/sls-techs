import { CreateTechDto } from "../dtos/CreateTechDto";
import { Tech } from "../models/Tech";
import { IService } from "../protocols/IService";
import { ICreateTechRepository } from "../repositories/protocols/ICreateTechRepository";

export class CreateTechService implements IService<CreateTechDto, Tech> {
  constructor(private readonly createTechRepository: ICreateTechRepository) {}

  async execute(data: CreateTechDto): Promise<Tech> {
    return this.createTechRepository.create(data);
  }
}