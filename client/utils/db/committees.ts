import axios from "axios";
import { API_URL } from "./apiRef";
import { OptionsToGetData } from "./dbComunication";
import { constructUrlWithParams } from "./utils/constructUrlWithParams";
import { sendRequestAsFormData } from "./utils/postAsFormData";

const COMMITTEES_URL = API_URL + "/committes";

export interface GetCommitteeDto {
    id: number;
    name: string;
    imgRef: string;
}

export interface CreateCommitteeDto {
    name: string;
    imgFile: File;
}

export async function sendRequestToGetCommittee(id: number) {
    const url = `${COMMITTEES_URL}/${id}`;
    try {
        const committees = (await axios.get(url)).data;
        return (committees as GetCommitteeDto) || null;
    } catch {
        return null;
    }
    
}

export async function sendRequestToGetCommittees(options?: OptionsToGetData) {
    const url = options ? constructUrlWithParams(COMMITTEES_URL, options) : COMMITTEES_URL;
    const committees = (await axios.get(url)).data;
    return committees as GetCommitteeDto[];
}

export async function sendRequestToCreateCommittee(token: string, createCommitteeDto: CreateCommitteeDto) {
    const { name, imgFile } = createCommitteeDto;
    sendRequestAsFormData({
        url: COMMITTEES_URL,
        jsonData: { name },
        file: imgFile,
        fileName: "committeImg",
        token: token
    });
}