import { IService } from "../protocols/IService";
import { ITokenDecoder } from "../providers/protocols/ITokenDecoder";

export class AuthService implements IService<string, any> {
  constructor(private readonly tokenDecoder: ITokenDecoder){}
  
  async execute(token: string): Promise<any> {
    const decoded = await this.tokenDecoder.decode(token);

    return decoded;
  }
}