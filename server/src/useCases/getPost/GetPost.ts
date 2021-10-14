import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

export class GetPost {
    constructor(private postsRepository: IPostsRepository) {}

    public async execute(id: number) {
        const post = await this.postsRepository.getPostById(id);
        return post;
    }
}