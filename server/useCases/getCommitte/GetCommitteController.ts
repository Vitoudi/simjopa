import { Request, Response } from "express";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, noContent, ok } from "../../utils/HttpResponses";
import { GetCommitte as GetCommitte } from "./GetCommitte";

export class GetCommitteController {
    constructor(private getCommitteUseCase: GetCommitte) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response> {
        const id = req.getParamAsNumber("id");

        if (isNaN(id) || !id) return badRequest(res, "id must be a valid number");

        const committe = await this.getCommitteUseCase.execute(id);

        if (!committe) return noContent(res, "no content");

        return ok(res, committe);
    }
}