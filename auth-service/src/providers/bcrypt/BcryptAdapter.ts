import { genSalt, hash } from 'bcryptjs';
import { IHashGenerator } from "../protocols/IHashGenerator";

export class BcryptAdapter implements IHashGenerator {
  
  constructor(private readonly rounds: number = 10) {}

  async generate(value: string): Promise<string> {
    const salt = await genSalt(this.rounds);

    const hashedValue = await hash(value, salt);

    return hashedValue;
  }
}