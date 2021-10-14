import { QueryBuilder } from "../data/QueryBuilder";
import { MySqlCommittesRepository } from "../repositories/committes/MySqlCommitteRepository";
import { MySqlJournalistsRepository } from "../repositories/journalists/MySqlJornalistsRepository";
import { MySqlEmailsRepository } from "../repositories/journalistsEmails/MySqlEmailsRepository";
import { MySqlPostsRepository } from "../repositories/posts/MySqlPostsRepository";
import { MySqlUsersRepository } from "../repositories/users/MySqlUserRepository";
import { CheckIfUserHasAuthorizationToModifyPostService } from "../utils/CheckIfPostBelogsToUserService";

const queryBuilder = new QueryBuilder();

export const emailsInfosRepository = new MySqlEmailsRepository(queryBuilder);
export const committesRepository = new MySqlCommittesRepository(queryBuilder);
export const journalistsRepository = new MySqlJournalistsRepository(queryBuilder);
export const postsRepository = new MySqlPostsRepository(queryBuilder);
export const usersRepository = new MySqlUsersRepository(queryBuilder);
export const checkIfPostBelongsToJournalistByUserIdService = new CheckIfUserHasAuthorizationToModifyPostService(journalistsRepository, postsRepository, usersRepository);


