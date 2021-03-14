import { User } from "../../models/User";

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null | undefined>
} 