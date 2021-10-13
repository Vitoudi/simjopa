import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { OptionsToGetRepositoryData } from "../../repositories/Repository";



export class GetPosts {
    constructor(private postsRepository: IPostsRepository) {}

    public async execute(options: OptionsToGetRepositoryData) {
        const posts = await this.postsRepository.getPosts(options);
        return posts;
    }
}