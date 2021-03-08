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
  
  describe('findAll()', () => {
    it('should call DynamoDb scan with correct values', async () => {
      const findSpy = jest.spyOn(fakeDynamoDb, 'scan');
      
      const { sut, tableName } = makeSut();

      await sut.findAll();

      expect(findSpy).toHaveBeenCalledWith({
        TableName: tableName
      })
    })

    it('should throw if DynamoDb scan throws', async () => {
      jest.spyOn(fakeDynamoDb, 'scan').mockImplementationOnce(() => {
        return {
          promise: () => Promise.reject(new Error())
        }
      })
      
      const { sut } = makeSut();

      await expect(sut.findAll()).rejects.toThrow();
    })

    it('should return Items on success', async () => {
      const Items = [
        {
          id: 'anyid',
          value: 'anyvalue'
        }
      ]

      jest.spyOn(fakeDynamoDb, 'scan').mockImplementationOnce(() => {
        return {
          promise: () => Promise.resolve({ Items })
        }
      })
      
      const { sut } = makeSut();

      const response = await sut.findAll();

      expect(response).toEqual(Items);
    })
  })

  describe('findById()', () => {
    it('should call DynamoDb get with correct values', async () => {
      const findSpy = jest.spyOn(fakeDynamoDb, 'get');
      
      const { sut, tableName } = makeSut();

      const id = 'anyid';

      await sut.findById(id);

      expect(findSpy).toHaveBeenCalledWith({
        TableName: tableName,
        Key: { id }
      })
    })

    it('should throw if DynamoDb get throws', async () => {
      jest.spyOn(fakeDynamoDb, 'get').mockImplementationOnce(() => {
        return {
          promise: () => Promise.reject(new Error())
        }
      })
      
      const { sut } = makeSut();

      await expect(sut.findById('anyid')).rejects.toThrow();
    })

    it('should return Item on success', async () => {
      const Item = {
        id: 'anyid',
        value: 'anyvalue'
      }
      
      jest.spyOn(fakeDynamoDb, 'get').mockImplementationOnce(() => {
        return {
          promise: () => Promise.resolve({ Item })
        }
      })
      
      const { sut } = makeSut();

      const response = await sut.findById('anyid');

      expect(response).toEqual(Item);
    })
  })

  describe('delete()', () => {
    it('should call DynamoDb delete with correct values', async () => {
      const deleteSpy = jest.spyOn(fakeDynamoDb, 'delete');
      
      const { sut, tableName } = makeSut();

      const id = 'anyid';

      await sut.delete(id);

      expect(deleteSpy).toHaveBeenCalledWith({
        TableName: tableName,
        Key: { id }
      })
    })

    it('should throw if DynamoDb delete throws', async () => {
      jest.spyOn(fakeDynamoDb, 'delete').mockImplementationOnce(() => {
        return {
          promise: () => Promise.reject(new Error())
        }
      })
      
      const { sut } = makeSut();

      await expect(sut.delete('anyid')).rejects.toThrow();
    })
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

  describe('update()', () => {
    it('should call DynamoDb update with id and data', async () => {
      const updateSpy = jest.spyOn(fakeDynamoDb, 'update');

      const { sut, tableName } = makeSut();

      const id = 'anyid';
      const data = {
        name: 'anyname'
      }

      await sut.update({
        id,
        data
      })

      expect(updateSpy).toHaveBeenCalledWith({
        TableName: tableName,
        Key: { id },
        UpdateExpression: "set #name = :name",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": "anyname",
        },
      })
    })

    it('should call DynamoDb update with defaults parameters', async () => {
      const updateSpy = jest.spyOn(fakeDynamoDb, 'update');

      const { sut, tableName } = makeSut();

      const key = { id: 'anyid' };
      
      const updateExpression = "set #name = :name";
      
      const expressionAttributeNames = {
        "#name": "name",
      }

      const expressionAttributeValues = {
        ":name": "anyname",
      }

      await sut.update({
        key,
        updateExpression,
        expressionAttributeNames,
        expressionAttributeValues
      })

      expect(updateSpy).toHaveBeenCalledWith({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    })

    it('should throw if DynamoDb update throws', async () => {
      jest.spyOn(fakeDynamoDb, 'update').mockImplementationOnce(() => {
        return {
          promise: () => Promise.reject(new Error())
        }
      })

      const { sut } = makeSut();

      const id = 'anyid';
      const data = {
        name: 'anyname'
      }

      await expect(sut.update({ id, data})).rejects.toThrow();
    })
  })
})