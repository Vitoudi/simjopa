import { postsRepository } from "../sharedDependencies";
import { GetPost } from "./GetPost";
import { GetPostController } from "./getPostController";

export const getPostUseCase = new GetPost(postsRepository);
export const getPostController = new GetPostController(getPostUseCase);
