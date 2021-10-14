import { postsRepository } from "../sharedDependencies";
import { IncreasePostVisitNumberController } from "./IncreasePostsVisitsNumberController";
import { IncreasePostVisitNumber } from "./IncresePostVisitNumber";

const increasePostVisitsNumberUseCase = new IncreasePostVisitNumber(postsRepository);
export const increasePostVisitNumberController = new IncreasePostVisitNumberController(increasePostVisitsNumberUseCase);