import { IQueryBuilder, OrderByOptions } from "../data/IQueryBuilder";

export interface OptionsToGetRepositoryData {
  limit?: number;
  page?: number;
  orderByOptions?: OrderByOptions;
  searchFragment?: string;
  whereClAuses?: {[key: string]: string | undefined}
}

export interface AddGetRepositoryDataOptionsToQueryOptions extends OptionsToGetRepositoryData {
    searchField: string;
}

export abstract class Repository {
    constructor(protected tableName: string) {}

    public addOptionsToGetRepositoryDataToQuery(query: IQueryBuilder, { searchFragment, whereClAuses, orderByOptions, limit, page, searchField }: AddGetRepositoryDataOptionsToQueryOptions) {
        if (searchFragment) query.where(searchField, "LIKE", `%${searchFragment}%`);

        console.log("where clauses: ", whereClAuses);

        for (let clauseKey in whereClAuses) {
          const value = whereClAuses[clauseKey];
          if (!value) continue;
          query.and(`${this.tableName}.${clauseKey}`, "=", value);
        }

        if (orderByOptions) query.orderBy(orderByOptions);

        if (limit && page) {
          const offset = limit * (page - 1);
          query.limit(offset, limit);
        }

        return query;
    }
}