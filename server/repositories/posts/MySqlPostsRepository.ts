import { db } from "../../data/db";
import { IQueryBuilder } from "../../data/IQueryBuilder";
import { Post } from "../../entities/Post";
import { CreatePostDto } from "../../useCases/createPost/CreatePostDto";
import { GetPosts } from "../../useCases/getPosts/GetPosts";
import { GetPostDto } from "../../useCases/getPost/GetPostDto";
import { IPostsRepository } from "./IPostsRepository";
import { OptionsToGetRepositoryData, Repository } from "../Repository";

export class MySqlPostsRepository extends Repository implements IPostsRepository {

  constructor(private queryBuilder: IQueryBuilder) {
      super("posts");
  }

  private get getAllQuery() {
    return this.queryBuilder
      .select(
        `${this.tableName}.htmlContent`,
        `${this.tableName}.imgRef`,
        `${this.tableName}.id`,
        `${this.tableName}.title`,
        `${this.tableName}.subtitle`,
        `${this.tableName}.visitsNumber`,
        `${this.tableName}.createdAt`,
        "journalists.id AS journalistId",
        "committes.name AS committe",
        "committes.id AS committeId"
      )
      .from(this.tableName)
      .join("journalists", "LEFT")
      .on("journalists.id", "=", `${this.tableName}.journalistId`)
      .join("committes", "LEFT")
      .on("committes.id", "=", `${this.tableName}.committeId`);
  }

  public async getPosts(options: OptionsToGetRepositoryData) {
    let query = this.getAllQuery;

    query = this.addOptionsToGetRepositoryDataToQuery(query, { ...options, searchField: "title" });

    const posts = await query.getAsDto<GetPostDto[]>();

    return posts;
  }

  public async createPost(post: Post) {
    const postWithoutUndefinedValues = post.toObjectWithoutUndefinedValues();

    const query = this.queryBuilder.insertInto(
      this.tableName,
      postWithoutUndefinedValues
    );
    await query.execute();

    return post;
  }

  public async deletePost(id: number) {
    const query = this.queryBuilder
      .deleteFrom(this.tableName)
      .where("id", "=", id.toString());
    await query.execute();
  }

  public async getPostById(id: number) {
    const query = this.getAllQuery.where(
      `${this.tableName}.id`,
      "=",
      id.toString()
    );

    const posts = await query.getAsDto<GetPostDto[]>();
    const post = posts[0];

    return post;
  }

  public async getPostsByCommittee(committeeId: number) {
    const posts = await this.getPostsBy("committeId", committeeId);
    return posts;
  }

  public async getPostsByJournalist(journalistId: number) {
    const posts = await this.getPostsBy("journalistId", journalistId);
    return posts;
  }

  public async updatePost(postId: number, values: { [key: string]: any }) {
    const query = this.queryBuilder
      .update(this.tableName)
      .set(values)
      .where("id", "=", postId.toString());
    await query.execute();
  }

  public async searchPostsByTitle(titleFragment: string) {
    const query = this.getAllQuery.where("title", "LIKE", `%${titleFragment}%`);
    const results = query.getAsDto<GetPostDto[]>();
    return results || [];
  }

  private async getPostsBy(columnName: string, id: number) {
    const query = this.getAllQuery.where(columnName, "=", id.toString());

    const posts = await query.getAsDto<GetPostDto[]>();

    return posts || [];
  }
}