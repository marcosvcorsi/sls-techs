import { Tech } from "../../models/Tech";

export interface IUpdateTechRepository {
  update(id: string, data: Partial<Tech>): Promise<void>;
}