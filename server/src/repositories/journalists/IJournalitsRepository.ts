import { Journalist } from "../../entities/Jornalist";
import { CreateJournalistDto } from "../../useCases/signUpJournalist/createJournalistDto";
import { GetJournalistDto } from "../../useCases/getJournalist/GetJournalistDto";
import { OptionsToGetRepositoryData } from "../Repository";

export interface IJournalistsRepository {
  save: (journalist: Journalist) => Promise<Journalist>;
  getById: (id: number) => Promise<GetJournalistDto | null>;
  getJournalists: (options?: OptionsToGetRepositoryData) => Promise<GetJournalistDto[] | null>;
  getByCommittee: (committeeId: number) => Promise<GetJournalistDto[] | null>;
  getOneByUserId: (committeeId: number) => Promise<GetJournalistDto | null>;
}