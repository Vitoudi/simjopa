import { EmailInfo, IEmailInfo } from "../../entities/Email";

export interface IEmailsRepository {
  getEmailInfo: (email: string) => Promise<IEmailInfo | null>;
  checkIfEmailHasUserRolePermissions: (
    emailInfo: IEmailInfo
  ) => Promise<boolean>;
  addEmail: (emailInfo: EmailInfo) => Promise<void>;
}