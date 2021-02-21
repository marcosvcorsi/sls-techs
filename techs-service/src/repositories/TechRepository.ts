import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CreateTechDto } from "../dtos/CreateTechDto";
import { Tech } from '../models/Tech';
import { ICreateTechRepository } from "./protocols/ICreateTechRepository";
import { IFindTechsRepository } from './protocols/IFindTechsRepository';

export class TechRepository implements ICreateTechRepository, IFindTechsRepository {
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
}