import { LoginDto } from "../dtos/LoginDto";
import { CustomError } from "../errors/CustomError";
import { IService } from "../protocols/IService";
import { IHashComparer } from "../providers/protocols/IHashComparer";
import { IFindUserByEmailRepository } from "../repositories/protocols/IFindUserByEmailRepository";
import { UNAUTHORIZED } from "../utils/http";

export class LoginService implements IService<LoginDto, string> {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator
  ){}

  async execute(data: LoginDto): Promise<string> {
    const { email, password } = data;

    const user = await this.findUserByEmailRepository.findByEmail(email);
  
    if(!user || !(await this.hashComparer.compare(password, user.password))) {
      throw new CustomError('E-mail or password is incorrect', UNAUTHORIZED);
    }

    const token = await this.tokenGenerator.generate({ id: user.id});

    return token;
  }
}