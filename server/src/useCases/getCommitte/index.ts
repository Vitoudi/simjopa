import { committesRepository } from "../sharedDependencies";
import { GetCommitte } from "./GetCommitte";
import { GetCommitteController } from "./GetCommitteController";

const getCommitteUseCase = new GetCommitte(committesRepository);
const getCommitteController = new GetCommitteController(getCommitteUseCase);

export { getCommitteController };