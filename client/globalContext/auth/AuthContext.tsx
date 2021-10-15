import axios from 'axios';
import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { API_URL } from '../../utils/db/apiRef';
import { CreateJournalistDto, GetJournalistDto } from '../../utils/db/journalists';
import { makeRequestToSignUpJournalist, makeRequestToSignUpUser, SignUpJournalistsResponse } from '../../utils/db/signUp';
import { CreateUserDto, getUserByAuthToken, LoginResponse, User, WithToken } from '../../utils/db/users';

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";


export interface AuthContextData {
  authStatus: AuthStatus;
  user: User | null;
  loginUser: (email: string, password: string) => Promise<LoginResponse>;
  getUserAuthToken: () => string | null;
  signUpUser: (info: CreateUserDto) => Promise<LoginResponse>;
  signUpJournalist: (info: CreateJournalistDto) => Promise<LoginResponse>;
  logon: () => void;
}


export const AuthContext = React.createContext({} as AuthContextData);

export default function AuthContextProvider({ children }: PropsWithChildren<{}>): ReactElement {
    const LOGIN_URL = API_URL + "/login";
    const AUTH_TOKEN_STORAGE_NAME = "auth_token";
    const SIGN_UP_URL = API_URL + "/signup";

    const [user, setUser] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

    // PRIVATE:
    async function handleSignUpResponse(signUpResponse: LoginResponse) {
        
        if (!signUpResponse.user) return setAuthStatus("unauthenticated");
        console.log("userWithToken", signUpResponse.user.data);

        setUser(signUpResponse.user.data);
        saveTokenInLocalStorage(signUpResponse.user.token);
    }

    function getErrorMsgFromErrorObj(err: any) {
        const DEFAULT_ERROR_MSG = "Algo deu errado";
        const errorMsg = ((err as any).response.data.msg) as string;
        return errorMsg ? errorMsg : DEFAULT_ERROR_MSG;
    }



    // PUBLIC:
    async function loginUser(email: string, password: string): Promise<LoginResponse> {
        try {
            const res = await axios.post(LOGIN_URL, { email, password });
            console.log("res:", res);
            if (!res.data) return {success: false, msg: "Usuário não encontrado"};
            const user = res.data;
            
            setUser(user.data);
            const token = user?.token;
            if (token) saveTokenInLocalStorage(token);
            return { success: true, msg: "Sucesso" };
        } catch(err) {
            const errMsg = getErrorMsgFromErrorObj(err);
            return { msg: errMsg, success: false }
        }
        
    }

    function getUserAuthToken() {
        if (!window) return null;

        const tokenInLocalStorage = localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
        return tokenInLocalStorage;
    }

    function saveTokenInLocalStorage(token: string) {
        if (!window) return;
        localStorage.setItem(AUTH_TOKEN_STORAGE_NAME, token);
    }

    async function signUpUser(info: CreateUserDto): Promise<LoginResponse> {
        try {
            const res = await makeRequestToSignUpUser(info);
            handleSignUpResponse(res);
            return {success: true, msg: "Ok"}
        } catch(err) {
            const errMsg = getErrorMsgFromErrorObj(err);
            return {success: false, msg: errMsg}
        }  
    }

    function logon() {
        if (!window) return;
        localStorage.removeItem(AUTH_TOKEN_STORAGE_NAME);
        setUser(null);
        setAuthStatus("unauthenticated");
    }
    
    async function signUpJournalist(info: CreateJournalistDto): Promise<LoginResponse> {
    
         try {
           const res = await makeRequestToSignUpJournalist(
             info
           );
           handleSignUpResponse(res);
           return { success: true, msg: "Ok" };
         } catch (err) {
           const errMsg = getErrorMsgFromErrorObj(err);
           return { success: false, msg: errMsg };
         }
      
    }

    useEffect(() => {
        if (!window) return;
        const userAuthToken = getUserAuthToken();

        if (!userAuthToken)
            return setAuthStatus("unauthenticated");
        
        getUserByAuthToken(userAuthToken).then((user) => {
          if (!user)
            return setAuthStatus("unauthenticated");
          
          setUser(user);
          console.log(user);
        });
    }, [])

    useEffect(() => {
        const isAuthenticated = Boolean(user);
        if (isAuthenticated) setAuthStatus("authenticated");
    }, [user])

    return (
        <AuthContext.Provider value={ { user, logon, authStatus, loginUser, getUserAuthToken, signUpUser, signUpJournalist } }>
            {children}
        </AuthContext.Provider>
    )
}
