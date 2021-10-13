import { BCryptPasswordEncryptor } from "../../utils/passwordEncryptor/BCryptPasswordEncryptor";
import { emailsInfosRepository, usersRepository } from "../sharedDependencies";
import { SignUp } from "./SignUp";
import { SignUpController } from "./SignUpController";
import { loginUseCase } from "../login";

const passwordEncryptor = new BCryptPasswordEncryptor();
export const signUpUseCase = new SignUp(usersRepository, emailsInfosRepository ,passwordEncryptor, loginUseCase);
export const signUpController = new SignUpController(signUpUseCase);