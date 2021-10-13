import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { CheckIfUserHasAuthorizationToModifyPostService } from "../../utils/CheckIfPostBelogsToUserService";
import { badRequest, unauthorized } from "../../utils/HttpResponses";
import { GetJournalist } from "../getJournalist/GetJournalist";
import { GetPost } from "../getPost/GetPost";
import { DeletePost } from "./DeletePost";

export class DeletePostController {
    constructor(private deletePostUseCase: DeletePost, private checkIfPostBelongsToJournalistByUserIdService: CheckIfUserHasAuthorizationToModifyPostService) {}

    public async handle(req: IRequest, res: IResponse) {
        const postId = req.getParamAsNumber("id");
        const decodedAuthToken = req.getDecodedAuthToken();

        if (!decodedAuthToken)
            return unauthorized(res, "auth token provided is invalid");

        if (isNaN(postId))
            return badRequest(res, "valid post id must be provided");

        const userId = decodedAuthToken.id;
        const postBelongsToJournalist = await this.checkIfPostBelongsToJournalistByUserIdService.execute(postId, userId);

        if (!postBelongsToJournalist)
            return unauthorized(res, "you don't have permission to delete this post");

        await this.deletePostUseCase.execute(postId);
    }
}