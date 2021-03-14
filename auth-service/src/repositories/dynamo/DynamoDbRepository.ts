import * as AWS from 'aws-sdk';

export type QueryOptions<T> = {
  indexName: string
  data?: Partial<T>;
  keyConditionExpression?: string;
  expressionAttributeNames?: object;
  expressionAttributeValues?: object;
  limit?: number;
}

export class DynamoDbRepository<T> {
  private readonly dynamoDb: AWS.DynamoDB.DocumentClient

  constructor(private readonly tableName: string){
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  private mountFilterExpression(data: Partial<T>): string {
    return `${Object.keys(data)
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


  private async query({
    indexName,
    data, 
    keyConditionExpression,
    expressionAttributeNames,
    expressionAttributeValues,
    limit
  }: QueryOptions<T>): Promise<Array<T>> {
    const { Items } = await this.dynamoDb.query({
      TableName: this.tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression || this.mountFilterExpression(data),
      ExpressionAttributeNames: expressionAttributeNames || this.mountExpressionAttributeNames(data) as any,
      ExpressionAttributeValues: expressionAttributeValues || this.mountExpressionAttributeValues(data),
      ...(limit ? { Limit: limit} : {})
    }).promise();

    return Items as Array<T>;
  }

  async findOne({
    indexName,
    data, 
    keyConditionExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  }: QueryOptions<T>): Promise<T> {
    const Items = await this.query({
      indexName,
      data, 
      keyConditionExpression,
      expressionAttributeNames,
      expressionAttributeValues,
      limit: 1,
    });

    return Items[0] as T;
  }

  async create(data: T): Promise<T> {
    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: data,
    }).promise();

    return data;
  }
}