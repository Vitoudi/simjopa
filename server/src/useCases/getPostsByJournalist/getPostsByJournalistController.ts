import { Request, Response } from "express";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, ok } from "../../utils/HttpResponses";
import { GetPostsByJournalist } from "./GetPostsByJournalist";

export class GetPostsByJournalistController {
    constructor(private getPostsByJournalistUseCase: GetPostsByJournalist) {}

    public async handle(req: IRequest, res: IResponse) {
        const id = req.getParamAsNumber("id");

        if (isNaN(id)) return badRequest(res, "id param must be a number");

        const posts = await this.getPostsByJournalistUseCase.execute(id);

        return ok(res, posts);
    }
}