import { Request, Response } from "express";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { noContent, ok } from "../../utils/HttpResponses";
import { GetCommittes } from "./GetCommittes";

export class GetCommittesController {
    constructor(private getCommittesUseCase: GetCommittes) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response> {
        const { limit, page, search } = req.getQueryParams();

        const committes = await this.getCommittesUseCase.execute({
            limit: Number(limit) || undefined,
            page: Number(page) || undefined,
            searchFragment: search
        });

        if (!committes || committes.length <= 0)
            return noContent(res, "no content");

        return ok(res, committes);
    }
}