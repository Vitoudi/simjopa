import { IQueryBuilder } from "../../data/IQueryBuilder";
import { EmailInfo, IEmailInfo } from "../../entities/Email";
import { UserRole } from "../../entities/User";
import { IEmailsRepository } from "./IEmailsRepository";

export class MySqlEmailsRepository implements IEmailsRepository {
    private TABLE_NAME = "emails";
    constructor(private queryBuilder: IQueryBuilder) {}

    public async checkIfEmailHasUserRolePermissions({ email, roleId }: IEmailInfo) {
        const query = this.queryBuilder
            .select("*")
            .from(this.TABLE_NAME)
            .where("email", "=", email);

        const matchingEmails = await query.getAsDto<IEmailInfo[]>();

        if (!Array.isArray(matchingEmails)) return false;

        const matchingEmailFound = matchingEmails[0];

        if (!matchingEmailFound) return false;

        const emailHasUserRolePermissions = matchingEmailFound.roleId === roleId;

        if (!emailHasUserRolePermissions) return false; 
        
        return true;
    }

    public async getEmailInfo(email: string) {
        const query = this.queryBuilder.select("*").from(this.TABLE_NAME).where("email", "=", email);
        const emailsInfos = await query.getAsDto<IEmailInfo[]>();

        console.log("infos: ", emailsInfos);
        if (!emailsInfos) return null;

        const emailInfo = emailsInfos[0];

        return emailInfo;
    }

    public async addEmail({ email, roleId }: EmailInfo) {
        const query = this.queryBuilder
          .insertInto(this.TABLE_NAME, { email, roleId });

        query.execute();
    }
}