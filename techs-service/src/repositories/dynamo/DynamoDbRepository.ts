import * as AWS from 'aws-sdk';

export type UpdateOptions<T> = {
  id?: string;
  data?: Partial<T>;
  key?: object;
  updateExpression?: string;
  expressionAttributeNames?: object;
  expressionAttributeValues?: object;
}

export class DynamoDbRepository<T> {
  private readonly dynamoDb: AWS.DynamoDB.DocumentClient

  constructor(private readonly tableName: string){
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  async findAll(): Promise<Array<T>> {
    const { Items } = await this.dynamoDb.scan({
      TableName: this.tableName
    }).promise();

    return Items as T[];
  }

  async findById(id: string): Promise<T> {
    const { Item } = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { id }
    }).promise();

    return Item as T;
  }

  async create(data: T): Promise<T> {
    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: data,
    }).promise();

    return data;
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDb.delete({
      TableName: this.tableName,
      Key: { id }
    }).promise();
  }

  private mountUpdateExpression(data: Partial<T>): string {
    return `set ${Object.keys(data)
      .map(key => `#${key} = :${key}`).join(', ')}`;

  }

  private mountExpressionAttributeNames(data: Partial<T>): object {
    return Object.keys(data)
      .reduce((object, key) => {
        return {
          ...object,
          [`#${key}`]: String(key)
        }
      }, {});
  }

  private mountExpressionAttributeValues(data: Partial<T>): object {
    return Object.entries(data)
      .reduce((object, [key, value]) => {
        return {
          ...object,
          [`:${key}`]: value
        }
      }, {}); 
  }

  async update({ 
    id, 
    data, 
    key, 
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues 
  }: UpdateOptions<T>): Promise<any> {
    return this.dynamoDb.update({
      TableName: this.tableName,
      Key: key || { id },
      UpdateExpression: updateExpression || this.mountUpdateExpression(data),
      ExpressionAttributeNames: expressionAttributeNames || this.mountExpressionAttributeNames(data) as any,
      ExpressionAttributeValues: expressionAttributeValues || this.mountExpressionAttributeValues(data)
    }).promise();
  }
}