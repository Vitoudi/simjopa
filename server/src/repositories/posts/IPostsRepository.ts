import { OrderByOptions } from "../../data/IQueryBuilder";
import { Post } from "../../entities/Post";
import { CreatePostDto } from "../../useCases/createPost/CreatePostDto";
import { GetPostDto } from "../../useCases/getPost/GetPostDto";
import { OptionsToGetRepositoryData } from "../Repository";


export interface IPostsRepository {
  getPostById: (id: number) => Promise<GetPostDto>;
  createPost: (info: Post) => Promise<Post>;
  getPosts: (options: OptionsToGetRepositoryData) => Promise<GetPostDto[]>;
  getPostsByCommittee: (committeeId: number) => Promise<GetPostDto[]>;
  getPostsByJournalist: (journalistId: number) => Promise<GetPostDto[]>;
  updatePost: (postId: number, values: { [key: string]: any }) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}