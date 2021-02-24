export interface IDeleteTechRepository {
  delete(id: string): Promise<void>;
}