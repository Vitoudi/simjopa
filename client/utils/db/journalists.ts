import axios from "axios";
import { API_URL } from "./apiRef";
import { OptionsToGetData } from "./dbComunication";
import { CreateUserDto } from "./users";
import { constructUrlWithParams } from "./utils/constructUrlWithParams";
import { sendRequestAsFormData } from "./utils/postAsFormData";

const JOURNALISTS_URL = API_URL + "/journalists";

export interface PostJournalistDto {
    name: string;
    committeId: number;
    imgFile: File | null;
}

export interface GetJournalistDto {
  name: string;
  committe: string;
  committeId: number;
  id: number;
  imgRef: string | null;
}

export interface CreateJournalistDto extends CreateUserDto {
  committeId: number;
}

export interface OptionsToGetJournalists extends OptionsToGetData {
  committeId?: number;
}

export async function getJournalists(options?: OptionsToGetJournalists) {
  try {
    let url = JOURNALISTS_URL;

    if (options)
      url = constructUrlWithParams(url, options);

    const response = await axios.get(url);
    return response.data ? response.data as GetJournalistDto[] : null;
  } catch(err) {
    console.error(err)
    return null
  }
    
}

async function getJournalistByUrl(url: string) {
  try {
    const response = await axios.get(url);
    return response.data ? (response.data as GetJournalistDto) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getJournalistById(id: number) {
  const url = `${JOURNALISTS_URL}/${id}`;

  const journalist = await getJournalistByUrl(url);
  return journalist;
}

export async function getJournalistByUserId(userId: number) {
  const url = `${JOURNALISTS_URL}/user/${userId}`;

  const journalist = await getJournalistByUrl(url);
  return journalist;
}

export function getJournalistImgPath(imgRef: string) {
  const url = `${API_URL}/assets/journalists/${imgRef}`;
  return url;
}

export async function createJournalist({ imgFile, committeId, name }: PostJournalistDto) {
  const url = JOURNALISTS_URL + "/create";
  
  const response = await sendRequestAsFormData({
    url,
    jsonData: {committeId, name},
    file: imgFile,
    fileName: "profileImg"
  });

  return response.data;
}