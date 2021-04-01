import { sign, verify } from 'jsonwebtoken';
import { ITokenDecoder } from '../protocols/ITokenDecoder';
import { ITokenGenerator } from '../protocols/ITokenGenerator';

export class JwtAdapter implements ITokenGenerator, ITokenDecoder {
  constructor(
    private readonly secret: string
  ) {}

  async generate(value: any): Promise<string> {
    const token = await sign(value, this.secret, {
      algorithm: 'RS256',
      expiresIn: '1d'
    });

    return token;
  }

  async decode(token: string): Promise<any> {
    const decoded = await verify(token, this.secret, {
      algorithms: ['RS256']
    });

    return decoded;
  }
}