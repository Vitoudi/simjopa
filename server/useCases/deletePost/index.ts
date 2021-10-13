import { CheckIfUserHasAuthorizationToModifyPostService } from "../../utils/CheckIfPostBelogsToUserService";
import { checkIfPostBelongsToJournalistByUserIdService, journalistsRepository, postsRepository, usersRepository } from "../sharedDependencies";
import { DeletePost } from "./DeletePost";
import { DeletePostController } from "./DeletePostController";

const deletePostUseCase = new DeletePost(postsRepository);
export const deletePostController = new DeletePostController(deletePostUseCase, checkIfPostBelongsToJournalistByUserIdService);