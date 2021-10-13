import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, created } from "../../utils/HttpResponses";
import { CreateCommitte } from "./CreateCommitte";
import { CreateCommitteDto } from "./CreateCommitteDto";

export class CreateCommitteController {
    constructor(private createCommitteUseCase: CreateCommitte) {}

    public async handle(req: IRequest, res: IResponse) {
        const { name } = req.getBody();
        const imgFile = req.getFile()

        if (!name)
            return badRequest(res, "committee name is missing");

        if (!imgFile)
            return badRequest(res, "img file is missing");
        
        const committeDto: CreateCommitteDto = {name, imgRef: imgFile.filename}

        await this.createCommitteUseCase.execute({name, imgRef: imgFile.filename});

        return created(res, committeDto);
    }
}