import { BcryptAdapter } from "../providers/bcrypt/BcryptAdapter";
import { JwtAdapter } from "../providers/jwt/JwtAdapter";
import { DynamoDbUsersRepository } from "../repositories/dynamo/DynamoDbUsersRepository";
import { CreateUserService } from "../services/CreateUserService";
import { LoginService } from "../services/LoginService";

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

export const makeLoginService = (): LoginService => {
  const dynamoDbUsersRepository = new DynamoDbUsersRepository();
  
  const bcryptAdapter = new BcryptAdapter();

  const jwtAdapter = new JwtAdapter(process.env.JWT_PRIVATE_KEY);

  const loginService = new LoginService(
    dynamoDbUsersRepository,
    bcryptAdapter,
    jwtAdapter
  );

  return loginService;
}