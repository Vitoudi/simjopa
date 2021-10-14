import { Response } from "express";
import { IResponse } from "../Request&Response/IResponse";

export enum HTTP_STATUS_CODES {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

interface IResponseWithMsgOptions {
    res: IResponse;
    statusCode: number;
    msg?: string;
}

function getJsonMsgTemplate(msg: string) {
    return { msg };
}

export function sendHttpResponseWithMsg({msg, res, statusCode: status}: IResponseWithMsgOptions) {
    const resWithStatus = res.setStatusCode(status);
    return msg ? resWithStatus.sendJson(getJsonMsgTemplate(msg)) : resWithStatus.send();
}

export function ok(res: IResponse, data: any) {
    return res.setStatusCode(200).sendJson(data);
}

export function created(res: IResponse, data: any) {
    return res.setStatusCode(201).sendJson(data);
}

export function noContent(res: IResponse, msg?: string) {
return sendHttpResponseWithMsg({ statusCode: 204, res, msg });
}

export function unauthorized(res: IResponse, msg?: string) {
return sendHttpResponseWithMsg({ statusCode: 401, res, msg });
}

export function badRequest(res: IResponse, msg?: string) {
    return sendHttpResponseWithMsg({statusCode: 400, res, msg});
}

export function notFound(res: IResponse, msg: string) {
    return sendHttpResponseWithMsg({ statusCode: 404, res, msg });
}

export function internalServerError(res: IResponse, msg: string) {
  return sendHttpResponseWithMsg({ statusCode: 500, res, msg });
}

export function customHttpResponse(res: IResponse, { statusCode: status, msg }: Omit<IResponseWithMsgOptions, "res">) {
  return sendHttpResponseWithMsg({ statusCode: status, res, msg });
}