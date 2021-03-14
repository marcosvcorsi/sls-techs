import { BcryptAdapter } from "../providers/bcrypt/BcryptAdapter";
import { DynamoDbUsersRepository } from "../repositories/dynamo/DynamoDbUsersRepository";
import { CreateUserService } from "../services/CreateUserService";

export const makeCreateUserService = (): CreateUserService => {
  const dynamoDbUsersRepository = new DynamoDbUsersRepository();
  
  const bcryptAdapter = new BcryptAdapter();

  const createUserService = new CreateUserService(
    dynamoDbUsersRepository,
    bcryptAdapter,
    dynamoDbUsersRepository
  );

  return createUserService;
}