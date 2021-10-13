import axios from "axios";
import { API_URL } from "./apiRef";
import { sendRequestAsFormData } from "./utils/postAsFormData";

const USERS_URL = API_URL + "/users";

export enum UserRole {
  USER,
  JOURNALIST,
  ADMIN,
  MASTER
} 

export interface User {
  email: string;
  hashPassword: string;
  id: number;
  imgRef: string;
  name: string;
  role: number;
}

export interface CreateUserDto {
  name: string;
  password: string;
  email: string;
  imgFile?: File;
}


export interface WithToken<T> {
  data: T;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  msg: string;
  user?: WithToken<User>;
}


export async function getUserByAuthToken(token: string) {
  try {
    const res = await axios.get(USERS_URL + `/${token}`);
    return res.data;
  } catch(err) {
    return null;
  }
  
}