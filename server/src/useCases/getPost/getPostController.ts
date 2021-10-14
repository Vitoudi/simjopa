import { Request, Response } from "express";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, ok } from "../../utils/HttpResponses";
import { GetPost } from "./GetPost";

export class GetPostController {
    constructor(private getPostUseCase: GetPost) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response>  {
        const id = req.getParamAsNumber("id");

        if (isNaN(id)) return badRequest(res, "invalid id param");

        const post = await this.getPostUseCase.execute(id);

        console.log("POST -->>", post)

        return ok(res, post);
    }
}