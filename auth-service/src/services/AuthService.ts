import { CustomError } from "../errors/CustomError";
import { IService } from "../protocols/IService";
import { ITokenDecoder } from "../providers/protocols/ITokenDecoder";
import { UNAUTHORIZED } from "../utils/http";

export class AuthService implements IService<string, any> {
  constructor(private readonly tokenDecoder: ITokenDecoder){}
  
  async execute(token: string): Promise<any> {
    try {
      const decoded = await this.tokenDecoder.decode(token);

      return decoded;
    } catch(error) {
      console.error(error);

      throw new CustomError('Invalid Token', UNAUTHORIZED);
    }
  }
}