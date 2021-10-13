import { usersRepository } from "../sharedDependencies";
import { GetUserByAuthToken } from "./GetUserByAuthToken";
import { GetUserByAuthTokenController } from "./GetUserByAuthTokenController";

const getUserByAuthTokenUseCase = new GetUserByAuthToken(usersRepository);
export const getUserByAuthTokenController = new GetUserByAuthTokenController(getUserByAuthTokenUseCase);

