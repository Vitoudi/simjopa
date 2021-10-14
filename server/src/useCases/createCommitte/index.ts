import { committesRepository } from "../sharedDependencies";
import { CreateCommitte } from "./CreateCommitte";
import { CreateCommitteController } from "./CreateCommitteController";

const createCommitteUseCase = new CreateCommitte(committesRepository);
export const createCommitteController = new CreateCommitteController(createCommitteUseCase);