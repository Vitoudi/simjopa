import axios, { AxiosError } from "axios";
import { API_URL } from "./apiRef";
import { OptionsToGetData } from "./dbComunication";
import { constructUrlWithParams } from "./utils/constructUrlWithParams";
import { LoginResponse } from "./users";
import { FormDataHttpMethods, getAuthHeader, sendRequestAsFormData } from "./utils/postAsFormData";

const POSTS_URL = API_URL + "/posts"

export interface CreatePostDto {
  htmlContent: string;
  committeId: number;
  journalistId: number;
  imgFile: File | null;
  title: string;
  subtitle: string;
}

export interface GetPostDto {
  committe: string;
  journalist: string;
  imgRef: string | null;
  title: string;
  subtitle: string;
  id: number;
  committeId: number;
  journalistId: number;
  htmlContent: string;
  createdAt: string;
}

export interface UpdatePostDto extends Partial<CreatePostDto> {
  id: number;
}

export interface OptionsToGetPosts extends OptionsToGetData {
  hot?: boolean;
  committeId?: number;
}

async function sendPostData(token: string, createPostDto: CreatePostDto, method: FormDataHttpMethods) {
  const { committeId, htmlContent, imgFile, journalistId, subtitle, title } =
    createPostDto;

  const response = await sendRequestAsFormData({
    method,
    url: POSTS_URL,
    jsonData: { committeId, htmlContent, journalistId, subtitle, title },
    file: imgFile,
    fileName: "postImg",
    token,
  });

  return response.data;
}

export async function sendRequestToGetPosts(options?: OptionsToGetPosts) {
    let url = POSTS_URL;

    if (options)
      url = constructUrlWithParams(url, options);

    console.log("constructed url: ", url);
    
    try {
      const response = await axios.get(url);
      return response.data ? response.data as GetPostDto[] : [];
    } catch (err) {
      return []
    }
    
}

export async function getPost(id: number) {
  const response = await axios.get(`${POSTS_URL}/${id}`);
  return response.data ? (response.data as GetPostDto) : null;
}

export async function getPostsByJournalist(journalistId: number) {
  const response = await axios.get(`${POSTS_URL}/journalists/${journalistId}`);
  return response.data ? (response.data as GetPostDto[]) : null;
}

export async function createPost(token: string, createPostDto: CreatePostDto): Promise<LoginResponse> {
    const { committeId, htmlContent, imgFile, journalistId, subtitle, title } = createPostDto;
    const url = POSTS_URL + "/create";

    try {
      const response = await sendRequestAsFormData({
      url,
      jsonData: { committeId, htmlContent, journalistId, subtitle, title },
      file: imgFile,
      fileName: "postImg",
      token
    });

    return {success: true, msg: "Post criado com sucesso!"};
    } catch(err) {
      const errorMsg = "Não foi possível criar o post :(";
      return {success: false, msg: errorMsg}
    }
    
}

export async function deletePost(token: string, id: number) {
  const authHeader = getAuthHeader(token);

  try {
    await axios.delete(`${POSTS_URL}/${id}`, {headers: authHeader});
  } catch(err) {
    const error = err as AxiosError;
    console.log("DELETION ERROR: ", error.response)
  }
}

export async function updatePost(token: string, updatePostDto: UpdatePostDto): Promise<LoginResponse> {
  const { committeId, htmlContent, imgFile, journalistId, subtitle, title, id } =
    updatePostDto;

    try {
      const response = await sendRequestAsFormData({
        method: "put",
        url: POSTS_URL,
        jsonData: { committeId, htmlContent, journalistId, subtitle, title, id },
        file: imgFile,
        fileName: "postImg",
        token,
      });

      return {success: true, msg: "Post atualizado com sucesso!"};
    } catch(err) {
      return {success: false, msg: "Não foi possível atualizar o post"}
    }
  
}

export async function increasePostVisitsNumber(postId: number) {
  const url = `${POSTS_URL}/increase/${postId}`;

  await axios.put(url);
}