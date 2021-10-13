import { User, UserRole } from "../../entities/User";
import { IEmailsRepository } from "../../repositories/journalistsEmails/IEmailsRepository";
import { MySqlEmailsRepository } from "../../repositories/journalistsEmails/MySqlEmailsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { HTTP_STATUS_CODES } from "../../utils/HttpResponses";
import { IPasswordEncryptor } from "../../utils/passwordEncryptor/IPasswordExcryptor";
import { Login, LoginResponse } from "../login/Login";
import { CreateUserDto } from "./createUserDto";

export class SignUp {
  constructor(
    private usersRepository: IUsersRepository,
    private emailsRepository: IEmailsRepository,
    private passwordEncryptor: IPasswordEncryptor,
    private loginUseCase: Login
  ) {}

  public async execute(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const { email, password } = createUserDto;
    const userAlreadyExits = await this.checkIfUserAlreadyExists(email);
    
    if (userAlreadyExits)
      return {
        success: false,
        msg: "O úsuario já existe",
        statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
      };

    const user = await this.createUser(createUserDto);
    const res = await this.usersRepository.saveUser(user);
    user.id = res.insertId;

    const loginResponse = await this.loginUseCase.execute(email, password);

    return loginResponse;
  }

  private async getImgRefFor(imgFileName: string) {
    const USERS_IMAGES_PATH = "/assets/users";

    return `${USERS_IMAGES_PATH}/${imgFileName}`;
  }
  private async createUser({ password, imgFileName, name, email }: CreateUserDto) {
    const role = await this.getUserRole(email);
    const hashPassword = await this.passwordEncryptor.encrypt(password);
    const imgRef = imgFileName ? await this.getImgRefFor(imgFileName) : null;
    const user = new User(name, email, hashPassword, role, imgRef);

    return user;
  }

  private async getUserRole(email: string) {
    const emailInfo = await this.emailsRepository.getEmailInfo(email);
    return emailInfo?.roleId ?? UserRole.USER;
  }

  private async checkIfUserAlreadyExists(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    return Boolean(user);
  }
}