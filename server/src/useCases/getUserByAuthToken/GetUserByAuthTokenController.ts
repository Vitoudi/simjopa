import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, notFound, ok } from "../../utils/HttpResponses";
import { GetUserByAuthToken } from "./GetUserByAuthToken";

export class GetUserByAuthTokenController {
    constructor(private getUserByAuthTokenUseCase: GetUserByAuthToken) {}

    public async handle(req: IRequest, res: IResponse) {
        const { token } = req.getParams();

        if (!token)
            return badRequest(res, "no auth token was provided");

        const user = await this.getUserByAuthTokenUseCase.execute(token);
        
        if (!user)
            notFound(res, "user not found");

        ok(res, user);
    }
}