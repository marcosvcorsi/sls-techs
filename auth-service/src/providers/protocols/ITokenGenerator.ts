interface ITokenGenerator {
  generate(value: any): Promise<string>;
}