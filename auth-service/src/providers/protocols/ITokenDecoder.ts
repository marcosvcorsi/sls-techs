export interface ITokenDecoder {
  decode(token: string): Promise<any>;
}