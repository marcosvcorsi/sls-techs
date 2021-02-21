import { Tech } from "../../models/Tech";

export interface IFindTechsRepository {
  find(): Promise<Tech[]>;  
}