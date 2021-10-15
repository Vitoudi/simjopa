import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, created } from "../../utils/HttpResponses";
import { imageStorage } from "../sharedDependencies";
import { CreateCommitte } from "./CreateCommitte";
import { CreateCommitteDto } from "./CreateCommitteDto";

export class CreateCommitteController {
    constructor(private createCommitteUseCase: CreateCommitte) {}

    public async handle(req: IRequest, res: IResponse) {
        const { name } = req.getBody();

        const fileName = req.getFile()?.filename;

        if (fileName) imageStorage.saveFile(fileName, "committes");

        const imgRef = fileName;

        if (!name)
            return badRequest(res, "committee name is missing");

        if (!imgRef)
            return badRequest(res, "img file is missing");
        
        const committeDto: CreateCommitteDto = {name, imgRef}

        await this.createCommitteUseCase.execute({name, imgRef});

        return created(res, committeDto);
    }
}