import { IQueryBuilder } from "../../data/IQueryBuilder";
import { Committe } from "../../entities/Committe";
import { GetCommitteDto } from "../../useCases/getCommitte/GetCommitteDto";
import { OptionsToGetRepositoryData, Repository } from "../Repository";
import { ICommittesRepository } from "./ICommittesRepository";

export class MySqlCommittesRepository extends Repository implements ICommittesRepository {

    constructor(private queryBuilder: IQueryBuilder) {
        super("committes");
    }

    private get getAllQuery() {
        
        return this.queryBuilder.select("*").from(this.tableName);
    }

    public async getCommittes(options?: OptionsToGetRepositoryData) {
        const query = this.getAllQuery;

        if (options) this.addOptionsToGetRepositoryDataToQuery(query, { ...options, searchField: "name" });

        const committes = await query.getAsDto<GetCommitteDto[]>();
        return committes;
    }

    public async getById(id: number) {
        const query = this.getAllQuery.where("id", "=", id.toString());
        const committes = await query.getAsDto<GetCommitteDto[]>();
        return committes[0];
    }

    public async saveCommitte(committe: Committe) {
        const committeData = committe.toObjectWithoutUndefinedValues();
        const query = this.queryBuilder.insertInto(this.tableName, committeData);
        await query.execute();
    }
}