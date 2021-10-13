import { postsRepository } from "../sharedDependencies";
import { CreatePost } from "./CreatePost";
import { CreatePostController } from "./CreatePostController";

const createPostUseCase = new CreatePost(postsRepository);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController };