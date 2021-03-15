import { genSalt, hash, compare as bCompare } from 'bcryptjs';
import { IHashComparer } from '../protocols/IHashComparer';
import { IHashGenerator } from "../protocols/IHashGenerator";

export class BcryptAdapter implements IHashGenerator, IHashComparer {
  
  constructor(private readonly rounds: number = 10) {}

  async generate(value: string): Promise<string> {
    const salt = await genSalt(this.rounds);

    const hashedValue = await hash(value, salt);

    return hashedValue;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const match = await bCompare(value, hash);

    return match;
  }
}