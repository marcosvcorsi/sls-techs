import { IHashGenerator } from '../../src/providers/protocols/IHashGenerator'
import { IHashComparer } from '../../src/providers/protocols/IHashComparer'


export const mockHashGenerator = () => {
  class HashGeneratorStub implements IHashGenerator {
    async generate(value: string): Promise<string> {
      return 'anyhashvalue';
    }
  }

  return new HashGeneratorStub();
}

export const mockHashComparer = () => {
  class HashGeneratorStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  return new HashGeneratorStub();
}