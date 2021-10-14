import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

export class DeletePost {
    constructor(private postsRepository: IPostsRepository) {}

    public async execute(id: number) {
        await this.postsRepository.deletePost(id);

    }
}