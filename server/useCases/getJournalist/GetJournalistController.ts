import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, notFound, ok } from "../../utils/HttpResponses";
import { GetJournalist } from "./GetJournalist";

export class GetJournalistController {
    constructor(private getJournalistUseCase: GetJournalist) {}

    public async handle(req: IRequest, res: IResponse) {
        const id = req.getParamAsNumber("id");

        if (isNaN(id))
            return badRequest(res, "'id' param must be a valid number");
    
        const journalist = await this.getJournalistUseCase.execute(id);

        if (!journalist)
            return notFound(res, "not found");

        return ok(res, journalist);
    }
}