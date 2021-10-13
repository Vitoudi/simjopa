import { IncomingHttpHeaders } from "http";
import { UserRole } from "../entities/User";
import { IAuthToken } from "../middlewares/auth";

export interface FileWithFileName {
    filename: string;
}

export interface IRequest {
  extractParam: (paramName: string) => string;
  getBodyProp: (propName: string) => any;
  getParamAsNumber: (param: string) => number;
  getBodyPropAsNumber: (param: string) => number;
  getFile: () => FileWithFileName | undefined;
  getParams: () => { [key: string]: string };
  getBody: () => { [key: string]: any };
  getHeaders: () => IncomingHttpHeaders;
  getQueryParams: () => { [key: string]: string | undefined };
  getDecodedAuthToken: () => IAuthToken | null;
}