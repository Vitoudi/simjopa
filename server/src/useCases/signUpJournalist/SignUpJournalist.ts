import { IJournalist, Journalist } from "../../entities/Jornalist";
import { UserRole } from "../../entities/User";
import { IJournalistsRepository } from "../../repositories/journalists/IJournalitsRepository";
import { IEmailsRepository } from "../../repositories/journalistsEmails/IEmailsRepository";
import { HTTP_STATUS_CODES } from "../../utils/HttpResponses";
import { SignUp } from "../SignUp/SignUp";
import { LoginResponse, WithToken } from "../login/Login";
import { CreateJournalistDto } from "./createJournalistDto";

export interface SignUpJournalistsResponse extends Omit<LoginResponse, "user"> {
    user?: WithToken<IJournalist>
}

export class SignUpJournalist
{

    constructor(
        private journalistsRepository: IJournalistsRepository,
        private emailsInfosRepository: IEmailsRepository,
        private signUpUseCase: SignUp
    ) {}

    public async execute({ committeId, imgFileName, name, password, email }: CreateJournalistDto): Promise<LoginResponse> {
        const emailHasJournalistPermissions = await this.emailsInfosRepository.checkIfEmailHasUserRolePermissions({email, roleId: UserRole.JOURNALIST});

        if (!emailHasJournalistPermissions)
            return { success: false, msg: "Email fornecido não é válido", statusCode: HTTP_STATUS_CODES.UNAUTHORIZED }

        const loginResponse = await this.signUpUseCase.execute({ name, imgFileName, password, email });
    
         if (!loginResponse.user)
            return loginResponse;

        const journalist = new Journalist(committeId, loginResponse.user.data.id!);

        try {
            await this.journalistsRepository.save(journalist);

            return {success: true, msg: "novo jornalista adicionado", user: loginResponse.user, statusCode: HTTP_STATUS_CODES.CREATED}
        } catch(err) {
            console.error(err);
            return {success: false, msg: "journalista não pôde ser salvo", statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR}
        }
        
    }

}