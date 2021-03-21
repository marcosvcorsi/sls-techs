import { IHashGenerator } from '../../src/providers/protocols/IHashGenerator'

export const mockHashGenerator = () => {
  class HashGeneratorStub implements IHashGenerator {
    async generate(value: string): Promise<string> {
      return 'anyhashvalue';
    }
  }

  return new HashGeneratorStub();
}