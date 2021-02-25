import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CreateTechDto } from "../dtos/CreateTechDto";
import { Tech } from '../models/Tech';
import { ICreateTechRepository } from "./protocols/ICreateTechRepository";
import { IDeleteTechRepository } from './protocols/IDeleteTechRepository';
import { IFindTechByIdRepository } from './protocols/IFindTechByIdRepository';
import { IFindTechsRepository } from './protocols/IFindTechsRepository';

export class TechRepository implements ICreateTechRepository, IFindTechsRepository, IDeleteTechRepository, IFindTechByIdRepository {
  private dynamoDb: AWS.DynamoDB.DocumentClient;
  private tableName: string;
  
  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    this.tableName = String(process.env.TECHS_TABLE_NAME);
  }

  async create(data: CreateTechDto): Promise<Tech> {
    const id = uuid();

    const tech: Tech = {
      id,
      ...data,
    }

    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: tech,
    }).promise();

    return tech;
  }

  async find(): Promise<Tech[]> {
    const { Items } = await this.dynamoDb.scan({
      TableName: this.tableName
    }).promise();

    return Items as Tech[];
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDb.delete({
      TableName: this.tableName,
      Key: { id }
    }).promise();
  }

  async findById(id: string): Promise<Tech> {
    const { Item } = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { id }
    }).promise();

    return Item as Tech;
  }
}