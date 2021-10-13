import { committesRepository } from "../sharedDependencies";
import { GetCommittes } from "./GetCommittes";
import { GetCommittesController } from "./GetCommittesController";

const getAllCommittesUseCase = new GetCommittes(committesRepository);
const getAllCommittesController = new GetCommittesController(getAllCommittesUseCase);

export { getAllCommittesController };