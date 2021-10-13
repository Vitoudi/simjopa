import { signUpUseCase } from "../SignUp";
import { emailsInfosRepository, journalistsRepository } from "../sharedDependencies";
import { SignUpJournalist } from "./SignUpJournalist";
import { SignUpJournalistController } from "./signUpJournalistController";

const signUpJournalistUseCase = new SignUpJournalist(journalistsRepository, emailsInfosRepository, signUpUseCase);
const signUpJournalistController = new SignUpJournalistController(signUpJournalistUseCase);

export { signUpJournalistController };