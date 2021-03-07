import * as uuid from 'uuid';
import { DynamoDbRepository } from '../../src/repositories/dynamo/DynamoDbRepository';
import { DynamoDbTechRepository} from '../../src/repositories/dynamo/DynamoDbTechRepository';
import { mockCreateTechDto, mockTechModel } from '../mocks/techs';

const makeSut = () => {
  const sut =  new DynamoDbTechRepository();

  return { sut };
}

jest.mock('uuid');

jest.mock('../../src/repositories/dynamo/DynamoDbRepository');

describe('DynamoDbTechRepository', () => {
  describe('create()', () => {
    it('should call uuid v4 before create', async () => {
      const { sut } = makeSut();

      await sut.create(mockCreateTechDto());

      expect(uuid.v4).toHaveBeenCalled();
    })

    it('should call DynamoDbRepository create with correct values', async () => {
      const id = 'anyid';

      jest.spyOn(uuid, 'v4').mockReturnValueOnce(id);

      const createSpy = DynamoDbRepository.prototype.create;
      
      const { sut } = makeSut();

      const mockParams = mockCreateTechDto();

      await sut.create(mockParams);

      expect(createSpy).toHaveBeenCalledWith({
        id,
        name: mockParams.name,
      })
    })

    it('should should throw if DynamoDbRepository create throws', async () => {
      const createSpy = DynamoDbRepository.prototype.create = jest.fn();
    
      createSpy.mockRejectedValueOnce(new Error());

      const { sut } = makeSut();

      const mockParams = mockCreateTechDto();

      await expect(sut.create(mockParams)).rejects.toThrow();
    })
  })

  describe('find()', () => {
    it('should call DynamoDbRepository find all', async () => {
      const findSpy = DynamoDbRepository.prototype.findAll;

      const { sut } = makeSut();

      await sut.find();

      expect(findSpy).toHaveBeenCalled();
    })

    it('should throw if DynamoDbRepository find all throws', async () => {
      const findSpy = DynamoDbRepository.prototype.findAll = jest.fn();

      findSpy.mockRejectedValueOnce(new Error());

      const { sut } = makeSut();

      await expect(sut.find()).rejects.toThrow();
    })

    it('should return techs on success', async () => {
      const mockTechs = [mockTechModel()];
      
      const findSpy = DynamoDbRepository.prototype.findAll = jest.fn();

      findSpy.mockResolvedValueOnce(mockTechs);

      const { sut } = makeSut();

      const response = await sut.find();

      expect(response).toEqual(mockTechs);
    })
  })

  describe('findById()', () => {
    it('should call DynamoDbRepository find by id with correct values', async () => {
      const findSpy = DynamoDbRepository.prototype.findById;

      const id = 'anyid';

      const { sut } = makeSut();

      await sut.findById(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    })

    it('should throw if DynamoDbRepository find by id throws', async () => {
      const findSpy = DynamoDbRepository.prototype.findById = jest.fn();

      findSpy.mockRejectedValueOnce(new Error());

      const { sut } = makeSut();

      await expect(sut.findById('anyid')).rejects.toThrow();
    })

    it('should return tech on success', async () => {
      const mockTech = mockTechModel();
      
      const findSpy = DynamoDbRepository.prototype.findById = jest.fn();

      findSpy.mockResolvedValueOnce(mockTech);

      const { sut } = makeSut();

      const response = await sut.findById('anyid');

      expect(response).toEqual(mockTech);
    })
  })

  describe('delete()', () => {
    it('should call DynamoDbRepository delete with correct values', async () => {
      const deleteSpy = DynamoDbRepository.prototype.delete;

      const id = 'anyid';

      const { sut } = makeSut();

      await sut.delete(id);

      expect(deleteSpy).toHaveBeenCalledWith(id);
    })

    it('should throw if DynamoDbRepository delete throws', async () => {
      const deleteSpy = DynamoDbRepository.prototype.delete = jest.fn();

      deleteSpy.mockRejectedValueOnce(new Error());

      const { sut } = makeSut();

      await expect(sut.delete('anyid')).rejects.toThrow();
    })
  })

  describe('update()', () => {
    it('should call DynamoDbRepository update with correct values', async () => {
      const updateSpy = DynamoDbRepository.prototype.update;

      const id = 'anyid';
      const mockParams = mockCreateTechDto();

      const { sut } = makeSut();

      await sut.update(id, mockParams);

      expect(updateSpy).toHaveBeenCalledWith({
        id,
        data: mockParams
      });
    })

    it('should throw if DynamoDbRepository update throws', async () => {
      const updateSpy = DynamoDbRepository.prototype.update = jest.fn();

      updateSpy.mockRejectedValueOnce(new Error());

      const { sut } = makeSut();

      await expect(sut.update('anyid', mockCreateTechDto())).rejects.toThrow();
    })
  })
})