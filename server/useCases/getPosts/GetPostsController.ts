import { Request, Response } from "express";
import { OrderByOptions } from "../../data/IQueryBuilder";
import { OptionsToGetRepositoryData as OptionsToGetRepositoryData } from "../../repositories/Repository";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, noContent, ok } from "../../utils/HttpResponses";
import { GetPosts } from "./GetPosts";

export class GetAllPostsController {
    constructor(private getPostsUseCase: GetPosts) {}

    public async handle(req: IRequest, res: IResponse): Promise<Response> {
        const queryParams = req.getQueryParams();

        const optionsToGetPosts = this.getOptionsToGetPosts(queryParams);

        const posts = await this.getPostsUseCase.execute(optionsToGetPosts);

        const thereAreNoPosts = posts.length <= 0;;

        if (thereAreNoPosts) return noContent(res, "There are no posts");

        return ok(res, posts);
    }

    private checkIfShouldOrderPostsByVisitsNumbers(queryParams: {[key: string]: string | undefined}) {
        const { hot } = queryParams;
        const shouldOrderByVisitsNumber = hot === "true";

        return shouldOrderByVisitsNumber;
    }

    private getOptionsToGetPosts(queryParams: {[key: string]: string | undefined}): OptionsToGetRepositoryData {
        const { page, limit, search, committeId, journalistId } = queryParams;

        let orderByOptions: OrderByOptions = {
          field: "createdAt",
          sortingType: "DESC",
        };

        let optionsToGetPosts: OptionsToGetRepositoryData = {
          page: Number(page),
          limit: Number(limit),
          orderByOptions,
          searchFragment: search,
          whereClAuses: {
            committeId,
            journalistId
          }
        };
        
        const shouldOrderByVisitsNumber = this.checkIfShouldOrderPostsByVisitsNumbers(queryParams);

        if (shouldOrderByVisitsNumber)
          optionsToGetPosts.orderByOptions = { field: "visitsNumber", sortingType: "DESC" };

        return optionsToGetPosts;
    }
}