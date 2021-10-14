import { Request, Response } from "express";
import { ExpressWrapperResponse } from "../Request&Response/ExpressResponseWrapper";
import { ExpressWrapperRequest } from "../Request&Response/ExpressWrapperRequest";
import { IRequest } from "../Request&Response/IRequest";
import { IResponse } from "../Request&Response/IResponse";

export function adaptExpressRoute(req: Request, res: Response, cb: (req: IRequest, res: IResponse) => any) {
    const customReq: IRequest = new ExpressWrapperRequest(req);
    const customRes: IResponse = new ExpressWrapperResponse(res);
    return cb(customReq, customRes);
}