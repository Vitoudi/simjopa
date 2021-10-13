import { GenericEntity } from "./GenericEntity";
import { UserRole } from "./User";

export interface IEmailInfo {
    email: string,
    roleId: UserRole
}

export class EmailInfo extends GenericEntity implements IEmailInfo {
    constructor(public email: string, public roleId: UserRole) {
        super()
    }
}