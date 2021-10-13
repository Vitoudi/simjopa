import { Committe } from "../../entities/Committe";
import { ICommittesRepository } from "../../repositories/committes/ICommittesRepository";
import { CreateCommitteDto } from "./CreateCommitteDto";

export class CreateCommitte {
    constructor (private committesRepository: ICommittesRepository) {}

    public async execute(createCommitteDto: CreateCommitteDto) {
        const { name, imgRef } = createCommitteDto;
        const committe = new Committe(name, imgRef);

        await this.committesRepository.saveCommitte(committe);
    }
}