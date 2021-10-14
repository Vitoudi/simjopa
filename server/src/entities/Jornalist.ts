import { db } from "../data/db";
import { GenericEntity } from "./GenericEntity";

export interface IJournalist {
  readonly committeId: number;
  readonly userId: number;
  readonly id?: number;
}

export class Journalist extends GenericEntity {
  constructor(
    public readonly committeId: number,
    public readonly userId: number,
    public readonly id?: number
  ) {
    super()
  }
}
