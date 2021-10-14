import { postsRepository } from "../sharedDependencies";
import { GetPosts } from "./GetPosts";
import { GetAllPostsController } from "./GetPostsController";

const getAllPostsUseCase = new GetPosts(postsRepository);
const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);

export { getAllPostsController };