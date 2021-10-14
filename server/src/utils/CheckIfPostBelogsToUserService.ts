import { UserRole } from "../entities/User";
import { IJournalistsRepository } from "../repositories/journalists/IJournalitsRepository";
import { IPostsRepository } from "../repositories/posts/IPostsRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepository";

export class CheckIfUserHasAuthorizationToModifyPostService {
    constructor(private journalistRepository: IJournalistsRepository, private postsRepository: IPostsRepository, private usersRepository: IUsersRepository) {}

    public async execute(postId: number, userId: number) {
        const userHasAdminRole = await this.checkIfUserHasAdmRole(userId);

        if (userHasAdminRole)
            return true;

        const postBelongsToUser = await this.checkPostBelongsToUser(postId, userId);

        console.log("post belongs to user: ", postBelongsToUser);

        if (postBelongsToUser)
            return true;

        return false;
    }

    private async checkIfUserHasAdmRole(id: number) {
        const user = await this.usersRepository.getUserById(id);
        return user.role > UserRole.JOURNALIST;
    }

    private async checkPostBelongsToUser(postId: number, userId: number) {
        const post = await this.postsRepository.getPostById(postId);
        const journalist = await this.journalistRepository.getOneByUserId(
          userId
        );

        if (post?.journalistId === journalist?.id) return true;

        return false;
    }
}