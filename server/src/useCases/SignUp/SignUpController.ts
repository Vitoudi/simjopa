import { UserRole } from "../../entities/User";
import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { badRequest, created, customHttpResponse, ok } from "../../utils/HttpResponses";
import { SignUp } from "./SignUp";
import { CreateUserDto } from "./createUserDto";
import { imageStorage } from "../sharedDependencies";

export class SignUpController {
    constructor(private signUpUseCase: SignUp) {}

    public async handle(req: IRequest, res: IResponse) {
        console.log("handle create user called");
        const missingProps = this.getMissingProps(req);
        const hasMissingProps = missingProps.length > 0;

        const fileName = req.getFile()?.filename;

        if (fileName) imageStorage.saveFile(fileName, "users");

        const imgFileName = fileName;

        if (hasMissingProps)
            return badRequest(res, `following props are missing or invalid: ${missingProps.join(", ")}`);

        const { name, password, email } = req.getBody();

        const userDto: CreateUserDto = {
            name,
            password,
            email,
            imgFileName,

        }

        const loginResponse = await this.signUpUseCase.execute(userDto);

        if (!loginResponse.success) {
            const { msg, statusCode } = loginResponse;
            return customHttpResponse(res, { msg, statusCode });
        }

        return created(res, loginResponse);
    }

    private getMissingProps(req: IRequest) {
        const missingProps = [];
        const body = req.getBody();
        const requiredProps = ["name", "password", "email"];

        for (let propName of requiredProps) {
          const prop = body[propName];
          const bodyHasProp = Boolean(prop);
          
          if (!bodyHasProp || typeof prop !== "string")
            missingProps.push(propName);
        }

        return missingProps;
    }

}