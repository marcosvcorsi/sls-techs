import { Tech } from "../../models/Tech";

export interface IFindTechByIdRepository {
  findById(id: string): Promise<Tech | null>
}