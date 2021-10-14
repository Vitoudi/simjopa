import { ICommittesRepository } from "../../repositories/committes/ICommittesRepository";
import { OptionsToGetRepositoryData } from "../../repositories/Repository";

export class GetCommittes {
    constructor(private committesRepository: ICommittesRepository) {}
    
    public async execute(options?: OptionsToGetRepositoryData) {
        const committes = await this.committesRepository.getCommittes(options);

        return committes;
    }
}