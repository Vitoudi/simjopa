import { Response } from "express";
import { IResponse } from "./IResponse";

export class ExpressWrapperResponse implements IResponse {
  constructor(private res: Response) {}

  sendJson(jsonData: {[key: string]: any}) {
      this.res.json(jsonData);
  }

  public send(text?: string) {
      this.res.send(text);
  }

  public setStatusCode(status: number) {
      this.res.status(status);
      return this;
  }
}
