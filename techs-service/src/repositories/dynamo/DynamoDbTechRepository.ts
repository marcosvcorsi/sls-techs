import { v4 as uuid } from 'uuid';
import { CreateTechDto } from "../../dtos/CreateTechDto";
import { Tech } from '../../models/Tech';
import { ICreateTechRepository } from "../protocols/ICreateTechRepository";
import { IDeleteTechRepository } from '../protocols/IDeleteTechRepository';
import { IFindTechByIdRepository } from '../protocols/IFindTechByIdRepository';
import { IFindTechsRepository } from '../protocols/IFindTechsRepository';
import { IUpdateTechRepository } from '../protocols/IUpdateTechRepository';
import { DynamoDbRepository } from './DynamoDbRepository';

export class DynamoDbTechRepository implements 
  ICreateTechRepository, IFindTechsRepository, IDeleteTechRepository, IFindTechByIdRepository, IUpdateTechRepository {
  private readonly dynamoDbRepository: DynamoDbRepository<Tech>;

  constructor() {
    this.dynamoDbRepository = new DynamoDbRepository(
      String(process.env.TECHS_TABLE_NAME)
    );
  }

  async create(data: CreateTechDto): Promise<Tech> {
    const id = uuid();

    const tech: Tech = {
      id,
      ...data,
    }

    await this.dynamoDbRepository.create(tech);

    return tech;
  }

  async find(): Promise<Tech[]> {
    return this.dynamoDbRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDbRepository.delete(id);
  }

  async findById(id: string): Promise<Tech> {
    return this.dynamoDbRepository.findById(id);
  }

  async update(id: string, data: Partial<Tech>): Promise<void> {
    return this.dynamoDbRepository.update({id, data});
  }
}