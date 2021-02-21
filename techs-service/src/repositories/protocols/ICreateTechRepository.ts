import { CreateTechDto } from "../../dtos/CreateTechDto";
import { Tech } from "../../models/Tech";

export interface ICreateTechRepository {
  create(data: CreateTechDto): Promise<Tech>;
}