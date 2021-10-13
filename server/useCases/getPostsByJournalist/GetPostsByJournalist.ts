import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

export class GetPostsByJournalist
{
    constructor(private postsRepository: IPostsRepository) {}

    public async execute(journalistId: number) {
        const posts = await this.postsRepository.getPostsByJournalist(journalistId);
        return posts;
    }
}