import { postsRepository } from "../sharedDependencies";
import { GetPostsByJournalist } from "./GetPostsByJournalist";
import { GetPostsByJournalistController } from "./getPostsByJournalistController";

const getPostsByJournalistUseCase = new GetPostsByJournalist(postsRepository);
const getPostsByJournalistController = new GetPostsByJournalistController(getPostsByJournalistUseCase);

export { getPostsByJournalistController };