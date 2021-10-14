import { Request, Response } from "express";
import { CreateJournalistDto } from "./createJournalistDto";
import { SignUpJournalist } from "./SignUpJournalist";
import fs from "fs";
import { badRequest, created, customHttpResponse, internalServerError } from "../../utils/HttpResponses";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";

export class SignUpJournalistController {
    constructor(private signUpJournalistUseCase: SignUpJournalist) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response> {
        const committeId = req.getBodyPropAsNumber("committeId");
        const { password, name, email } = req.getBody();

        const imgFileName = req.getFile()?.filename;

        const journalistDtoObj: CreateJournalistDto = { committeId, password, imgFileName, name, email };

        const journalistSignUpResponse = await this.signUpJournalistUseCase.execute(journalistDtoObj);

        if (!journalistSignUpResponse.success) {
            const { msg, statusCode } = journalistSignUpResponse;
            return customHttpResponse(res, { msg , statusCode });
        }
            
        return created(res, journalistSignUpResponse);
    }
}