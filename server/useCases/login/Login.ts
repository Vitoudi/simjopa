import { IUser } from "../../entities/User";
import { MySqlUsersRepository } from "../../repositories/users/MySqlUserRepository";
import { IPasswordEncryptor } from "../../utils/passwordEncryptor/IPasswordExcryptor";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../../utils/HttpResponses";
import { GenericUseCaseResponse } from "../IGenericUseCaseResponse";

export interface IUserWithToken extends IUser {
    token: string;
}

export interface WithToken<T> {
    data: T,
    token: string
}

export interface LoginResponse extends GenericUseCaseResponse {
    user?: WithToken<IUser>;
}

export class Login {
  constructor(
    private userRepository: MySqlUsersRepository,
    private PasswordEncryptor: IPasswordEncryptor
  ) {}

  public async execute(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) return { success: false, msg: "Email não registrado", statusCode: HTTP_STATUS_CODES.NOT_FOUND };

    const userWithToken = this.addTokenToUser(user);

    const passwordsMatch = await this.PasswordEncryptor.compare(
      password,
      user.hashPassword
    );

    if (!passwordsMatch) return { success: false, msg: "Senha incorreta", statusCode: HTTP_STATUS_CODES.UNAUTHORIZED };

    return { success: true, msg: "Usuário logado", user: userWithToken, statusCode: HTTP_STATUS_CODES.OK };
  }

  private addTokenToUser(user: IUser): WithToken<IUser> {
    const token = jwt.sign({ id: user?.id, role: user.role }, process.env.JWT_KEY!);

    const userWithToken = { data: user, token };

    return userWithToken;
  }
}