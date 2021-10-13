import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { ok } from "../../utils/HttpResponses";
import { GetJournalists } from "./GetJournalists";

export class GetAllJournalistsController
{
    constructor(private getAllJournalistsUseCase: GetJournalists) {}

    public async handle(req: IRequest, res: IResponse) {
        const { limit, page, search, committeId } = req.getQueryParams();

        const journalists = await this.getAllJournalistsUseCase.execute({
            limit: Number(limit),
            page: Number(page),
            searchFragment: search,
            whereClAuses: committeId ? { committeId } : {}
        });

        return ok(res, journalists);
    }
}