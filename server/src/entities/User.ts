import { GenericEntity } from "./GenericEntity";

export enum UserRole {
  USER,
  JOURNALIST,
  ADMIN,
  MASTER,
}

export namespace UserRole {
    export function includes(numProp: number) {
      for (let key in UserRole) {
        const keyAsNumber = Number(key);
        if (keyAsNumber === numProp) return true;
      }

      return false;
    }
}

export interface IUser {
  name: string;
  email: string;
  hashPassword: string;
  role: UserRole;
  imgRef: string | null;
  id?: number;
}

export class User extends GenericEntity implements IUser {
  constructor(
    public name: string,
    public email: string,
    public hashPassword: string,
    public role: UserRole,
    public imgRef: string | null,
    public id?: number
  ) {
    super();
  }

  public hasValidUsername() {
    const MIN_LENGTH = 3;
    const hasMinLength = this.name.length >= MIN_LENGTH;

    return hasMinLength;
  }
}