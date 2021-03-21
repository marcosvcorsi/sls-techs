import { ITokenGenerator } from "../../src/providers/protocols/ITokenGenerator";

export const mockTokenGenerator = () => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate(): Promise<string> {
      return 'anytoken';
    }
  }

  return new TokenGeneratorStub();
}