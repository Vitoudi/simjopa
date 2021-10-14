import { BCryptPasswordEncryptor } from "../../utils/passwordEncryptor/BCryptPasswordEncryptor";
import { usersRepository } from "../sharedDependencies";
import { Login } from "./Login";
import { LoginController } from "./LoginController";

const passwordEncryptor = new BCryptPasswordEncryptor();
export const loginUseCase = new Login(usersRepository, passwordEncryptor);
export const loginController = new LoginController(loginUseCase);