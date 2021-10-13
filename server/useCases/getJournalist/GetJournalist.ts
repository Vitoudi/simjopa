import { IJournalist } from "../../entities/Jornalist";
import { IJournalistsRepository } from "../../repositories/journalists/IJournalitsRepository";
import { GetJournalistDto as GetJournalistDto } from "./GetJournalistDto";

type GetJournalistStrategy = (id: number) => Promise<GetJournalistDto | null>;

export class GetJournalist {
    constructor(private getJournalistStrategy: GetJournalistStrategy) {}

    public async execute(id: number): Promise<GetJournalistDto | null> {
        const journalist = await this.getJournalistStrategy(id);
        
        return journalist;
    }
}