import { CreateUserDto } from '../../src/dtos/CreateUserDto';
import { LoginDto } from '../../src/dtos/LoginDto';
import { User } from '../../src/models/User'
import { ICreateUserRepository } from '../../src/repositories/protocols/ICreateUserRepository'
import { IFindUserByEmailRepository } from '../../src/repositories/protocols/IFindUserByEmailRepository'


export const mockUserModel = (): User => ({
  id: 'anyid',
  email: 'anymail@mail.com',
  name: 'anyname',
  password: 'anypassword'
});

export const mockCreateUserDto = (): CreateUserDto => ({
  email: 'anymail@mail.com',
  name: 'anyname',
  password: 'anypassword'
});

export const mockLoginDto = (): LoginDto => ({
  email: 'anymail@mail.com',
  password: 'anypassword'
})

export const mockCreateUsersRepository = () => {
  class CreateUsersRepositoryStub implements ICreateUserRepository {
    async create(data: CreateUserDto): Promise<User> {
      return mockUserModel();
    }
  }

  return new CreateUsersRepositoryStub();
}

export const mockFindUserByEmailRepository = () => {
  class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
    async findByEmail(email: string): Promise<User> {
      return mockUserModel();
    }
  }

  return new FindUserByEmailRepositoryStub();
}