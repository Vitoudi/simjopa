import { IQueryBuilder } from "../../data/IQueryBuilder";
import { Journalist } from "../../entities/Jornalist";
import { CreateJournalistDto } from "../../useCases/signUpJournalist/createJournalistDto";
import { GetJournalistDto } from "../../useCases/getJournalist/GetJournalistDto";
import { IJournalistsRepository } from "./IJournalitsRepository";
import { OptionsToGetRepositoryData, Repository } from "../Repository";

export class MySqlJournalistsRepository extends Repository implements IJournalistsRepository {

  constructor(private queryBuilder: IQueryBuilder) {
    super("journalists");
  }

  private get getAllQuery() {
    return this.queryBuilder
      .select(
        `${this.tableName}.id`,
        `${this.tableName}.committeId`,
        `${this.tableName}.userId`,
        `users.imgRef as imgRef`,
        `users.name AS name`,
        `committes.name AS committe`
      )
      .from(this.tableName)
      .join("committes")
      .on("committes.id", "=", `${this.tableName}.committeId`)
      .join("users")
      .on("users.id", "=", `${this.tableName}.userId`);
  }

  public async getJournalists(optionsToGetJournalists?: OptionsToGetRepositoryData) {
    const query = this.getAllQuery;

    if (optionsToGetJournalists)
      this.addOptionsToGetRepositoryDataToQuery(query, { ...optionsToGetJournalists, searchField: "users.name" });
    
    const journalists = await query.getAsDto<GetJournalistDto[]>();

    const journalistsIsArray = Array.isArray(journalists);

    if (!journalistsIsArray) return null;

    return journalists;
  }

  public async getByCommittee(committeeId: number) {
    const query = this.getAllQuery.where(
      `${this.tableName}.committeId`,
      "=",
      committeeId.toString()
    );

    const journalistsInCommittee = await query.getAsDto<GetJournalistDto[]>();

    return journalistsInCommittee;
  }

  public async getOneByUserId(userId: number) {
    const query = this.getAllQuery.where(
      `${this.tableName}.userId`,
      "=",
      userId.toString()
    );

    const journalistWithUserIdId = (await query.getAsDto<GetJournalistDto[]>())[0];

    return journalistWithUserIdId;
  }

  public async getById(id: number) {
    const query = this.getAllQuery.where(
      `${this.tableName}.id`,
      "=",
      id.toString()
    );

    const journalists = await query.getAsDto<GetJournalistDto[]>();
    const journalist = journalists[0];

    return journalist ? journalist : null;
  }

  public async save(journalist: Journalist) {
    const journalistWithoutUndefinedValues =
      journalist.toObjectWithoutUndefinedValues();

    const query = this.queryBuilder.insertInto(
      this.tableName,
      journalistWithoutUndefinedValues
    );

    await query.execute();

    return journalist;
  }
}
