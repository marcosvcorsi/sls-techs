import { CreateUserDto } from "../../dtos/CreateUserDto";
import { User } from "../../models/User";

export interface ICreateUserRepository {
  create(data: CreateUserDto): Promise<User>
}