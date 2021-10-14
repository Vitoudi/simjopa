import { UserRole } from "../../entities/User";
import { CreateUserDto } from "../SignUp/createUserDto";

export interface CreateJournalistDto extends CreateUserDto {
  committeId: number;
  id?: number;
}