import { CreateUserDto } from "../dtos/CreateUserDto";
import { EmailInUseError } from "../errors/EmailInUserError";
import { User } from "../models/User";
import { IService } from "../protocols/IService";
import { IHashGenerator } from "../providers/protocols/IHashGenerator";
import { ICreateUserRepository } from "../repositories/protocols/ICreateUserRepository";
import { IFindUserByEmailRepository } from "../repositories/protocols/IFindUserByEmailRepository";

export class CreateUserService implements IService<CreateUserDto, User> {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashGenerator: IHashGenerator,
    private readonly createUserRepository: ICreateUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const { email, name, password } = data;

    const findUserByEmail = await this.findUserByEmailRepository.findByEmail(email);

    if(findUserByEmail) {
      throw new EmailInUseError('E-mail is register to another user');
    }

    const hashedPassword = await this.hashGenerator.generate(password);

    const user = await this.createUserRepository.create({
      email,
      name,
      password: hashedPassword
    });

    return user;
  }
}