import { ITokenDecoder } from "../../src/providers/protocols/ITokenDecoder";
import { ITokenGenerator } from "../../src/providers/protocols/ITokenGenerator";

export const mockTokenGenerator = () => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate(): Promise<string> {
      return 'anytoken';
    }
  }

  return new TokenGeneratorStub();
}

export const mockTokenDecoder = () => {
  class TokenDecoderStub implements ITokenDecoder {
    async decode(token: string): Promise<any> {
      return { id: 'anyid' }
    }
  }

  return new TokenDecoderStub();
}