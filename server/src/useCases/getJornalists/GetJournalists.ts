import { IJournalistsRepository } from "../../repositories/journalists/IJournalitsRepository";
import { OptionsToGetRepositoryData } from "../../repositories/Repository";
import { GetJournalistDto } from "../getJournalist/GetJournalistDto";

export class GetJournalists {
    constructor(private journalistsRepository: IJournalistsRepository) {}

    public async execute(options: OptionsToGetRepositoryData): Promise<GetJournalistDto[] | null> {
        const journalists = await this.journalistsRepository.getJournalists(options);

        return journalists;
    }
}