import { v4 as uuid } from 'uuid';
import { CreateUserDto } from "../../dtos/CreateUserDto";
import { User } from "../../models/User";
import { ICreateUserRepository } from "../protocols/ICreateUserRepository";
import { IFindUserByEmailRepository } from '../protocols/IFindUserByEmailRepository';
import { DynamoDbRepository } from "./DynamoDbRepository";

export class DynamoDbUsersRepository implements ICreateUserRepository, IFindUserByEmailRepository {
  private readonly dynamoDbRepository: DynamoDbRepository<User>;

  constructor() {
    this.dynamoDbRepository = new DynamoDbRepository(
      String(process.env.USERS_TABLE_NAME)
    );
  }

  async create(data: CreateUserDto): Promise<User> {
    const id = uuid();

    const user: User = {
      id,
      ...data,
    }

    await this.dynamoDbRepository.create(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null | undefined> {
    const user = await this.dynamoDbRepository.findOne({
      indexName: 'email',
      data: {
        email
      },
    });

    return user;
  }
}