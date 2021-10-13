import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type operator = "=" | ">" | ">=" | "<" | "<=" | "LIKE";
export type joinType = "LEFT" | "INNER" | "RIGHT";
export type sortingType = "DESC" | "ASC";

export interface OrderByOptions {
  field: string;
  sortingType: sortingType;
}

export interface IQueryBuilder {
  select: (...values: string[]) => this;
  from: (tableName: string) => this;
  where: (value: string, operator: operator, secondValue: string) => this;
  and: (value: string, operator: operator, secondValue: string) => this;
  or: (value: string, operator: operator, secondValue: string) => this;
  insertInto: (tableName: string, values: { [key: string]: any }) => this;
  join: (tableName: string, joinType?: joinType) => this;
  on: (value: string, operator: operator, secondValue: string) => this;
  limit: (limitOrStartIndex: number, limit?: number) => this;
  update: (tableName: string) => this;
  deleteFrom: (tableName: string) => this;
  set: (values: { [key: string]: any }) => this;
  orderBy: (opt: OrderByOptions) => this;
  getAsText: () => string;
  getAsQueryResponse: () => Promise<
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
  >;
  getAsDto: <DtoType>() => Promise<DtoType>;
  execute: () => Promise<void>;
}