import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { IUser, User } from "../../entities/User";
export interface IUsersRepository {
  saveUser: (user: User) => Promise<ResultSetHeader>;
  getUserByEmail: (
    email: string
  ) => Promise<IUser>;
  getUserByToken: (token: string) => Promise<IUser>;
  getUserById: (id: number) => Promise<IUser>;
}