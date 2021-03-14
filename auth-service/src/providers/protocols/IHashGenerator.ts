export interface IHashGenerator {
  generate(value: string): Promise<string>;
}