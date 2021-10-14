import { IRequest } from "../../Request&Response/IRequest";
import { IResponse } from "../../Request&Response/IResponse";
import { customHttpResponse, notFound, ok } from "../../utils/HttpResponses";
import { Login } from "./Login";

export class LoginController {
    constructor(private loginUseCase: Login) {}

    public async handle(req: IRequest, res: IResponse) {
        const { email, password } = req.getBody();
        
        const loginResponse = await this.loginUseCase.execute(email, password);

        if (!loginResponse.success) {
            const { msg, statusCode } = loginResponse;
            return customHttpResponse(res, { msg, statusCode });
        }

        const { user } = loginResponse;

        return ok(res, user);
    }

}