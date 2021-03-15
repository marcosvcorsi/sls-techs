import { sign } from 'jsonwebtoken';

export class JwtAdapter implements ITokenGenerator {
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
}