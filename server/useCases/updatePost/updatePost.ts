import { Post } from "../../entities/Post";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository"
import { CheckIfUserHasAuthorizationToModifyPostService } from "../../utils/CheckIfPostBelogsToUserService";
import { HTTP_STATUS_CODES } from "../../utils/HttpResponses";
import { CreatePostDto } from "../createPost/CreatePostDto" 
import { GenericUseCaseResponse } from "../IGenericUseCaseResponse";

export class UpdatePost {
    constructor(private postsRepository: IPostsRepository, private checkIfUserHasAuthorizationToModifyPostService: CheckIfUserHasAuthorizationToModifyPostService) {}

    public async execute(postId: number, userId: number, createPostDto: Partial<CreatePostDto>): Promise<GenericUseCaseResponse> {
        const userHasAuthorizationToModifyPost = await this.checkIfUserHasAuthorizationToModifyPostService.execute(postId, userId);
        

        

        if (!userHasAuthorizationToModifyPost)
          return {
            success: false,
            statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
            msg: "Sua conta não possui autorização para modificar esse post",
          };

        const post = await this.postsRepository.getPostById(postId);

        if (!post)
         return { success: false, statusCode: HTTP_STATUS_CODES.NOT_FOUND, msg: "Post não encontrado" };

        await this.postsRepository.updatePost(postId, createPostDto);

        return { success: true, statusCode: HTTP_STATUS_CODES.OK, msg: "Post atualizado com sucesso" };
    }
}