import { ICommittesRepository } from "../../repositories/committes/ICommittesRepository";

export class GetCommitte {
    constructor(private committesRepository: ICommittesRepository) {}

    public execute(id: number) {
        const committe = this.committesRepository.getById(id);
        return committe;
    }
}