import { Committe } from "../../entities/Committe";
import { GetCommitteDto } from "../../useCases/getCommitte/GetCommitteDto";
import { OptionsToGetRepositoryData } from "../Repository";

export interface ICommittesRepository {
  getCommittes: (
    options?: OptionsToGetRepositoryData
  ) => Promise<GetCommitteDto[]>;
  getById: (id: number) => Promise<GetCommitteDto>;
  saveCommitte: (committe: Committe) => void;
}