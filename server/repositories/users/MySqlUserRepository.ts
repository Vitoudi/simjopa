import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { IQueryBuilder } from "../../data/IQueryBuilder";
import { IUser, User } from "../../entities/User";
import { Repository } from "../Repository";
import { IUsersRepository } from "./IUsersRepository";

export class MySqlUsersRepository extends Repository implements IUsersRepository {
    constructor(private queryBuilder: IQueryBuilder) {
        super("users")
    }

    public async saveUser(user: User) {
        const userObj = user.toObjectWithoutUndefinedValues();
        const query = this.queryBuilder.insertInto(this.tableName, userObj);

        const res = (await query.getAsQueryResponse()) as ResultSetHeader;
        return res;
    }

    public async getUserById(id: number) {
        const user = await this.getUserBy("id", id.toString());
        return user;
    }

    public async getUserByEmail(searchEmail: string) {
        const user = await this.getUserBy("email", searchEmail);
        return user;
    }

    public async getUserByToken(token: string) {
        const tokenData = jwt.decode(token) as jwt.JwtPayload;
        const userId = tokenData.id;
        const user = await this.getUserById(userId);
        return user;
    }

    private async getUserBy(columnName: string, value: string) {
        const query = this.queryBuilder.select("*").from(this.tableName).where(columnName, "=", value);
        const result = await query.getAsDto<IUser[]>();
        return result[0];
    }
}