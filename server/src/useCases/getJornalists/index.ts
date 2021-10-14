import { journalistsRepository } from "../sharedDependencies";
import { GetJournalists } from "./GetJournalists";
import { GetAllJournalistsController } from "./GetJournalistsController";

const getJournalistsUseCase = new GetJournalists(journalistsRepository);
const getJournalistsController = new GetAllJournalistsController(getJournalistsUseCase);

export { getJournalistsController };