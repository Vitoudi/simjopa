import { Request, Response } from "express";
import { badRequest, ok } from "../../utils/HttpResponses";
import { CreatePost } from "./CreatePost";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";

export class CreatePostController {
    constructor(private createPostUseCase: CreatePost) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response> {
        const { htmlContent, title, subtitle } = req.getBody();
        const committeId = req.getBodyPropAsNumber("committeId");
        const journalistId = req.getBodyPropAsNumber("journalistId");

        const imgRef = req.getFile()?.filename || null;

        if (!htmlContent)
            return badRequest(res, "htmlContent missing");

        if (isNaN(journalistId))
            return badRequest(res, "journalistId must be a valid number");
        
        if (isNaN(committeId))
          return badRequest(res, "committeId must be a valid number");

        const post = await this.createPostUseCase.execute(
            { htmlContent, committeId, journalistId, imgRef, title, subtitle }
        );

        return ok(res, post);
    }

}