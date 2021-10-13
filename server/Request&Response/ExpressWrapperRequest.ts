import { Response, Request } from "express";
import { IAuthToken } from "../middlewares/auth";
import { IRequest } from "./IRequest";

export class ExpressWrapperRequest implements IRequest {
    constructor(private req: Request ) {};

    public getBody() {
        return this.req.body;
    }

    public getBodyProp(propName: string) {
        return this.getBody()[propName];
    }

    public getParams() {
        return this.req.params;
    }

    public extractParam(paramName: string) {
        return this.getParams()[paramName];
    }

    public getBodyPropAsNumber(propName: string) {
        const props = this.getBody();
        return this.getAsNumber(props, propName);
    }

    public getParamAsNumber(paramName: string) {
        const params = this.getParams();
        return this.getAsNumber(params, paramName);
    }

    public getFile() {
        return this.req.file;
    }

    public getHeaders() {
        return this.req.headers;
    }

    public getDecodedAuthToken() {
        const decodedToken = (this.req as any).decodedToken;
        if (!decodedToken) return null;
        return decodedToken as IAuthToken;
    }

    public getQueryParams() {
        return this.req.query as {[key: string]: string | undefined};
    }

    private getAsNumber(obj: {[key: string]: any}, propName: string) {
        const value = obj[propName];
        return Number(value);
    }
}