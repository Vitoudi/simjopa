import axios from "axios";

export type FormDataHttpMethods = "put" | "post";

export interface AsFormDataOptions {
  method?: FormDataHttpMethods;
  url: string;
  jsonData: {[key: string]: any};
  file?: File | null;
  fileName?: string;
  token?: string;
}

export function getAuthHeader(token: string | undefined) {
  return {
    Authorization: `Bearer ${token || ""}`,
  };
}

export async function sendRequestAsFormData({jsonData, file, fileName , url, token, method}: AsFormDataOptions) {
    if (!method) method = "post";

    const formData = new FormData();

    if (file && !fileName) throw new Error("fileName not provided");
    if (file && fileName) formData.append(fileName, file);
    
    for (let key in jsonData) {
        formData.append(key, jsonData[key]);
    }

    const authHeader = getAuthHeader(token);
    
    const response = await axios[method](url, formData, {
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
}