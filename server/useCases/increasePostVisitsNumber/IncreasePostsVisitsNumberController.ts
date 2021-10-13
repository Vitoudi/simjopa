import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest } from "../../utils/HttpResponses";
import { IncreasePostVisitNumber } from "./IncresePostVisitNumber";

export class IncreasePostVisitNumberController {
    constructor (private increasePostVisitsNumberUseCase: IncreasePostVisitNumber) {}

    public async handle(req: IRequest, res: IResponse) {
        const postId = req.getParamAsNumber("id");

        if (isNaN(postId))
            return badRequest(res, "invalid post id prop provided");

        await this.increasePostVisitsNumberUseCase.execute(postId);
    }
}