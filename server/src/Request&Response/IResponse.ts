export interface IResponse {
  sendJson: (jsonData: {[key: string]: any}) => any;
  send: (text?: string) => any;
  setStatusCode: (status: number) => this;
}
