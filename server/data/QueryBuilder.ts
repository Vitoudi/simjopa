import { db } from "./db";
import { IQueryBuilder, joinType, operator, OrderByOptions, sortingType } from "./IQueryBuilder";

export class QueryBuilder implements IQueryBuilder {
  private query = "";
  private params: string[] = [];

  public select(...values: string[]) {
    this.addQueryFragment(`SELECT ${values.join(", ")}`);
    return this;
  }

  public from(tableName: string) {
    this.addQueryFragment(`FROM ${tableName}`);
    return this;
  }

  public where(value: string, operator: operator, secretValue: string) {
    this.addConditionClause("WHERE", value, operator, secretValue);
    return this;
  }

  public and(value: string, operator: operator, secretValue: string) {
    this.addConditionClause("WHERE", value, operator, secretValue);
    return this;
  }

  public or(value: string, operator: operator, secretValue: string) {
    this.addConditionClause("OR", value, operator, secretValue);
    return this;
  }

  public insertInto(tableName: string, values: { [key: string]: string }) {
    const keys = [];
    const valuesArr = [];

    for (let prop in values) {
      keys.push(prop);
      valuesArr.push(values[prop]);
    }

    this.params = [...this.params, ...valuesArr];

    const placeholders = this.getPlaceholders(keys.length);

    this.addQueryFragment(
      `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${placeholders})`
    );
    return this;
  }

  public join(tableName: string, joinType?: joinType) {
    this.addQueryFragment(`${joinType ? joinType + " " : ""}JOIN ${tableName}`);
    return this;
  }

  public on(value: string, operator: operator, secondValue: string) {
    this.addQueryFragment(`ON ${value} ${operator} ${secondValue}`);
    return this;
  }

  public limit(num: number, endPosition?: number) {
    this.addQueryFragment(
      `LIMIT ${num}${endPosition ? `, ${endPosition}` : ""}`
    );
    return this;
  }

  public update(tableName: string) {
    this.addQueryFragment(`UPDATE ${tableName}`);
    return this;
  }

  public deleteFrom(tableName: string) {
    this.addQueryFragment(`DELETE FROM ${tableName}`);
    return this;
  }

  public set(values: { [key: string]: any }) {
    let formattedValues = [];

    for (let prop in values) {
      const value = values[prop];
      if (value === undefined) continue;
      this.params.push(value);
      formattedValues.push(`${prop} = ?`);
    }

    const formattedValuesStr = formattedValues.join(", ");

    this.addQueryFragment(`SET ${formattedValuesStr}`);
    return this;
  }

  public orderBy({ field, sortingType }: OrderByOptions) {
    this.addQueryFragment(`ORDER BY ${field} ${sortingType}`);
    return this;
  }

  public getAsText() {
    const queryText = this.getFormattedQuery();
    this.cleanQuery();
    return queryText;
  }

  public async execute() {
    const query = this.getFormattedQuery();
    const params = Object.freeze(this.params);
    this.logQuery();
    this.cleanQuery();

    await db.execute(query, params);
  }

  public async getAsQueryResponse() {
    const query = this.getFormattedQuery();
    const params = Object.freeze(this.params);

    this.logQuery();
    this.cleanQuery();

    try {
      const data = (await db.execute(query, params))[0];

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("invalid query");
    }
  }

  public async getAsDto<DtoType>() {
    const queryAsResponse = (await this.getAsQueryResponse()) as unknown;

    return queryAsResponse as DtoType;
  }

  private addQueryFragment(fragment: string) {
    this.query += `${fragment} `;
  }

  private addConditionClause(
    conditionClause: "AND" | "OR" | "WHERE",
    value: string,
    operator: operator,
    secretValue: string
  ) {
    const thereIsAWhereClauseInCurrentQuery = this.query.includes("WHERE");
    const keyword = thereIsAWhereClauseInCurrentQuery
      ? conditionClause
      : "WHERE";
    this.addQueryFragment(`${keyword} ${value} ${operator} ?`);
    this.params.push(secretValue);
  }

  private logQuery() {
    console.log("🖥 EXECUTING -> ", this.getFormattedQuery());
    console.log("params: ", this.params);
  }

  private getFormattedQuery() {
    return this.query.trim() + ";";
  }

  private cleanQuery() {
    this.query = "";
    this.params = [];
  }

  private getPlaceholders(quantity: number) {
    const placeHolders: string[] = [];
    placeHolders.length = quantity;
    placeHolders.fill("?");

    return placeHolders.join(", ");
  }
} 