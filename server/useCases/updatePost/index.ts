import { checkIfPostBelongsToJournalistByUserIdService, postsRepository } from "../sharedDependencies";
import { UpdatePost } from "./updatePost";
import { UpdatePostController } from "./UpdatePostController";

const updatePostUseCase = new UpdatePost(postsRepository, checkIfPostBelongsToJournalistByUserIdService);
export const updatePostController = new UpdatePostController(updatePostUseCase);