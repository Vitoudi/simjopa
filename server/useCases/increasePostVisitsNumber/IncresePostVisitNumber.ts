import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

export class IncreasePostVisitNumber {
    constructor(private postRepository: IPostsRepository) {}

    public async execute(postId: number) {
        const post = await this.postRepository.getPostById(postId);

        await this.postRepository.updatePost(postId, {
            visitsNumber: post.visitsNumber + 1
        });
    }
}