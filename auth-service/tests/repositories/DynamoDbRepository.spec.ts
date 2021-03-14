import * as AWS from 'aws-sdk';
import { DynamoDbRepository } from '../../src/repositories/dynamo/DynamoDbRepository';

const makeSut = () => {
  const tableName = 'anytable';

  const sut = new DynamoDbRepository(tableName);

  return { sut, tableName };
}

describe('DynamoDbRepository Tests', () => {
  const fakePromise = () => {
    return {
      promise: () => Promise.resolve({})
    }
  }
  
  const fakeDynamoDb = {
    scan: fakePromise,
    get: fakePromise,
    delete: fakePromise,
    put: fakePromise,
    create: fakePromise,
    update: fakePromise
  } as any;

  beforeEach(() => {
    jest.spyOn(AWS.DynamoDB, 'DocumentClient').mockReturnValue(fakeDynamoDb);
  })

  describe('create()', () => {
    it('should call DynamoDb put with correct values', async () => {
      const createSpy = jest.spyOn(fakeDynamoDb, 'put');
      
      const { sut, tableName } = makeSut();

      const mockParam = {
        id: 'anyid',
        name: 'anyname'
      }

      await sut.create(mockParam);

      expect(createSpy).toHaveBeenCalledWith({
        TableName: tableName,
        Item: mockParam
      })
    })

    it('should throw if DynamoDb put throws', async () => {
      jest.spyOn(fakeDynamoDb, 'put').mockImplementationOnce(() => {
        return {
          promise: () => Promise.reject(new Error())
        }
      })
      
      const { sut } = makeSut();

      const mockParam = {
        id: 'anyid',
        name: 'anyname'
      }

      await expect(sut.create(mockParam)).rejects.toThrow();
    })

    it('should return data on success', async () => {
      const data = {
        id: 'anyid',
        value: 'anyvalue'
      }
      
      jest.spyOn(fakeDynamoDb, 'put').mockImplementationOnce(() => {
        return {
          promise: () => Promise.resolve(data)
        }
      })
      
      const { sut } = makeSut();

      const response = await sut.create(data);

      expect(response).toEqual(data);
    })
  })
})