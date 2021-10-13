import { IPasswordEncryptor } from "./IPasswordExcryptor";
import bcrypt from "bcrypt";

export class BCryptPasswordEncryptor implements IPasswordEncryptor {
  public async compare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  public async encrypt(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }
}