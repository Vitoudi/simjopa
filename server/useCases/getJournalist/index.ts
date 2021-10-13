import { journalistsRepository } from "../sharedDependencies";
import { GetJournalist } from "./GetJournalist";
import { GetJournalistController } from "./GetJournalistController";

export const getJournalistByIdUseCase = new GetJournalist((id) => journalistsRepository.getById(id));
export const getJournalistByUserIdUseCase = new GetJournalist((id) => journalistsRepository.getOneByUserId(id));
export const getJournalistByIdController = new GetJournalistController(getJournalistByIdUseCase);
export const getJournalistByUserIdController = new GetJournalistController(getJournalistByUserIdUseCase);

